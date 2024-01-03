// path: /api/products
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
dotenv.config();

import {
  createProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  getProductsByPage,
  getProductsByPageByCategory,
} from "../models/product.js";
import { verifyToken } from "../middlewares/token.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../middlewares/Image.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const fields = ["id", "title", "price", "category", "images", "quantity"];
    const products = await getProducts(fields);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get n products after skipping m products
router.get("/skip/:pagesCount/take/:ordersCount", async (req, res) => {
  try {
    const fields = ["id", "title", "price", "category", "images", "quantity"];

    const ordersCount = parseInt(req.params.ordersCount) || 10;
    const pageNum = parseInt(req.params.pagesCount) * ordersCount || 0;

    const { products, totalProducts } = await getProductsByPage(
      ordersCount,
      pageNum,
      fields
    );

    const pagesCount = Math.ceil(totalProducts / ordersCount);

    res.json({ totalProducts, pagesCount, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const fields = ["id", "title", "price", "category", "images", "quantity"];

    const products = await getProductsByCategory(
      req.params.category,
      0,
      fields
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get(
  "/category/:category/skip/:pagesCount/take/:ordersCount",
  async (req, res) => {
    try {
      const fields = ["id", "title", "price", "category", "images", "quantity"];

      const ordersCount = parseInt(req.params.ordersCount) || 10;
      const pageNum = parseInt(req.params.pagesCount) * ordersCount || 0;

      const { products, totalProducts } = await getProductsByPageByCategory(
        ordersCount,
        pageNum,
        req.params.category,
        fields
      );

      const pagesCount = Math.ceil(totalProducts / ordersCount);

      res.json({ totalProducts, pagesCount, products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/get-n-per-category/:n", async (req, res) => {
  try {
    const fields = ["id", "title", "price", "category", "images", "quantity"];

    const categories = [
      "T-shirts",
      "shirts",
      "pants",
      "shorts",
      "jackets",
      "hoodies",
    ];

    const products = await Promise.all(
      categories.map(async (category) => {
        const product = await getProductsByCategory(category, 1, fields);
        return product[0];
      })
    );

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", verifyToken, uploadToCloudinary, async (req, res) => {
  try {
    const { title, description, price, category, sizes } = req.body;

    if (!title || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const role = req.role;
    if (role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized: You are not authorized to create a product",
      });
    }

    // convert sizes to json
    const Jsonsizes = JSON.parse(req.body.sizes);
    const quantity = Jsonsizes.reduce(
      (sum, curr) => sum + parseFloat(curr.quantity),
      0
    );

    const images = req.body.images;

    const product = {
      title,
      description,
      price,
      category,
      images,
      quantity,
      sizes: Jsonsizes,
    };

    const newProduct = await createProduct(product);
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const role = req.role;
    if (role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized: You are not authorized to update a product",
      });
    }

    const sizes = req.body.sizes;
    const quantity = sizes.reduce(
      (sum, curr) => sum + parseFloat(curr.quantity),
      0
    );

    const newProduct = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      images: req.body.images,
      quantity,
      sizes,
    };

    const updatedProduct = await updateProduct(req.params.id, newProduct);
    res.json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(
  "/:id/add-image",
  verifyToken,
  uploadToCloudinary,
  async (req, res) => {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(403).json({
          message: "Unauthorized: You are not authorized to update a product",
        });
      }
      const product = await getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const newimages = req.body.images;
      const images = product.images;

      newimages.forEach((image) => {
        if (!images.includes(image)) {
          images.push(image);
        }
      });

      const updatedProduct = await updateProduct(req.params.id, { images });
      res.json(updatedProduct.images);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.put("/:id/remove-image", verifyToken, async (req, res) => {
  try {
    const role = req.role;
    if (role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized: You are not authorized to update a product",
      });
    }

    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const images = product.images;
    const reqImages = req.body.images;

    reqImages.forEach((image, i) => {
      const index = images.indexOf(image);
      if (index === -1) {
        // return res.status(404).json({ message: `Image no. ${i} not found` });
        // raise error to stop runing
        const error = new Error(`Image no. ${i + 1} not found`);
        error.status = 404;
        throw error;
      }
    });

    await deleteFromCloudinary(req, res, () => {
      const images = product.images.filter(
        (image) => !reqImages.includes(image)
      );
      updateProduct(req.params.id, { images });
      res.json(images);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const role = req.role;
    if (role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized: You are not authorized to delete a product",
      });
    }

    // get product
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    req.body.images = product.images;

    await deleteFromCloudinary(req, res, async () => {
      await deleteProduct(req.params.id);
      res.json({ message: "Product deleted" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

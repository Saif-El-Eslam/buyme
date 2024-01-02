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

    const products = await getProductsByPage(ordersCount, pageNum, fields);

    const pagesCount = Math.ceil(products.length / req.params.ordersCount);

    res.json({ pagesCount, products });
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
    console.log(req.params.category);
    const products = await getProductsByCategory(req.params.category);
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

    const updatedProduct = await updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
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

      console.log(images);
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
    const index = images.indexOf(req.body.image);
    if (index === -1) {
      return res.status(404).json({ message: "Image not found" });
    }

    await deleteFromCloudinary(req, res, () => {
      if (req.body.deleteResponse.result !== "ok") {
        if (req.body.deleteResponse.result === "not found") {
          return res
            .status(404)
            .json({ message: "Image not found in the cloud" });
        }
        return res.status(500).json({ message: "Error deleting image" });
      } else {
        images.splice(index, 1);
        updateProduct(req.params.id, { images });
        res.json(images);
      }
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

    const deletedProduct = await deleteProduct(req.params.id);
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

// path: /api/products
import express from "express";
import dotenv from "dotenv";
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

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get n products after skipping m products
router.get("/skip/:pagesCount/take/:ordersCount", async (req, res) => {
  try {
    const products = await getProductsByPage(
      req.params.ordersCount,
      req.params.pagesCount * req.params.ordersCount
    );

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

router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, price, category, images, sizes } = req.body;
    if (!title || !price || !category || !images) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const role = req.role;
    if (role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized: You are not authorized to create a product",
      });
    }

    const quantity = sizes.reduce((sum, curr) => sum + curr.quantity, 0);

    const product = {
      title,
      description,
      price,
      category,
      images,
      quantity,
      sizes,
    };

    const newProduct = await createProduct(product);
    res.status(201).json(newProduct);
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

router.put("/:id/add-image", verifyToken, async (req, res) => {
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
    images.push(req.body.image);

    const updatedProduct = await updateProduct(req.params.id, { images });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
    if (index > -1) {
      images.splice(index, 1);
    }

    const updatedProduct = await updateProduct(req.params.id, { images });
    res.json(updatedProduct);
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

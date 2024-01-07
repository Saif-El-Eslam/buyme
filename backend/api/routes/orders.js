// path: /api/orders
import express from "express";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();

import {
  createOrder,
  getOrders,
  getOrdersInLastNDays,
  getOrderById,
  getOrdersByUser,
  updateOrder,
  deleteOrder,
  getOrdersByStatus,
} from "../models/order.js";
import { getProductById, updateProduct } from "../models/product.js";
import { updateCart } from "../models/cart.js";
import { verifyToken } from "../middlewares/token.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const role = req.role;
    if (role === "admin") {
      const orders = await getOrders();
      res.json(orders);
    } else if (role === "user") {
      const user_id = req.user_id;
      const orders = await getOrdersByUser(user_id);
      res.json(orders);
    } else {
      return res.status(403).json({
        message: "You are not authorized to access this route",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/days/:n", verifyToken, async (req, res) => {
  try {
    const role = req.role;
    if (role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to access this route",
      });
    }

    const orders = await getOrdersInLastNDays(req.params.n);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (req.role !== "user" && req.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to access this route",
      });
    }

    const order = await getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/status/:status", verifyToken, async (req, res) => {
  try {
    const role = req.role;
    if (role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to access this route",
      });
    }

    const orders = await getOrdersByStatus(req.params.status);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    if (req.role !== "user") {
      return res.status(403).json({
        message: "You are not authorized to do this action",
      });
    }

    const { products, delivery_address, payment_method, cart_id } = req.body;
    if (!products.length || !delivery_address || !payment_method) {
      return res.status(400).json({ message: "Missing required inputs" });
    }

    if (
      payment_method?.card_details &&
      !validator.isCreditCard(payment_method?.card_details?.card_number)
    ) {
      return res.status(400).json({ message: "Invalid card number" });
    }

    let total_price = 0;
    for (const item of products) {
      const product = await getProductById(item.product_id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      total_price = total_price + product.price * item.quantity;

      const sizeIndex = product.sizes.findIndex(
        (sizeItem) => sizeItem.size === item.size
      );
      if (sizeIndex === -1) {
        return res.status(400).json({ message: "Size not found" });
      }

      if (product.sizes[sizeIndex].quantity < item.quantity) {
        return res.status(400).json({ message: "Not enough quantity" });
      }

      product.sizes[sizeIndex].quantity -= item.quantity;
      product.quantity -= item.quantity;
      await updateProduct(product._id, product);
    }

    const user_id = req.user_id;
    const newOrder = {
      user_id,
      products,
      total_price,
      delivery_address,
      payment_method,
    };

    const order = await createOrder(newOrder);

    await updateCart(cart_id, { products: [] });

    res.status(201).json({ order, message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ordered --> cancelled
// ordered --> delivered
router.put("/:id/status", verifyToken, async (req, res) => {
  try {
    const role = req.role;
    const { status } = req.body;

    if (
      (role !== "admin" && status !== "cancelled") ||
      (role === "admin" && status === "cancelled")
    ) {
      return res.status(403).json({
        message: "You are not authorized to do this action",
      });
    }

    if (!status) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (
      status !== "ordered" &&
      status !== "cancelled" &&
      status !== "delivered"
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status === "cancelled") {
      for (const item of order.products) {
        const product = await getProductById(item.product_id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        const sizeIndex = product.sizes.findIndex(
          (sizeItem) => sizeItem.size === item.size
        );
        if (sizeIndex === -1) {
          return res.status(400).json({ message: "Size not found" });
        }

        if (status === "cancelled") {
          product.sizes[sizeIndex].quantity += item.quantity;
          product.quantity += item.quantity;
        }

        await updateProduct(product._id, product);
      }
    }

    const result = await updateOrder(req.params.id, { status });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const role = req.role;
    if (role !== "user") {
      return res.status(403).json({
        message: "You are not authorized to do this action",
      });
    }

    const order = await getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user_id?._id.toString() === req.user_id) {
      const result = await deleteOrder(req.params.id);
      res.json(result);
    } else {
      return res.status(403).json({
        message: "You are not authorized to do this action",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

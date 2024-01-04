// path: /api/cart
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { createCart, getCartByUser, updateCart } from "../models/cart.js";
import { getProductById } from "../models/product.js";
import { verifyToken } from "../middlewares/token.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const user_id = req.user_id;

    const cart = await getCartByUser(user_id);

    if (!cart) {
      return res.status(404).json({ message: "No cart for this user" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add product to cart
router.put("/add-product", verifyToken, async (req, res) => {
  try {
    const user_id = req.user_id;
    const { product_id, quantity, size } = req.body;

    const product = await getProductById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const sizeIndex = product.sizes.findIndex((item) => item.size === size);
    if (sizeIndex === -1) {
      return res.status(404).json({ message: "Size not found" });
    }

    if (quantity > product.sizes[sizeIndex].quantity) {
      return res.status(404).json({ message: "Quantity not available" });
    }

    const cart = await getCartByUser(user_id);
    if (!cart) {
      const newCart = {
        user_id,
        products: [
          {
            product_id,
            quantity,
            size,
          },
        ],
        total_price: product.price * quantity,
      };

      const result = await createCart(newCart);
      return res.json(result);
    }

    const productIndex = cart.products.findIndex((item) => {
      return item.product_id._id.toString() === product_id;
    });

    if (productIndex > -1 && cart.products[productIndex].size === size) {
      cart.products[productIndex].quantity += quantity;
      cart.total_price += product.price * quantity;
    } else {
      cart.products.push({
        product_id,
        quantity,
        size,
      });
      cart.total_price += product.price * quantity;
    }

    const result = await updateCart(cart._id, cart);

    res.json({ message: "Added to Cart", cart: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// remove product from cart
router.put("/remove-product", verifyToken, async (req, res) => {
  try {
    const user_id = req.user_id;
    const { product_id, size } = req.body;

    const cart = await getCartByUser(user_id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex((item) => {
      return item.product_id._id.toString() === product_id;
    });

    if (productIndex > -1 && cart.products[productIndex].size === size) {
      const product = cart.products[productIndex];
      cart.products.splice(productIndex, 1);
      cart.total_price -= product.product_id.price * product.quantity;
    } else {
      return res
        .status(404)
        .json({ message: "Product with this size not found in cart" });
    }

    const result = await updateCart(cart._id, cart);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// increase quantity of product in cart
router.put("/increase-product-quantity", verifyToken, async (req, res) => {
  try {
    const user_id = req.user_id;
    const { product_id, size } = req.body;

    const cart = await getCartByUser(user_id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // get product
    const product = await getProductById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // get size
    const sizeIndex = product.sizes.findIndex((item) => item.size === size);
    if (sizeIndex === -1) {
      return res.status(404).json({ message: "Size not found" });
    }

    const productIndex = cart.products.findIndex((item) => {
      return (
        item.product_id._id.toString() === product_id && item.size === size
      );
    });

    if (productIndex > -1) {
      const tempProduct = cart.products[productIndex];
      tempProduct.quantity += 1;

      if (tempProduct.quantity > product.sizes[sizeIndex].quantity) {
        return res.status(404).json({
          message: `Only available ${product.sizes[sizeIndex].quantity} items of this size.`,
        });
      }

      cart.total_price += tempProduct.product_id.price;
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const result = await updateCart(cart._id, cart);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// decrease quantity of product in cart
router.put("/decrease-product-quantity", verifyToken, async (req, res) => {
  try {
    const user_id = req.user_id;
    const { product_id, size } = req.body;

    const cart = await getCartByUser(user_id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex((item) => {
      return (
        item.product_id._id.toString() === product_id && item.size === size
      );
    });

    if (productIndex > -1) {
      const product = cart.products[productIndex];
      if (product.quantity === 1) {
        cart.products.splice(productIndex, 1);
      } else {
        product.quantity -= 1;
      }
      cart.total_price -= product.product_id.price;
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const result = await updateCart(cart._id, cart);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

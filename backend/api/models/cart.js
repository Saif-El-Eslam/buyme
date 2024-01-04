import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  products: {
    type: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
    default: [],
  },
  total_price: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;

// create a new cart
export const createCart = async (cart) => {
  try {
    const newCart = new Cart(cart);
    const result = await newCart.save();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get all carts
export const getCarts = async () => {
  try {
    const carts = await Cart.find()
      .populate("user_id")
      .populate("products.product_id");
    return carts;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get a single cart By Id
export const getCartById = async (id) => {
  try {
    const cart = await Cart.findById(id)
      .populate("user_id")
      .populate("products.product_id");
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get cart by user
export const getCartByUser = async (id) => {
  try {
    const cart = await Cart.findOne({ user_id: id })
      .populate("user_id")
      .populate("products.product_id");
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

// update a cart
export const updateCart = async (id, cart) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(id, cart, {
      new: true,
    })
      .populate("user_id")
      .populate("products.product_id");
    return updatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

// delete a cart
export const deleteCart = async (id) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(id);
    return deletedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

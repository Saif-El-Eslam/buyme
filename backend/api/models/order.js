import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    order_date: {
      type: Date,
      default: Date.now,
      required: true,
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
    },
    total_price: {
      type: Number,
      required: true,
    },
    delivery_address: {
      type: {
        street: {
          type: String,
          required: "Street is required",
        },
        city: {
          type: String,
          required: "City is required",
        },
        governorate: {
          type: String,
          required: "Governorate is required",
        },
        country: {
          type: String,
          required: "Country is required",
        },
        notes: {
          type: String,
        },
      },
      required: true,
    },
    payment_method: {
      type: {
        payment_type: {
          type: String,
          required: "Payment Type is required",
          enum: ["cash", "card"],
          default: "cash",
        },
        card_details: {
          type: {
            card_number: {
              type: String,
              required: "Card number is required",
            },
            expiry_date: {
              type: String,
              required: "Expiry date is required",
            },
            cvv: {
              type: String,
              required: "CVV is required",
            },
            notes: {
              type: String,
            },
          },
        },
      },
    },
    status: {
      type: String,
      enum: ["ordered", "delevered", "cancelled"],
      default: "ordered",
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

// create a new order
export const createOrder = async (order) => {
  try {
    const newOrder = new Order(order);
    const result = await newOrder.save();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get all orders
export const getOrders = async (
  fields = [],
  userFields = [],
  ordersCount,
  pageNum
) => {
  try {
    const orders = await Order.find()
      .skip(pageNum)
      .limit(ordersCount)
      // .populate("user_id")
      // .populate("products.product_id")
      .populate({ path: "user_id", select: userFields })
      .select(fields)
      .sort({ createdAt: -1 });

    const allOrdersCount = await Order.countDocuments();

    return { orders, allOrdersCount };
  } catch (error) {
    throw new Error(error.message);
  }
};

// get orders in the last N days
export const getOrdersInLastNDays = async (n) => {
  try {
    const orders = await Order.find({
      createdAt: {
        $gte: new Date(new Date() - n * 60 * 60 * 24 * 1000),
      },
    })
      .populate("user_id")
      .populate("products.product_id");
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get orders by status
export const getOrdersByStatus = async (status) => {
  try {
    const orders = await Order.find({ status })
      .populate("user_id")
      .populate("products.product_id");
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get a single order By Id
export const getOrderById = async (id) => {
  try {
    const order = await Order.findById(id)
      .populate("user_id")
      .populate("products.product_id");
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get orders by user
export const getOrdersByUser = async (
  id,
  fields = [],
  userFields = [],
  ordersCount,
  pageNum
) => {
  try {
    const orders = await Order.find({ user_id: id })
      .skip(pageNum)
      .limit(ordersCount)
      // .populate("user_id")
      // .populate("products.product_id")
      .populate({ path: "user_id", select: userFields })
      .select(fields)
      .sort({ createdAt: -1 });

    const allOrdersCount = await Order.countDocuments({ user_id: id });

    return { orders, allOrdersCount };
  } catch (error) {
    throw new Error(error.message);
  }
};

// update a orders
export const updateOrder = async (id, orders) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, orders, {
      new: true,
    })
      .populate("user_id")
      .populate("products.product_id");
    return updatedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

// delete a order
export const deleteOrder = async (id) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    return deletedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

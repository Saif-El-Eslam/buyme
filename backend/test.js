import { connectDB } from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();
// Connect to MongoDB
connectDB();

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./api/models/user.js";
import {
  createProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} from "./api/models/product.js";
import {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  deleteCart,
} from "./api/models/cart.js";
import {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByUser,
  updateOrder,
  deleteOrder,
} from "./api/models/order.js";

try {
  const user = {
    first_name: "John",
    last_name: "Doe",
    email: "example@test.com",
    password_hash: "password",
    phone: "1234567890",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      country: "USA",
    },
    payment_method: {
      card_number: "1234567890",
      expiry_date: "01/23",
      cvv: "123",
    },
  };

  //   createUser(user).then((result) => {
  //     console.log(result);
  //   });

  //   getUsers().then((result) => {
  //     console.log(result);
  //   });

  //   getUserById("6581cf8c4d352968125b97a6").then((result) => {
  //     console.log(result);
  //   });

  //   updateUser("6581cf8c4d352968125b97a6", { email: "example@test.com" }).then(
  //     (result) => {
  //       console.log(result);
  //     }
  //   );

  //   deleteUser("6581cf8c4d352968125b97a6").then((result) => {
  //     console.log(result);
  //   });

  const product = {
    title: "Product 1",
    description: "Product 1 description",
    price: 10,
    category: "Category 2",
    images: ["https://picsum.photos/200"],
    quantity: 10,
  };

  //   createProduct(product).then((result) => {
  //     console.log(result);
  //   });

  //   getProducts().then((result) => {
  //     console.log(result);
  //   });

  //   getProductById("6581db265367559b6a381060").then((result) => {
  //     console.log(result);
  //   });

  //   getProductsByCategory("Category 1").then((result) => {
  //     console.log(result);
  //   });

  //   updateProduct("6581db265367559b6a381060", { price: 20 }).then((result) => {
  //     console.log(result);
  //   });

  //   deleteProduct("6581db265367559b6a381060").then((result) => {
  //     console.log(result);
  //   });

  const cart = {
    user_id: "6581cf8c4d352968125b97a6",
    products: [
      {
        product_id: "6581db265367559b6a381060",
        quantity: 2,
      },
    ],
    total_price: 20,
  };

  //   createCart(cart).then((result) => {
  //     console.log(result);
  //   });

  //   getCarts().then((result) => {
  //     console.log(result);
  //   });

  //   getCartById("6581db265367559b6a381060").then((result) => {
  //     console.log(result);
  //   });

  //   updateCart("6581db265367559b6a381060", { total_price: 30 }).then((result) => {
  //     console.log(result);
  //   });

  //   deleteCart("6581dfcd3115a87d72dfb902").then((result) => {
  //     console.log(result);
  //   });

  const order = {
    user_id: "6581cf8c4d352968125b97a6",
    products: [
      {
        product_id: "6581db265367559b6a381060",
        quantity: 2,
      },
    ],
    total_price: 20,
    delivery_address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      country: "USA",
      notes: "Leave at the door",
    },
    payment_method: {
      card_number: "1234567890",
      expiry_date: "01/23",
      cvv: "123",
    },
  };

  //   createOrder(order).then((result) => {
  //     console.log(result);
  //   });

  //   getOrders().then((result) => {
  //     console.log(result);
  //   });

  //   getOrderById("6581f562b65a85fd7ae139ca").then((result) => {
  //     console.log(result);
  //   });

  //   getOrdersByUser("6581da83803f6aae5abc735c").then((result) => {
  //     console.log(result);
  //   });

  //   updateOrder("6581f562b65a85fd7ae139ca", { total_price: 30 }).then(
  //     (result) => {
  //       console.log(result);
  //     }
  //   );

  //   deleteOrder("6581f562b65a85fd7ae139ca").then((result) => {
  //     console.log(result);
  //   });
} catch (error) {
  console.log(error.message);
}

import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/db.js";

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

import authRouter from "./api/routes/auth.js";
import productsRouter from "./api/routes/products.js";
import cartRouter from "./api/routes/cart.js";
import ordersRouter from "./api/routes/orders.js";
import profileRouter from "./api/routes/profile.js";

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/profile", profileRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is listening at http://localhost:${process.env.SERVER_PORT}`
  );
});

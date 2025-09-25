const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const globalErrorHandler = require("./src/middleware/globalErrorHandler");

const authRouter = require("./src/router/auth.routes");
const categroyRouter = require("./src/router/category.routes");
const productRouter = require("./src/router/product.routes");
const couponRouter = require("./src/router/coupon.routes");
const cartRouter = require("./src/router/cart.routes");
const orderRouter = require("./src/router/order.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.use(authRouter);
app.use(categroyRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(couponRouter);

// Route not found handler
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  next(err);
});

app.use(globalErrorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

import express from "express";

import {
  placeOrder,
  getMyOrders,
} from "../Controllers/checkoutController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();


// ===============================
// PLACE ORDER
// ===============================

router.post(
  "/place",
  authMiddleware,
  placeOrder
);


// ===============================
// GET MY ORDERS
// ===============================

router.get(
  "/my-orders",
  authMiddleware,
  getMyOrders
);

export default router;
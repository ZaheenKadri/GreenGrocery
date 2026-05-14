import express from "express";

import {
  addToCart,
  getCartProducts,
  removeFromCart,
} from "../Controllers/CartController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// ============================
// ADD TO CART
// ============================

router.post(
  "/",
  authMiddleware,
  addToCart
);

// ============================
// GET CART
// ============================

router.get(
  "/",
  authMiddleware,
  getCartProducts
);

// ============================
// REMOVE FROM CART
// ============================

router.delete(
  "/:productId",
  authMiddleware,
  removeFromCart
);

export default router;
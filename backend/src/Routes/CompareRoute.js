import express from "express";

import {
    addToCompare,
    getCompareProducts,
    removeFromCompare,
} from "../Controllers/CompareController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// ✅ ADD
router.post("/", authMiddleware, addToCompare);

// ✅ GET
router.get("/", authMiddleware, getCompareProducts);

// ✅ REMOVE
router.delete("/:productId", authMiddleware, removeFromCompare);

export default router;
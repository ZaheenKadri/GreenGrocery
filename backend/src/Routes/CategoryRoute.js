import express from "express";
import {
  getCategories,
  addCategory,
  deleteCategory,
} from "../Controllers/CategoryController.js";

const router = express.Router();

// ✅ GET all categories
router.get("/", getCategories);

// ✅ ADD new category
router.post("/", addCategory);

// ✅ DELETE category
router.delete("/:id", deleteCategory);

export default router; 
import express from "express";
import {
  getFaqs,
  addFaq,
  addManyFaqs,
  deleteFaq
} from "../Controllers/FaqsController.js";

const router = express.Router();

router.get("/", getFaqs);
router.post("/add", addFaq);
router.post("/add-many", addManyFaqs); // ✅ IMPORTANT
router.delete("/:id", deleteFaq);

export default router;
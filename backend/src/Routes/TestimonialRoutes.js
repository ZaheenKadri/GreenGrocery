import express from "express";
import { getTestimonials, addTestimonials } from "../Controllers/TestimonialController.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/add-many", addTestimonials);

export default router;
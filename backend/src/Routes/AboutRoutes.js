import express from "express";
import { getAbout, addAbout } from "../Controllers/AboutController.js";

const router = express.Router();

router.get("/", getAbout);
router.post("/add", addAbout);

export default router;
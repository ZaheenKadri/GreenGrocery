import express from "express";
import { createContact } from "../Controllers/ContactController.js";

const router = express.Router();

router.post("/contact", createContact);

export default router;
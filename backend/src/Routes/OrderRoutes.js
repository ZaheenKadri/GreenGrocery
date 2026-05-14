import express from "express";
import { trackOrder } from "../Controllers/OrderController.js";

const router = express.Router();

router.post("/track", trackOrder);

export default router;
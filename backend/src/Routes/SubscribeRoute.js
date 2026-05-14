import express from "express";
import { subscribeUser } from "../Controllers/SubscribeController.js";

const router = express.Router();

router.post("/", subscribeUser);

export default router;
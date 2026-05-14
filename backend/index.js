import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/Config/db.js";
import UserRoute from "./src/Routes/UserRoute.js";
import SubscribeRoute from "./src/Routes/SubscribeRoute.js";
import BlogRoute from "./src/Routes/BlogRoute.js";
import ContactRoute from "./src/Routes/ContactRoute.js";
import CategoryRoute from "./src/Routes/CategoryRoute.js";
import faqRoutes from "./src/Routes/FaqRoutes.js";
import orderRoutes from "./src/Routes/OrderRoutes.js";
import aboutRoutes from "./src/Routes/AboutRoutes.js";
import testimonialRoutes from "./src/Routes/TestimonialRoutes.js";
import ProductRoutes from "./src/Routes/ProductRoute.js";
import compareRoutes from "./src/Routes/CompareRoute.js";
import wishlistRoutes from "./src/Routes/wishlistRoutes.js";
import cartRoutes from "./src/Routes/cartRoutes.js";
import checkoutRoutes from "./src/Routes/checkoutRoutes.js";

dotenv.config();


// Initialize App
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// Images
app.use("/images", express.static("images"));

// Routes
app.use("/api/users", UserRoute);
app.use("/api/subscribe", SubscribeRoute);
app.use("/api/blogs", BlogRoute);
app.use("/api", ContactRoute);
app.use("/api/categories", CategoryRoute);
app.use("/api/faqs", faqRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/compare", compareRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));

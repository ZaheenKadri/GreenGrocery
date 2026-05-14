import express from "express";

import {
    addToWishlist,
    getWishlistProducts,
    removeFromWishlist,
} from "../Controllers/WishlistController.js";

// ✅ IMPORT DEFAULT
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// ✅ ADD TO WISHLIST
router.post(
    "/",
    authMiddleware,
    addToWishlist
);

// ✅ GET WISHLIST PRODUCTS
router.get(
    "/",
    authMiddleware,
    getWishlistProducts
);

// ✅ REMOVE FROM WISHLIST
router.delete(
    "/:productId",
    authMiddleware,
    removeFromWishlist
);

export default router;
import Wishlist from "../Models/WishlistModel.js";

// ✅ ADD TO WISHLIST
export const addToWishlist = async (req, res) => {

    try {

        const userId = req.user.id;
        const { productId } = req.body;

        let wishlist = await Wishlist.findOne({ user: userId });

        // ✅ CREATE WISHLIST IF NOT EXISTS
        if (!wishlist) {

            wishlist = await Wishlist.create({
                user: userId,
                products: [productId],
            });

            return res.status(201).json({
                success: true,
                message: "Product added to wishlist",
                data: wishlist,
            });
        }

        // ✅ PREVENT DUPLICATES
        if (wishlist.products.includes(productId)) {

            return res.status(400).json({
                success: false,
                message: "Product already in wishlist",
            });
        }

        wishlist.products.push(productId);

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            data: wishlist,
        });

    } catch (error) {

        console.error("WISHLIST ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// ✅ GET WISHLIST PRODUCTS
export const getWishlistProducts = async (req, res) => {

    try {

        const userId = req.user.id;

        const wishlist = await Wishlist.findOne({
            user: userId,
        }).populate("products");

        if (!wishlist) {

            return res.status(200).json({
                success: true,
                data: [],
            });
        }

        res.status(200).json({
            success: true,
            data: wishlist.products,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// ✅ REMOVE PRODUCT FROM WISHLIST
export const removeFromWishlist = async (req, res) => {

    try {

        const userId = req.user.id;
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({
            user: userId,
        });

        if (!wishlist) {

            return res.status(404).json({
                success: false,
                message: "Wishlist not found",
            });
        }

        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId
        );

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Removed from wishlist",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
import Compare from "../Models/CompareModel.js";

// ✅ ADD TO COMPARE
export const addToCompare = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        let compare = await Compare.findOne({ user: userId });

        // ✅ Create compare document if not exists
        if (!compare) {
            compare = await Compare.create({
                user: userId,
                products: [productId],
            });

            return res.status(201).json({
                success: true,
                message: "Product added to compare",
                data: compare,
            });
        }

        // ✅ Prevent duplicates
        if (compare.products.includes(productId)) {
            return res.status(400).json({
                success: false,
                message: "Product already in compare",
            });
        }

        compare.products.push(productId);

        await compare.save();

        res.status(200).json({
            success: true,
            message: "Product added to compare",
            data: compare,
        });

    } catch (error) {
        console.error("COMPARE ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// ✅ GET COMPARE PRODUCTS
export const getCompareProducts = async (req, res) => {
    try {
        const userId = req.user.id;

        const compare = await Compare.findOne({ user: userId })
        .populate("products");

        if (!compare) {
            return res.status(200).json({
                success: true,
                data: [],
            });
        }

        res.status(200).json({
            success: true,
            data: compare.products,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// ✅ REMOVE PRODUCT FROM COMPARE
export const removeFromCompare = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const compare = await Compare.findOne({ user: userId });

        if (!compare) {
            return res.status(404).json({
                success: false,
                message: "Compare not found",
            });
        }

        compare.products = compare.products.filter(
            (id) => id.toString() !== productId
        );

        await compare.save();

        res.status(200).json({
            success: true,
            message: "Removed from compare",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
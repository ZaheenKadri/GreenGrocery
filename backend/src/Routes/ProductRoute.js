import express from "express";
import {
    addProduct, 
    getProducts,
    getFeaturedProducts,
    getProductTags,
    getBrands,
    getKg,
    getColors,
    filterByPrice,
    getCampaigns,
    getCampaignProducts,
    getProductsByStatus,
    getBestSellers,
    getOnSaleProducts,
    getProductsByCategory,
    getProductsBySubcategory,
    getRelatedProducts,
    getPrevNextProduct,
    getProductById
} from "../Controllers/ProductController.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/tags", getProductTags);
router.get("/brands", getBrands);
router.get("/kg", getKg);
router.get("/colors", getColors);
router.get("/filter-by-price", filterByPrice);
router.get("/campaigns", getCampaigns);
router.get("/campaign-products/:discount", getCampaignProducts);
router.get("/status/:status", getProductsByStatus);
router.get("/bestsellers", getBestSellers);
router.get("/onsale", getOnSaleProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/category/:category/:subcategory", getProductsBySubcategory);
router.get("/related/:id", getRelatedProducts);
router.get("/prev-next/:id", getPrevNextProduct);   
router.get("/:id", getProductById);

export default router;
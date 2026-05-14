import Product from "../Models/ProductModel.js";

// 🔧 Helper → convert string OR array to array
const toArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split(",").map((v) => v.trim());
};

// 🔧 Helper → convert features
const toFeaturesArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split("\n").map((v) => v.trim());
};

// ✅ ADD PRODUCT (Single + Bulk)
export const addProduct = async (req, res) => {
  try {
    let data = req.body;

    // 🔴 Check if empty
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "No data provided",
      });
    }

    // ✅ BULK INSERT
    if (Array.isArray(data)) {
      const formattedData = data.map((item) => ({
        name: item.name,
        img: item.img,
        price: item.price,
        oldPrice: item.oldPrice,
        badge: item.badge,
        discount: item.discount,
        status: item.status || "In Stock",

        featured: item.featured || false,

        // ✅ Convert fields safely
        category: toArray(item.category),
        tags: toArray(item.tags || item.Tags),
        brands: toArray(item.brands || item.Brands),
        color: toArray(item.color || item.Color),
        kg: toArray(item.kg || item.Kg),

        features: toFeaturesArray(item.features || item.Features),

        // ✅ Handle naming differences
        subText: item.subText || item["Sub-text"],
        description: item.description || item.Description,
        weight: item.weight || item.Weight,
        dimensions: item.dimensions || item.Dimensions,
      }));

      const inserted = await Product.insertMany(formattedData);

      return res.status(201).json({
        success: true,
        message: "Bulk products added successfully",
        count: inserted.length,
      });
    }

    // ✅ SINGLE INSERT
    const item = data;

    const formattedItem = {
      name: item.name,
      img: item.img,
      price: item.price,
      oldPrice: item.oldPrice,
      badge: item.badge,
      discount: item.discount,
      status: item.status || "In Stock",

      featured: item.featured || false,

      category: toArray(item.category),
      tags: toArray(item.tags || item.Tags),
      brands: toArray(item.brands || item.Brands),
      color: toArray(item.color || item.Color),
      kg: toArray(item.kg || item.Kg),

      features: toFeaturesArray(item.features || item.Features),

      subText: item.subText || item["Sub-text"],
      description: item.description || item.Description,
      weight: item.weight || item.Weight,
      dimensions: item.dimensions || item.Dimensions,
    };

    const newProduct = await Product.create(formattedItem);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });

  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

// ✅ GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};


// ✅ GET SINGLE PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    // ❌ If not found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ Success (no heavy data)
    res.status(200).json({
      success: true,
      data: product,
    });

  } catch (error) {
    console.error("GET PRODUCT BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching product",
    });
  }
};

// ✅ RELATED PRODUCTS
export const getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const currentProduct = await Product.findById(id);

    if (!currentProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const related = await Product.find({
      _id: { $ne: id }, // exclude current product
      category: { $in: currentProduct.category }, // match category
    }).limit(6);

    res.status(200).json({
      success: true,
      data: related,
    });

  } catch (error) {
    console.error("RELATED PRODUCTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch related products",
    });
  }
};

// ✅ VIEWERS ALSO LIKED (Featured Products)
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(8);

    res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error) {
    console.error("FEATURED PRODUCTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured products",
    });
  }
};


export const getPrevNextProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔹 Get all products sorted (IMPORTANT: same order everywhere)
    const products = await Product.find().sort({ _id: 1 });

    // 🔹 Find current index
    const currentIndex = products.findIndex(
      (p) => p._id.toString() === id
    );

    if (currentIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔹 Get previous and next
    const prev = currentIndex > 0 ? products[currentIndex - 1] : null;
    const next =
      currentIndex < products.length - 1
        ? products[currentIndex + 1]
        : null;

    res.json({
      prev: prev
        ? { _id: prev._id, name: prev.name }
        : null,
      next: next
        ? { _id: next._id, name: next.name }
        : null,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getProductTags = async (req, res) => {
  try {
    const products = await Product.find();

    let tagMap = {};

    products.forEach((product) => {
      product.tags?.forEach((tag) => {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      });
    });

    res.status(200).json({
      success: true,
      data: tagMap,
    });

  } catch (error) {
    console.error("GET TAGS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch tags",
    });
  }
};

// ✅ GET ALL BRANDS WITH COUNT
export const getBrands = async (req, res) => {
  try {
    const products = await Product.find();

    const brandMap = {};

    products.forEach((p) => {
      if (p.brands && p.brands.length > 0) {
        p.brands.forEach((brand) => {
          brandMap[brand] = (brandMap[brand] || 0) + 1;
        });
      }
    });

    res.status(200).json({
      success: true,
      data: brandMap,
    });

  } catch (error) {
    console.error("GET BRANDS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch brands",
    });
  }
};

export const getKg = async (req, res) => {
  try {
    const products = await Product.find();

    const kgCount = {};

    products.forEach((p) => {
      if (Array.isArray(p.kg)) {
        p.kg.forEach((kgValue) => {
          kgCount[kgValue] = (kgCount[kgValue] || 0) + 1;
        });
      }
    });

    res.json({ success: true, data: kgCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getColors = async (req, res) => {
  try {
    const products = await Product.find();

    const colorCount = {};

    products.forEach(p => {
      if (p.color) {
        p.color.forEach(c => {
          colorCount[c] = (colorCount[c] || 0) + 1;
        });
      }
    });

    res.json({ data: colorCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const filterByPrice = async (req, res) => {
  try {
    const min = Number(req.query.min);
    const max = Number(req.query.max);

    const products = await Product.aggregate([
      {
        $addFields: {
          numericPrice: {
            $toDouble: {
              $replaceAll: {
                input: "$price",
                find: { $literal: "$" },   // ✅ FIX HERE
                replacement: ""
              }
            }
          }
        }
      },
      {
        $match: {
          numericPrice: { $gte: min, $lte: max }
        }
      }
    ]);

    res.json({ success: true, data: products });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const products = await Product.find();

    const discounMap = {};

    products.forEach((p) => {
      if (p.discount) {
        discounMap[p.discount] = (discounMap[p.discount] || 0) + 1;
      }
    });

    const discount = Object.entries(discounMap).map(([name, count]) => ({
      name,
      count,
    }));

    res.status(200).json({
      success: true,
      data: discount,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching campaigns",
    });
  }
};

export const getCampaignProducts = async (req, res) => {
  try {
    const { discount } = req.params;

    const products = await Product.find({
      discount: `${discount}%`   // 👈 add % here
    }).limit(5);

    res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching campaign products",
    });
  }
};

// ✅ FILTER BY STATUS (USING YOUR REAL FIELD)
export const getProductsByStatus = async (req, res) => {
  try {
    const { status } = req.params; 

    const products = await Product.find({
      status: status   // 👈 EXACT MATCH
    });

    res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error) {
    console.error("STATUS FILTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to filter products",
    });
  }
};


export const getBestSellers = async (req, res) => {
  try {
    const products = await Product.find({
      tags: { $in: ["Bestseller"] }   // ✅ MATCH TAG
    }).limit(6);

    res.json({
      success: true,
      data: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getOnSaleProducts = async (req, res) => {
  try {
    const products = await Product.find({
      discount: { $exists: true, $ne: "0%" } // has discount
    }).limit(6);

    res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error) {
    console.error("ON SALE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch on-sale products",
    });
  }
};

// ✅ GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({
      category: {
        $regex: new RegExp(`^${category}$`, "i")
      }
    });

    res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error) {
    console.error("CATEGORY FILTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch category products",
    });
  }
};

export const getProductsBySubcategory = async (req, res) => {
  try {

    const { subcategory } = req.params;

    const products = await Product.find({
      category: {
        $regex: new RegExp(`^${subcategory}$`, "i")
      }
    });

    res.status(200).json({
      success: true,
      data: products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
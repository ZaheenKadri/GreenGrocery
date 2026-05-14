import Category from "../Models/CategoryModel.js";

// ✅ GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    }); 
  } catch (error) {
    console.error("GET CATEGORY ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

// ✅ ADD CATEGORY (Single + Bulk)
export const addCategory = async (req, res) => {
  try {
    const data = req.body;

    // 👉 CASE 1: If array → bulk insert
    if (Array.isArray(data)) {
      const inserted = await Category.insertMany(data);

      return res.status(201).json({
        success: true,
        message: "Bulk categories added",
        count: inserted.length,
        data: inserted,
      });
    }

    // 👉 CASE 2: Single object
    const { name, img } = data;

    if (!name || !img) {
      return res.status(400).json({
        success: false,
        message: "Name and Image are required",
      });
    }

    const newCategory = new Category({ name, img });
    const saved = await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category added",
      data: saved,
    });

  } catch (error) {
    console.error("ADD CATEGORY ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add category",
    });
  }
};

// ✅ DELETE CATEGORY (optional but useful)
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};
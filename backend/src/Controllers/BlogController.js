import Blog from "../Models/BlogModel.js";


// ✅ CREATE BLOG
export const createBlog = async (req, res) => {
  try {
    const data = req.body;

    // If array → insert many
    if (Array.isArray(data)) {
      const blogs = await Blog.insertMany(data);
      return res.status(201).json({
        message: "Multiple blogs created ✅",
        blogs
      });
    }

    // Single object
    const {
      title,
      desc
    } = data;

    if (!title || !desc) {
      return res.status(400).json({ message: "Title and Description required" });
    }

    const blog = await Blog.create(data);

    res.status(201).json({
      message: "Blog created successfully ✅",
      blog
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ GET ALL BLOGS
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: blogs.length,
      blogs
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ GET SINGLE BLOG
export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid ID or Server error" });
  }
};


// ✅ UPDATE BLOG
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      maindesc,
      desc,
      subTitle,
      subDesc,
      list,
      subDesc1,
      categories,
      img
    } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        maindesc,
        desc,
        subTitle,
        subDesc,
        list,
        subDesc1,
        categories,
        img
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully ✏️",
      blog: updatedBlog
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ DELETE BLOG
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog deleted successfully 🗑️"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ GET UNIQUE CATEGORIES WITH COUNT
export const getCategories = async (req, res) => {
  try {
    const categories = await Blog.aggregate([
      { $unwind: "$categories" }, // break array
      {
        $group: {
          _id: "$categories",     // category name
          count: { $sum: 1 }      // count blogs
        }
      },
      { $sort: { count: -1 } }    // optional (top categories first)
    ]);

    res.status(200).json({
      categories
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ GET ARCHIVES (MONTH + YEAR + COUNT)
export const getArchives = async (req, res) => {
  try {
    const archives = await Blog.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1
        }
      }
    ]);

    res.status(200).json({ archives });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ GET BLOGS BY ARCHIVE (MONTH + YEAR)
export const getBlogsByArchive = async (req, res) => {
  try {
    const { year, month } = req.query;

    const blogs = await Blog.find({
      $expr: {
        $and: [
          { $eq: [{ $year: "$createdAt" }, parseInt(year)] },
          { $eq: [{ $month: "$createdAt" }, parseInt(month)] }
        ]
      }
    }).sort({ createdAt: -1 });

    res.status(200).json({ blogs });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET RELATED BLOGS (by category)
export const getRelatedBlogs = async (req, res) => {
  try {
    const { id } = req.params;

    const currentBlog = await Blog.findById(id);

    const related = await Blog.find({
      _id: { $ne: id }, // exclude current blog
      categories: { $in: currentBlog.categories }
    }).limit(6);

    res.status(200).json({ blogs: related });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAdjacentBlogs = async (req, res) => {
  try {
    const { id } = req.params;

    const current = await Blog.findById(id);

    if (!current) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // 🔥 PREVIOUS BLOG
    const prev = await Blog.findOne({
      _id: { $lt: current._id }
    }).sort({ _id: -1 });

    // 🔥 NEXT BLOG
    const next = await Blog.findOne({
      _id: { $gt: current._id }
    }).sort({ _id: 1 });

    res.json({ prev, next });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
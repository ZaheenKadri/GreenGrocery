import express from "express";
import {
  createBlog,
  getBlogs,
  getCategories,
  getArchives, 
  getBlogsByArchive,
  getRelatedBlogs,
  getAdjacentBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog
} from "../Controllers/BlogController.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/archives", getArchives);
router.get("/archive-filter", getBlogsByArchive);
router.get("/", getBlogs);
router.post("/", createBlog);
router.get("/related/:id", getRelatedBlogs);
router.get("/prev-next/:id", getAdjacentBlogs);
router.get("/:id", getSingleBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;


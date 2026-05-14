import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  maindesc: String,
  desc: String,
  subTitle: String,
  subDesc: String,

  list: [String], // ✅ array

  subDesc1: String,

  categories: [String], // ✅ array

  img: String
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
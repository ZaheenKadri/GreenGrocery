import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  topTitle: String,
  topText: String,

  sectionTitle: String,
  sectionText: String,

  images: {
    left1: String,
    left2: String,
    middle: String
  },

  factsText: String,

  stories: [
    {
      img: String,
      title: String
    }
  ],

  features: [
    {
      label: String,
      title: String,
      button: String
    }
  ]
}, { timestamps: true });

export default mongoose.model("About", aboutSchema);

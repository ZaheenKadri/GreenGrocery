import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    img: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    oldPrice: {
      type: String,
    },

    subText: {
      type: String,
    },

    badge: {
      type: String,
    },

    discount: {
      type: String,
    },

    status: {
      type: String,
    },

    featured: {
      type: Boolean,
    },

    // ✅ ARRAYS
    category: [
      {
        type: String,
      },
    ],

    tags: [
      {
        type: String,
      },
    ],

    brands: [
      {
        type: String,
      },
    ],

    features: [
      {
        type: String,
      },
    ],

    color: [
      {
        type: String,
      },
    ],

    kg: [
      {
        type: String,
      },
    ],

    // ✅ TEXT FIELDS
    description: {
      type: String,
    },

    weight: {
      type: String,
    },

    dimensions: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
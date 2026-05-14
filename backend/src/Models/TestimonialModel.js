import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  text: String,
  name: String,
  role: String
}, { timestamps: true });

export default mongoose.model("Testimonial", testimonialSchema);


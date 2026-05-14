import Testimonial from "../Models/TestimonialModel.js";

// GET ALL
export const getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD MANY (bulk)
export const addTestimonials = async (req, res) => {
  try {
    const { testimonials } = req.body;

    const inserted = await Testimonial.insertMany(testimonials);

    res.status(201).json(inserted);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
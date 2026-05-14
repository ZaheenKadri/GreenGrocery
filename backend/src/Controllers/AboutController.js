import About from "../Models/AboutModel.js";

// GET ABOUT DATA
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne(); // single doc

    res.status(200).json(about);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD ABOUT DATA
export const addAbout = async (req, res) => {
  try {
    const newAbout = new About(req.body);
    await newAbout.save();

    res.status(201).json(newAbout);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
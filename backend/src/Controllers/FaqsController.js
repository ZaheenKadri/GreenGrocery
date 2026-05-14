import FAQ from "../Models/FaqModel.js";

// ✅ GET ALL FAQ (GROUPED)
export const getFaqs = async (req, res) => {
  try {
    const faqs = await FAQ.find();

    const groupedFaqs = {};

    faqs.forEach(faq => {
      if (!groupedFaqs[faq.category]) {
        groupedFaqs[faq.category] = [];
      }
      groupedFaqs[faq.category].push(faq);
    });

    res.status(200).json(groupedFaqs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ADD SINGLE FAQ
export const addFaq = async (req, res) => {
  try {
    const { category, question, answer } = req.body;

    const faq = new FAQ({ category, question, answer });
    await faq.save();

    res.status(201).json(faq);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ADD MANY FAQ (🔥 BULK INSERT)
export const addManyFaqs = async (req, res) => {
  try {
    const { faqs } = req.body;

    const insertedFaqs = await FAQ.insertMany(faqs);

    res.status(201).json({
      message: "FAQs added successfully",
      data: insertedFaqs
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE FAQ
export const deleteFaq = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "FAQ deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
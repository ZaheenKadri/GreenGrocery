import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { timestamp: true});

export default mongoose.model("FAQ", faqSchema);
import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Гарчиг заавал байх ёстой"],
  },
  desc: {
    type: String,
    required: [true, "Тайлбар заавал байх ёстой"],
  },
  category: {
    type: String,
    default: "physics",
  },
  classCode: {
    type: String,
    required: [true, "Ангийн код заавал байх ёстой"],
  },
  config: {
    page: {
      title: { type: String, default: "" },
      subtitle: { type: String, default: "Шинэ хичээл" },
      videoUrl: { type: String, default: "" },
    },
    slider: { type: Array, default: [] },
    experiments: { type: Array, default: [] },
    theory: { type: Array, default: [] },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Topics || mongoose.model("Topics", TopicSchema);

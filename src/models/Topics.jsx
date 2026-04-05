import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true }, // physics эсвэл chemistry
    config: { type: Object, default: {} }, // Хичээлийн доторх агуулга
    href: { type: String },
  },
  { timestamps: true },
);

// Моделийн нэр Topics (олон тоо) байгаа эсэхийг шалгаарай
export default mongoose.models.Topics || mongoose.model("Topics", TopicSchema);

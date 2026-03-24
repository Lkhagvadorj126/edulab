import mongoose from "mongoose";

// Туршилтын схем
const ExperimentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  href: { type: String, required: true },
  img: { type: String },
  pageId: { type: String, required: true }, // 'motion', 'energy' гэх мэт
  createdAt: { type: Date, default: Date.now },
});

// Презентейшн (Canva) схем
const PresentationSchema = new mongoose.Schema({
  url: { type: String, required: true },
  pageId: { type: String, required: true, unique: true },
  updatedAt: { type: Date, default: Date.now },
});

// Өмнө нь үүсчихсэн бол түүнийг ашиглана, үгүй бол шинээр үүсгэнэ
export const Experiment =
  mongoose.models.Experiment || mongoose.model("Experiment", ExperimentSchema);
export const Presentation =
  mongoose.models.Presentation ||
  mongoose.model("Presentation", PresentationSchema);

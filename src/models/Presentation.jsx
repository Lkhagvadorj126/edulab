import mongoose from "mongoose";

// Presentation Model
const PresentationSchema = new mongoose.Schema({
  url: { type: String, required: true },
  pageId: { type: String, required: true }, // 'motion', 'energy' гэх мэт
  updatedAt: { type: Date, default: Date.now },
});

// Experiment Model
const ExperimentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  href: { type: String, required: true },
  img: { type: String },
  pageId: { type: String, required: true }, // Энийг нэмэх
  createdAt: { type: Date, default: Date.now },
});

export const Presentation =
  mongoose.models.Presentation ||
  mongoose.model("Presentation", PresentationSchema);
export const Experiment =
  mongoose.models.Experiment || mongoose.model("Experiment", ExperimentSchema);

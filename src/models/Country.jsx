import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
  pageId: { type: String, required: true },
  code: { type: String, required: true },
  flag: { type: String, default: "🏳️" },
  name: { type: String, required: true },
  capital: { type: String },
  region: { type: String },
  subregion: { type: String }, // Нэмэгдсэн
  population: { type: String },
  area: { type: String },
  currency: { type: String }, // Нэмэгдсэн
  languages: { type: String }, // Нэмэгдсэн
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Country ||
  mongoose.model("Country", CountrySchema);

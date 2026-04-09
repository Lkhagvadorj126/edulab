import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  pageId: { type: String, required: true },
  classCode: { type: String, default: "" },
  subject: { type: String, required: true }, // 'geography', 'biology', 'chemistry', 'physics'
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  percentage: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Загвар аль хэдийн үүссэн бол түүнийг ашиглана, үгүй бол шинээр үүсгэнэ
export default mongoose.models.Result || mongoose.model("Result", ResultSchema);

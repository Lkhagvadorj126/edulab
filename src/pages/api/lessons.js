import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("science_digital_db"); // Өгөгдлийн сангийн нэрээ нэгтгэв
  const collection = db.collection("lessons");

  const {
    id: queryId,
    pageId: queryPageId,
    classCode: queryClassCode,
  } = req.query;

  try {
    if (req.method === "GET") {
      const { pageId, classCode } = req.query;
      // ЗӨВХӨН тухайн ангийн сурагчдад харагдах шүүлтүүр
      const filter = { pageId };
      if (classCode) filter.classCode = classCode;

      const data = await collection
        .find(filter)
        .sort({ createdAt: -1 })
        .toArray();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { title, content, userId, pageId, classCode } = req.body;

      if (!title || !content || !pageId || !classCode) {
        return res.status(400).json({ message: "Мэдээлэл дутуу байна" });
      }

      const result = await collection.insertOne({
        title,
        content: Array.isArray(content) ? content : [content],
        userId: new ObjectId(userId),
        pageId,
        classCode, // АНГИЙН КОДООР ХАДГАЛАХ
        createdAt: new Date(),
      });
      return res.status(201).json(result);
    }

    if (req.method === "DELETE") {
      if (!queryId) return res.status(400).json({ message: "ID шаардлагатай" });
      await collection.deleteOne({ _id: new ObjectId(queryId) });
      return res.status(200).json({ success: true, message: "Устгагдлаа" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Серверийн алдаа" });
  }
}

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("physics_db");
  const collection = db.collection("lessons");

  const { id: queryId, pageId: queryPageId } = req.query;

  try {
    // 1. ӨГӨГДӨЛ АВАХ (GET) - pageId-ээр шүүнэ
    if (req.method === "GET") {
      const pageId = queryPageId;
      // Хэрэв pageId байвал шүүнэ, байхгүй бол бүгдийг авна
      const filter = pageId ? { pageId } : {};
      const data = await collection
        .find(filter)
        .sort({ createdAt: -1 })
        .toArray();
      return res.status(200).json(data);
    }

    // 2. ШИНЭЭР НЭМЭХ (POST)
    if (req.method === "POST") {
      const { title, content, userId, pageId } = req.body;

      if (!title || !content || !pageId) {
        return res.status(400).json({
          message: "Гарчиг, агуулга болон pageId заавал байх ёстой",
        });
      }

      const result = await collection.insertOne({
        title,
        content: Array.isArray(content) ? content : [content],
        userId,
        pageId, // Энд pageId-г хадгалж байна
        createdAt: new Date(),
      });
      return res.status(201).json(result);
    }

    // 3. ЗАСАХ (PUT)
    if (req.method === "PUT") {
      const id = req.body.id || queryId;
      const { title, content } = req.body;

      if (!id) return res.status(400).json({ message: "ID шаардлагатай" });

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title,
            content: Array.isArray(content) ? content : [content],
            updatedAt: new Date(),
          },
        },
      );
      return res.status(200).json({ message: "Амжилттай шинэчлэгдлээ" });
    }

    // 4. УСТГАХ (DELETE)
    if (req.method === "DELETE") {
      if (!queryId) return res.status(400).json({ message: "ID шаардлагатай" });
      await collection.deleteOne({ _id: new ObjectId(queryId) });
      return res
        .status(200)
        .json({ success: true, message: "Амжилттай устгагдлаа" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Серверийн алдаа гарлаа" });
  }
}

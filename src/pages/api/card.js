import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("physics_db");
    const { pageId, id } = req.query;

    // GET: Картнуудыг унших
    if (req.method === "GET") {
      if (!pageId)
        return res.status(400).json({ error: "pageId шаардлагатай" });

      const data = await db
        .collection("cards")
        .find({ pageId: pageId })
        .toArray();
      return res.status(200).json(data);
    }

    // POST: Шинээр нэмэх эсвэл Засах
    if (req.method === "POST") {
      const { id: bodyId, question, answer, pageId: bodyPageId } = req.body;

      if (bodyId) {
        // Засах логик
        await db
          .collection("cards")
          .updateOne(
            { _id: new ObjectId(bodyId) },
            { $set: { question, answer, updatedAt: new Date() } },
          );
        return res.status(200).json({ message: "Амжилттай шинэчлэгдлээ" });
      } else {
        // Шинээр нэмэх логик
        const result = await db.collection("cards").insertOne({
          question,
          answer,
          pageId: bodyPageId,
          createdAt: new Date(),
        });
        return res.status(200).json(result);
      }
    }

    // DELETE: Устгах
    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ error: "ID шаардлагатай" });
      await db.collection("cards").deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: "Устгагдлаа" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: err.message });
  }
}

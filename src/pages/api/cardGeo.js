import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("physics_db");
    const { pageId, id } = req.query;

    if (req.method === "GET") {
      if (!pageId)
        return res.status(400).json({ error: "pageId шаардлагатай" });
      const data = await db.collection("cardsGeo").find({ pageId }).toArray();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { id: bodyId, question, answer, pageId: bodyPageId } = req.body;

      if (bodyId) {
        await db
          .collection("cardsGeo")
          .updateOne(
            { _id: new ObjectId(bodyId) },
            { $set: { question, answer, updatedAt: new Date() } },
          );
        return res.status(200).json({ message: "Амжилттай шинэчлэгдлээ" });
      } else {
        const result = await db.collection("cardsGeo").insertOne({
          question,
          answer,
          pageId: bodyPageId,
          createdAt: new Date(),
        });
        return res.status(200).json(result);
      }
    }

    if (req.method === "DELETE") {
      const deleteId = id || req.query.id;
      if (!deleteId) return res.status(400).json({ error: "ID шаардлагатай" });
      await db
        .collection("cardsGeo")
        .deleteOne({ _id: new ObjectId(deleteId) });
      return res.status(200).json({ message: "Устгагдлаа" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

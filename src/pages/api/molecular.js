import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("physics_db");
  const collection = db.collection("lessons");
  const PAGE_ID = "molecular"; // Хуудасны тогтмол ID

  const { id: queryId } = req.query;

  try {
    if (req.method === "GET") {
      const data = await collection
        .find({ pageId: PAGE_ID })
        .sort({ createdAt: -1 })
        .toArray();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { title, content, userId } = req.body;
      if (!title || !content)
        return res.status(400).json({ message: "Дутуу мэдээлэл" });

      const result = await collection.insertOne({
        title,
        content: Array.isArray(content) ? content : [content],
        userId,
        pageId: PAGE_ID,
        createdAt: new Date(),
      });
      return res.status(201).json(result);
    }

    if (req.method === "PUT") {
      const id = req.body.id || queryId;
      const { title, content } = req.body;
      await collection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title,
            content: Array.isArray(content) ? content : [content],
            updatedAt: new Date(),
          },
        },
      );
      return res.status(200).json({ message: "Шинэчлэгдлээ" });
    }

    if (req.method === "DELETE") {
      await collection.deleteOne({ _id: new ObjectId(queryId) });
      return res.status(200).json({ success: true });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("physics_db");
  const { pageId, id } = req.query;

  try {
    if (req.method === "GET") {
      // pageId-аар шүүж багшийн нэмсэн тестыг авна
      const filter = pageId ? { pageId } : {};
      const data = await db.collection("tests").find(filter).toArray();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { id: editId, ...updateData } = req.body;
      if (editId) {
        // Засах
        await db
          .collection("tests")
          .updateOne(
            { _id: new ObjectId(editId) },
            { $set: { ...updateData, updatedAt: new Date() } },
          );
        return res.status(200).json({ message: "Шинэчлэгдлээ" });
      } else {
        // Шинээр нэмэх
        const result = await db.collection("tests").insertOne({
          ...req.body,
          createdAt: new Date(),
        });
        return res.status(200).json(result);
      }
    }

    if (req.method === "DELETE") {
      await db.collection("tests").deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: "Устгагдлаа" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

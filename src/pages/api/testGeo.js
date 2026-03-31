import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("physics_db"); // Баазын нэр хэвээр үлдээв
    const { pageId, id } = req.query;

    if (req.method === "GET") {
      const filter = pageId ? { pageId } : {};
      const data = await db.collection("testsGeo").find(filter).toArray();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { id: bodyId, ...updateData } = req.body;
      if (bodyId) {
        // Засах
        const editId = bodyId;
        delete updateData.id;
        await db
          .collection("testsGeo")
          .updateOne(
            { _id: new ObjectId(editId) },
            { $set: { ...updateData, updatedAt: new Date() } },
          );
        return res.status(200).json({ message: "Шинэчлэгдлээ" });
      } else {
        // Шинээр нэмэх
        const result = await db.collection("testsGeo").insertOne({
          ...req.body,
          createdAt: new Date(),
        });
        return res.status(200).json(result);
      }
    }

    if (req.method === "DELETE") {
      const deleteId = id || req.query.id;
      if (!deleteId) return res.status(400).json({ error: "ID шаардлагатай" });
      await db
        .collection("testsGeo")
        .deleteOne({ _id: new ObjectId(deleteId) });
      return res.status(200).json({ message: "Устгагдлаа" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

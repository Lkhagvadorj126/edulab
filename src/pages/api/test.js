import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("physics_db");
  const { pageId, classCode, id } = req.query;

  try {
    // --- УНШИХ (GET) ---
    if (req.method === "GET") {
      if (!pageId || !classCode) {
        return res
          .status(400)
          .json({ error: "pageId болон classCode шаардлагатай" });
      }
      const data = await db
        .collection("tests")
        .find({ pageId, classCode })
        .toArray();
      return res.status(200).json(data);
    }

    // --- ХАДГАЛАХ БОЛОН ЗАСАХ (POST) ---
    if (req.method === "POST") {
      const { id: editId, ...data } = req.body;

      if (!data.classCode || !data.pageId) {
        return res
          .status(400)
          .json({ error: "Мэдээлэл дутуу байна (classCode, pageId)" });
      }

      if (editId) {
        // Засах
        await db
          .collection("tests")
          .updateOne(
            { _id: new ObjectId(editId) },
            { $set: { ...data, updatedAt: new Date() } },
          );
        return res.status(200).json({ message: "Тест амжилттай шинэчлэгдлээ" });
      } else {
        // Шинээр нэмэх
        const result = await db.collection("tests").insertOne({
          ...data,
          createdAt: new Date(),
        });
        return res.status(200).json(result);
      }
    }

    // --- УСТГАХ (DELETE) ---
    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ error: "ID шаардлагатай" });
      await db.collection("tests").deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: "Тест устгагдлаа" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

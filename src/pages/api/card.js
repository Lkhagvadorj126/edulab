import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("physics_db");
  const { pageId, classCode, id, subject } = req.query;

  try {
    // --- УНШИХ (GET) ---
    if (req.method === "GET") {
      if (!pageId || !classCode) {
        return res
          .status(400)
          .json({ error: "pageId болон classCode шаардлагатай" });
      }

      // Шүүлтүүр: subject байвал түүгээр нь шүүнэ (geography эсвэл physics)
      let query = { pageId, classCode };
      if (subject) {
        query.subject = subject;
      }

      const data = await db.collection("cards").find(query).toArray();
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

      const finalData = {
        ...data,
        subject: data.subject || "physics", // Заагаагүй бол default нь physics
        updatedAt: new Date(),
      };

      if (editId) {
        await db
          .collection("cards")
          .updateOne({ _id: new ObjectId(editId) }, { $set: finalData });
        return res.status(200).json({ message: "Карт амжилттай шинэчлэгдлээ" });
      } else {
        const result = await db.collection("cards").insertOne({
          ...finalData,
          createdAt: new Date(),
        });
        return res.status(200).json(result);
      }
    }

    // --- УСТГАХ (DELETE) ---
    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ error: "ID шаардлагатай" });
      await db.collection("cards").deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: "Карт устгагдлаа" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

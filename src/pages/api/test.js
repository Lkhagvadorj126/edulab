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

      // Шүүлтүүр: classCode, pageId болон subject (байвал)
      let query = { pageId, classCode };
      if (subject) {
        query.subject = subject;
      }

      const data = await db.collection("tests").find(query).toArray();
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

      // Subject байхгүй бол default-оор "physics" гэж хадгална (бусад хуудаснуудад алдаа гаргахгүйн тулд)
      const finalData = {
        ...data,
        subject: data.subject || "physics",
        updatedAt: new Date(),
      };

      if (editId) {
        // Засах
        await db
          .collection("tests")
          .updateOne({ _id: new ObjectId(editId) }, { $set: finalData });
        return res.status(200).json({ message: "Амжилттай шинэчлэгдлээ" });
      } else {
        // Шинээр нэмэх
        const result = await db.collection("tests").insertOne({
          ...finalData,
          createdAt: new Date(),
        });
        return res.status(200).json(result);
      }
    }

    // --- УСТГАХ (DELETE) ---
    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ error: "ID шаардлагатай" });
      await db.collection("tests").deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: "Амжилттай устгагдлаа" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: err.message });
  }
}

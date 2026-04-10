import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("physics_db");

    // 1. ТЕСТ ТАТАХ (GET)
    if (req.method === "GET") {
      const { pageId, classCode, subject } = req.query;

      if (!pageId || !classCode) {
        return res
          .status(400)
          .json({ error: "pageId болон classCode шаардлагатай" });
      }

      let query = { pageId, classCode };
      if (subject) query.subject = subject;

      const data = await db
        .collection("tests")
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();

      return res.status(200).json(data);
    }

    // 2. ТЕСТ НЭМЭХ БОЛОН ЗАСАХ (POST)
    if (req.method === "POST") {
      // POST хүсэлтийн body-г шалгах
      const { id, question, options, answer, classCode, pageId, subject } =
        req.body;

      if (!question || !options || answer === null || !classCode || !pageId) {
        return res
          .status(400)
          .json({ error: "Мэдээлэл дутуу байна. Бүх талбарыг бөглөнө үү." });
      }

      const testData = {
        question,
        options,
        answer,
        classCode,
        pageId,
        subject: subject || "physics",
        updatedAt: new Date(),
      };

      if (id) {
        // ЗАСАХ (UPDATE)
        const result = await db
          .collection("tests")
          .updateOne({ _id: new ObjectId(id) }, { $set: testData });
        return res
          .status(200)
          .json({ message: "Амжилттай шинэчлэгдлээ", result });
      } else {
        // ШИНЭЭР НЭМЭХ (INSERT)
        const result = await db.collection("tests").insertOne({
          ...testData,
          createdAt: new Date(),
        });
        return res
          .status(200)
          .json({ message: "Амжилттай хадгалагдлаа", result });
      }
    }

    // 3. ТЕСТ УСТГАХ (DELETE)
    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res
          .status(400)
          .json({ error: "Устгах тестийн ID шаардлагатай" });
      }

      const result = await db.collection("tests").deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount === 1) {
        return res.status(200).json({ message: "Амжилттай устгагдлаа" });
      } else {
        return res.status(404).json({ error: "Устгах дата олдсонгүй" });
      }
    }

    // Бусад Method-ийг зөвшөөрөхгүй байх
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ error: "Сервер дээр алдаа гарлаа: " + error.message });
  }
}

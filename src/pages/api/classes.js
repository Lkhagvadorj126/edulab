import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("science_digital_db");

  // --- СУРАГЧДЫН ЖАГСААЛТ АВАХ (ШИНЭ) ---
  if (req.method === "GET") {
    const { classCode } = req.query;
    if (!classCode || classCode === "NO_CLASS") {
      return res.status(200).json([]);
    }
    try {
      const students = await db
        .collection("users")
        .find({ classCode: classCode })
        .project({ name: 1, email: 1, totalXp: 1, role: 1 }) // Нууц үг харуулахгүй
        .sort({ totalXp: -1 })
        .toArray();
      return res.status(200).json(students);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // --- POST ХҮСЭЛТҮҮД (ӨМНӨХ ХЭВЭЭРЭЭ) ---
  if (req.method === "POST") {
    const { action, location, school, className, classCode, userId } = req.body;
    try {
      if (action === "create") {
        const newCode = Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();
        await db.collection("classes").insertOne({
          code: newCode,
          teacherId: new ObjectId(userId),
          location,
          school,
          className,
          createdAt: new Date(),
        });
        await db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(userId) },
            { $set: { classCode: newCode, school, grade: className } },
          );
        return res.status(200).json({ success: true, code: newCode });
      }
      if (action === "join") {
        const targetClass = await db
          .collection("classes")
          .findOne({ code: classCode });
        if (!targetClass)
          return res
            .status(404)
            .json({ success: false, message: "Анги олдсонгүй" });
        await db.collection("users").updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: {
              classCode: classCode,
              school: targetClass.school,
              grade: targetClass.className,
            },
          },
        );
        return res.status(200).json({ success: true });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

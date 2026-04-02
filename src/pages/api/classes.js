import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("science_digital_db");

    // --- 1. АНГИЙН СУРАГЧДЫН ЖАГСААЛТ АВАХ (GET) ---
    if (req.method === "GET") {
      const { classCode } = req.query;

      if (!classCode || classCode === "NO_CLASS") {
        return res.status(200).json([]);
      }

      const students = await db
        .collection("users")
        .find({ classCode: classCode })
        .project({ name: 1, email: 1, totalXp: 1, role: 1 })
        .sort({ totalXp: -1 })
        .toArray();

      return res.status(200).json(students);
    }

    // --- 2. АНГИ ҮҮСГЭХ БОЛОН НЭГДЭХ (POST) ---
    if (req.method === "POST") {
      const { action, location, school, className, classCode, userId } =
        req.body;

      // АНГИ ҮҮСГЭХ (Багш)
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

      // АНГИД НЭГДЭХ (Сурагч)
      if (action === "join") {
        const targetClass = await db
          .collection("classes")
          .findOne({ code: classCode });

        if (!targetClass) {
          return res
            .status(404)
            .json({ success: false, message: "Анги олдсонгүй" });
        }

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
    }

    // --- 3. СУРАГЧИЙГ АНГИАС ХАСАХ (PATCH) ---
    if (req.method === "PATCH") {
      const { action, memberId, classCode } = req.body;

      if (action === "remove_member") {
        if (!memberId || !classCode) {
          return res
            .status(400)
            .json({ success: false, message: "Мэдээлэл дутуу байна" });
        }

        const result = await db.collection("users").updateOne(
          { _id: new ObjectId(memberId), classCode: classCode },
          {
            $set: {
              classCode: "NO_CLASS",
              school: "",
              grade: "",
            },
          },
        );

        if (result.modifiedCount === 1) {
          return res
            .status(200)
            .json({ success: true, message: "Сурагчийг хаслаа" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "Сурагч олдсонгүй" });
        }
      }
    }

    // Бусад тохиолдолд
    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

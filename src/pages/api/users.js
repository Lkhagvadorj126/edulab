import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("science_digital_db");

  if (req.method === "GET") {
    const { userId } = req.query;
    try {
      if (userId) {
        const user = await db
          .collection("users")
          .findOne({ _id: new ObjectId(userId) });
        return res.status(200).json(user);
      }
      const leaders = await db
        .collection("users")
        .find({ role: "student" })
        .sort({ totalXp: -1 })
        .limit(50)
        .toArray();
      return res.status(200).json(leaders);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const {
        userId,
        xpToAdd,
        email,
        password,
        role,
        name,
        school,
        grade,
        classCode,
        teacherCode,
      } = req.body;

      // 1. ОНОО НЭМЭХ
      if (userId && xpToAdd !== undefined) {
        const result = await db.collection("users").findOneAndUpdate(
          { _id: new ObjectId(userId) },
          {
            $inc: { totalXp: parseInt(xpToAdd) },
            $set: { lastPlayed: new Date() },
          },
          { returnDocument: "after" },
        );
        return res.status(200).json({ success: true, totalXp: result.totalXp });
      }

      // 2. ШИНЭ БҮРТГЭЛ
      if (email) {
        if (role === "teacher" && teacherCode !== "teacher2026") {
          return res
            .status(400)
            .json({ message: "Багшийн баталгаажуулах код буруу!" });
        }

        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser)
          return res.status(400).json({ message: "И-мэйл бүртгэлтэй байна." });

        const newUser = {
          email,
          password,
          name: name || "Хэрэглэгч",
          role: role || "student",
          classCode: classCode || "NO_CLASS",
          school: school || "Тодорхойгүй",
          grade: role === "teacher" ? "Teacher" : grade || "10B",
          totalXp: 0,
          createdAt: new Date(),
        };

        const registerResult = await db.collection("users").insertOne(newUser);
        return res
          .status(201)
          .json({ success: true, userId: registerResult.insertedId });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Серверийн алдаа", error: err.message });
    }
  }
}

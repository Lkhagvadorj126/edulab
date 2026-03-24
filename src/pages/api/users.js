import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("science_digital_db");

  // --- POST хүсэлт: Бүртгэл ЭСВЭЛ Оноо шинэчлэх ---
  if (req.method === "POST") {
    try {
      const { email, password, role, userId, xpToAdd } = req.body;

      // Хэрэв xpToAdd болон userId ирсэн байвал ОНОО ШИНЭЧЛЭХ (Quiz-ийн дараа)
      if (userId && xpToAdd !== undefined) {
        const result = await db
          .collection("users")
          .findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $inc: { totalXp: parseInt(xpToAdd) } },
            { returnDocument: "after" },
          );

        const updatedUser = result.value || result;
        return res.status(200).json({
          message: "Оноо амжилттай нэмэгдлээ",
          totalXp: updatedUser.totalXp,
        });
      }

      // Хэрэв email ирсэн байвал ШИНЭ БҮРТГЭЛ хийх
      if (email) {
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
          return res
            .status(400)
            .json({ message: "Энэ и-мэйл хаяг аль хэдийн бүртгэгдсэн байна." });
        }

        const newUser = {
          email,
          password, // Тэмдэглэл: Бодит төсөл дээр bcrypt ашиглаарай
          role: role || "student",
          totalXp: 0,
          createdAt: new Date(),
        };

        const registerResult = await db.collection("users").insertOne(newUser);
        return res.status(201).json({
          message: "Амжилттай бүртгэгдлээ",
          userId: registerResult.insertedId,
        });
      }

      return res
        .status(400)
        .json({ message: "Шаардлагатай мэдээлэл дутуу байна." });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Алдаа гарлаа", error: err.message });
    }
  }

  // --- GET хүсэлт: Лидерүүдийн жагсаалт ЭСВЭЛ Ганц хэрэглэгчийн мэдээлэл ---
  if (req.method === "GET") {
    try {
      const { userId } = req.query;

      // Хэрэв userId ирвэл тухайн хэрэглэгчийн мэдээллийг авах (refreshUser-д зориулав)
      if (userId) {
        const user = await db
          .collection("users")
          .findOne({ _id: new ObjectId(userId) });
        if (!user)
          return res.status(404).json({ error: "Хэрэглэгч олдсонгүй" });

        const { password, ...safeData } = user; // Нууц үгийг буцаахгүй
        return res.status(200).json(safeData);
      }

      // Лидерүүдийн жагсаалт авах
      const leaders = await db
        .collection("users")
        .find({ role: "student" })
        .sort({ totalXp: -1 })
        .limit(10) // Эхний 10 сурагч
        .toArray();
      return res.status(200).json(leaders);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

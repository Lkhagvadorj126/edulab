import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "POST only" });

  const { userId, xpToAdd } = req.body;

  if (!userId || xpToAdd === undefined) {
    return res.status(400).json({ message: "Мэдээлэл дутуу" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("science_digital_db");

    // Оноог тоо болгож хувиргах
    const points = parseInt(xpToAdd);

    // MongoDB-д оноог нэмэх ($inc)
    const result = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $inc: { totalXp: points },
        $set: { lastPlayed: new Date() },
      },
      { returnDocument: "after" },
    );

    const updatedUser = result.value || result;

    return res.status(200).json({
      success: true,
      totalXp: updatedUser.totalXp,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Алдаа гарлаа", error: error.message });
  }
}

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "POST only" });

  const { userId, xpToAdd } = req.body;

  if (!userId || xpToAdd === undefined) {
    return res.status(400).json({ message: "Мэдээлэл дутуу байна" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("science_digital_db");

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        // $set-ийн оронд $inc ашигласнаар оноо хуучин дээрээ нэмэгдэнэ
        $inc: { totalXp: parseInt(xpToAdd) },
        $set: { lastPlayed: new Date() },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    return res.status(200).json({ success: true, message: "Оноо нэмэгдлээ" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Алдаа гарлаа", error: error.message });
  }
}

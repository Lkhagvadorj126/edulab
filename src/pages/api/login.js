import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { email, password, role } = req.body;
    const client = await clientPromise;
    const db = client.db("science_digital_db");

    const user = await db.collection("users").findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "И-мэйл эсвэл нууц үг буруу" });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: "Нэвтрэх төрөл буруу байна." });
    }

    // БҮХ ДАТА-Г БУЦААХ (Энэ хэсэг маш чухал)
    return res.status(200).json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name, // Нэмсэн
        school: user.school, // Нэмсэн
        grade: user.grade, // Нэмсэн
        role: user.role,
        totalXp: user.totalXp || 0,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

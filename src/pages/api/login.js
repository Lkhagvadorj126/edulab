import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "POST only" });

  try {
    const { email, password, role } = req.body;
    const client = await clientPromise;
    const db = client.db("science_digital_db");

    const user = await db.collection("users").findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "И-мэйл эсвэл нууц үг буруу" });
    }

    // Role шалгалт: Сурагч багшийн эрхээр, багш сурагчийн эрхээр орохоос сэргийлнэ
    if (user.role !== role) {
      return res.status(403).json({
        message: `Та ${user.role === "teacher" ? "Багш" : "Сурагч"} төрлөөр бүртгүүлсэн байна. Сонголтоо шалгана уу.`,
      });
    }

    return res.status(200).json({
      message: "Амжилттай",
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        totalXp: user.totalXp || 0,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Сервер алдаа", error: error.message });
  }
}

// src/pages/api/classes.js
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Зөвхөн POST хүсэлт зөвшөөрөгдөнө" });
  }

  const { action, className, classCode } = req.body;

  // 1. АНГИ ҮҮСГЭХ ЛОГИК (Багш)
  if (action === "create") {
    if (!className) {
      return res
        .status(400)
        .json({ success: false, message: "Ангийн нэр оруулна уу!" });
    }

    // Санамсаргүй 6 оронтой код үүсгэх (Жишээ нь: X8Y2A1)
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Энд өгөгдлийн санд (Database) хадгалах код бичигдэнэ
    return res.status(200).json({ success: true, code: newCode });
  }

  // 2. АНГИД НЭГДЭХ ЛОГИК (Сурагч)
  if (action === "join") {
    if (!classCode || classCode.length !== 6) {
      return res
        .status(400)
        .json({ success: false, message: "6 оронтой код оруулна уу!" });
    }

    // Жишээ баталгаажуулалт (Бодит системд DB-ээс шүүнэ)
    // Одоохондоо бүх 6 оронтой кодыг зөв гэж тооцъё
    return res
      .status(200)
      .json({ success: true, message: "Амжилттай нэгдлээ" });
  }

  return res.status(400).json({ message: "Буруу үйлдэл" });
}

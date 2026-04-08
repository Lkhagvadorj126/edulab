import dbConnect from "@/lib/dbConnect";
import Topics from "@/models/Topics";

export default async function handler(req, res) {
  await dbConnect();

  // Браузер болон сервер дээр кэшлэхгүй байх тохиргоо
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const { id, category, classCode } = req.query;

  try {
    switch (req.method) {
      case "GET":
        // 1. ID-аар нэг хичээл авах
        if (id) {
          const topic = await Topics.findById(id);
          if (!topic) return res.status(404).json({ error: "Сэдэв олдсонгүй" });
          return res.status(200).json(topic);
        }

        // 2. Ангийн кодоор шүүж жагсаалт авах
        if (
          !classCode ||
          classCode === "undefined" ||
          classCode === "NO_CLASS"
        ) {
          return res.status(200).json([]);
        }

        const topics = await Topics.find({
          category: category || "physics",
          classCode: classCode,
        }).sort({ createdAt: -1 });

        return res.status(200).json(topics);

      case "POST":
        const {
          title,
          desc,
          classCode: bodyClassCode,
          config,
          category: bodyCategory,
        } = req.body;

        if (id) {
          // Засах үйлдэл
          const updatedTopic = await Topics.findByIdAndUpdate(
            id,
            { title, desc, config },
            { new: true, runValidators: true },
          );
          return res.status(200).json(updatedTopic);
        } else {
          // Шинээр нэмэх үйлдэл
          if (!bodyClassCode || bodyClassCode === "NO_CLASS") {
            return res.status(400).json({ error: "Ангийн код шаардлагатай" });
          }

          const newTopic = await Topics.create({
            title,
            desc,
            category: bodyCategory || "physics",
            classCode: bodyClassCode,
            config: config || {
              page: { title: title, subtitle: "Шинэ хичээл", videoUrl: "" },
              slider: [],
              experiments: [],
              theory: [],
            },
          });
          return res.status(201).json(newTopic);
        }

      case "DELETE":
        if (!id) return res.status(400).json({ error: "ID шаардлагатай" });
        await Topics.findByIdAndDelete(id);
        return res.status(200).json({ message: "Устгагдлаа" });

      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        return res
          .status(405)
          .json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Серверийн алдаа гарлаа" });
  }
}

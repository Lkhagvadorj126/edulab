import dbConnect from "@/lib/dbConnect";
import Topics from "@/models/Topics";

export default async function handler(req, res) {
  await dbConnect();
  const { id, category } = req.query;

  try {
    switch (req.method) {
      case "GET":
        if (id) {
          const topic = await Topics.findById(id);
          return topic
            ? res.status(200).json(topic)
            : res.status(404).json({ error: "Олдсонгүй" });
        }
        // Хэрэв category ирвэл шүүж авна, ирэхгүй бол бүгдийг харуулна
        const filter = category ? { category } : {};
        const topics = await Topics.find(filter).sort({ createdAt: -1 });
        return res.status(200).json(topics);

      case "POST":
        const { title, desc, config, category: bodyCategory } = req.body;

        if (id) {
          // Засах
          const updated = await Topics.findByIdAndUpdate(
            id,
            { title, desc, config },
            { new: true },
          );
          return res.status(200).json(updated);
        } else {
          // Шинээр нэмэх
          const newTopic = await Topics.create({
            title,
            desc,
            category: bodyCategory, // Frontend-ээс ирсэн "physics" утга
            config: config || {
              page: { title, subtitle: "Шинэ хичээл", videoUrl: "" },
              slider: [],
              experiments: [],
              theory: [],
            },
          });
          return res.status(201).json(newTopic);
        }

      case "DELETE":
        await Topics.findByIdAndDelete(id);
        return res.status(200).json({ message: "Устгагдлаа" });

      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

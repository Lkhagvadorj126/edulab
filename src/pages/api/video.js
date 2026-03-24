import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("physics_db");
  const collection = db.collection("settings");

  const { pageId } = req.query;

  try {
    if (req.method === "GET") {
      if (!pageId)
        return res.status(400).json({ error: "pageId шаардлагатай" });

      // АНХААРАХ ХЭСЭГ: Энд '_video' гэж хайна
      const data = await collection.findOne({ type: `${pageId}_video` });
      return res.status(200).json(data || { url: "" });
    }

    if (req.method === "POST") {
      const { url, pageId: postPageId } = req.body;
      const finalPageId = postPageId || pageId;

      await collection.updateOne(
        { type: `${finalPageId}_video` }, // Хадгалахдаа '_video'
        { $set: { url: url, updatedAt: new Date() } },
        { upsert: true },
      );
      return res.status(200).json({ message: "Video амжилттай", url });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

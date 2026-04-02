import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("physics_db");
  const collection = db.collection("settings");

  const { pageId, classCode } = req.query;

  try {
    if (req.method === "GET") {
      if (!pageId || !classCode)
        return res.status(400).json({ error: "Мэдээлэл дутуу" });

      const data = await collection.findOne({
        type: `${pageId}_presentation`,
        classCode: classCode,
      });
      return res.status(200).json(data || { url: "" });
    }

    if (req.method === "POST") {
      const { url, pageId: pId, classCode: cCode } = req.body;

      await collection.updateOne(
        { type: `${pId}_presentation`, classCode: cCode },
        { $set: { url: url, updatedAt: new Date() } },
        { upsert: true },
      );
      return res.status(200).json({ success: true, url });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

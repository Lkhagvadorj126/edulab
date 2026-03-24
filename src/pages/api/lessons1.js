import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("physics_db");
    const collection = db.collection("electricity_lessons"); // Цахилгааны цуглуулга

    if (req.method === "GET") {
      const data = await collection.find({}).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { title, content } = req.body;
      const result = await collection.insertOne({
        title,
        content: Array.isArray(content)
          ? content
          : content.split("\n").filter((c) => c.trim() !== ""),
        createdAt: new Date(),
      });
      return res.status(201).json(result);
    }

    if (req.method === "PUT") {
      const { id } = req.query;
      const { title, content } = req.body;
      await collection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title,
            content: Array.isArray(content)
              ? content
              : content.split("\n").filter((c) => c.trim() !== ""),
            updatedAt: new Date(),
          },
        },
      );
      return res.status(200).json({ success: true });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

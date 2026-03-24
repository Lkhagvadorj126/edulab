import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("physics_db");
  const collection = db.collection("quantum_theory");

  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const theories = await collection
          .find({})
          .sort({ createdAt: -1 })
          .toArray();
        res.status(200).json(theories);
      } catch (err) {
        res.status(500).json({ error: "Дата авахад алдаа гарлаа" });
      }
      break;

    case "POST":
      try {
        const { title, content } = req.body;
        const result = await collection.insertOne({
          title,
          content,
          createdAt: new Date(),
        });
        res.status(201).json({ _id: result.insertedId, title, content });
      } catch (err) {
        res.status(500).json({ error: "Нэмэхэд алдаа гарлаа" });
      }
      break;

    case "PUT":
      try {
        const { title, content } = req.body;
        await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { title, content, updatedAt: new Date() } },
        );
        res.status(200).json({ success: true });
      } catch (err) {
        res.status(500).json({ error: "Засахад алдаа гарлаа" });
      }
      break;

    case "DELETE":
      try {
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ success: true });
      } catch (err) {
        res.status(500).json({ error: "Устгахад алдаа гарлаа" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

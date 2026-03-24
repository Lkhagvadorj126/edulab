import dbConnect from "@/lib/dbConnect";
import { Experiment } from "@/models/Experiment";

export default async function handler(req, res) {
  await dbConnect();
  const { pageId, id } = req.query;

  try {
    if (req.method === "GET") {
      const filter = pageId ? { pageId } : {};
      const exps = await Experiment.find(filter).sort({ createdAt: -1 });
      return res.status(200).json(exps);
    }

    if (req.method === "POST") {
      const { title, href, img, pageId: bodyPageId } = req.body;
      if (!title || !href || !bodyPageId)
        return res.status(400).json({ error: "Мэдээлэл дутуу байна" });

      const newExp = await Experiment.create({
        title,
        href,
        img,
        pageId: bodyPageId,
      });
      return res.status(201).json(newExp);
    }

    if (req.method === "PUT") {
      const { id: bodyId, title, href, img } = req.body;
      const updatedExp = await Experiment.findByIdAndUpdate(
        bodyId || id,
        { title, href, img },
        { new: true },
      );
      return res.status(200).json(updatedExp);
    }

    if (req.method === "DELETE") {
      await Experiment.findByIdAndDelete(id);
      return res.status(200).json({ message: "Устгагдлаа" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

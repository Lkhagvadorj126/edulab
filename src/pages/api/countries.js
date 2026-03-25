import dbConnect from "@/lib/dbConnect";
import Country from "@/models/Country";

export default async function handler(req, res) {
  try {
    await dbConnect();
  } catch (err) {
    console.error("DB Connection Error:", err); // Энд яг ямар алдаа байгааг сервер дээр хэлнэ
    return res
      .status(500)
      .json({ error: "DB холболтын алдаа: " + err.message });
  }

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { pageId } = req.query;
        const filter = pageId ? { pageId } : {};
        const countries = await Country.find(filter).sort({ createdAt: -1 });
        return res.status(200).json(countries);
      } catch (error) {
        return res.status(500).json({ error: "Дата татахад алдаа гарлаа" });
      }

    case "POST":
      try {
        // req.json() биш шууд req.body ашиглана
        const newCountry = await Country.create(req.body);
        return res.status(201).json(newCountry);
      } catch (error) {
        console.error("POST Error:", error);
        return res.status(400).json({ error: "Хадгалахад алдаа гарлаа" });
      }

    case "PUT":
      try {
        const { id, ...updateData } = req.body;
        if (!id) return res.status(400).json({ error: "ID шаардлагатай" });

        const updatedCountry = await Country.findByIdAndUpdate(id, updateData, {
          new: true,
        });
        return res.status(200).json(updatedCountry);
      } catch (error) {
        return res.status(400).json({ error: "Засахад алдаа гарлаа" });
      }

    case "DELETE":
      try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: "ID шаардлагатай" });

        await Country.findByIdAndDelete(id);
        return res.status(200).json({ message: "Амжилттай устгагдлаа" });
      } catch (error) {
        return res.status(400).json({ error: "Устгахад алдаа гарлаа" });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

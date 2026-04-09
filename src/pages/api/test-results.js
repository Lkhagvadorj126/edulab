import dbConnect from "@/lib/dbConnect";
import Result from "@/models/Result";

// Хариулт өгөх форматыг нэг стандартад оруулах туслах функц
const sendResponse = (res, status, data) =>
  res.status(status).json({ success: status < 400, ...data });

export default async function handler(req, res) {
  try {
    await dbConnect();
  } catch (e) {
    return sendResponse(res, 500, { message: "DB холболт амжилтгүй" });
  }

  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      return sendResponse(res, 405, {
        message: `Method ${req.method} Not Allowed`,
      });
  }
}

// 1. Дүн татах (GET)
async function handleGet(req, res) {
  try {
    const { pageId, subject, classCode } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (pageId) filter.pageId = pageId;
    if (classCode) filter.classCode = classCode;

    const results = await Result.find(filter).sort({ createdAt: -1 }).lean();

    const average =
      results.length > 0
        ? Math.round(
            results.reduce((acc, c) => acc + (Number(c.percentage) || 0), 0) /
              results.length,
          )
        : 0;

    return sendResponse(res, 200, { average, count: results.length, results });
  } catch (error) {
    return sendResponse(res, 500, { error: error.message });
  }
}

// 2. Дүн хадгалах (POST)
async function handlePost(req, res) {
  try {
    const { userName, pageId, subject, classCode } = req.body;

    const existingResult = await Result.findOne({
      userName,
      pageId: String(pageId),
      subject: String(subject),
      classCode: classCode || "",
    });

    if (existingResult) {
      return sendResponse(res, 200, {
        message: "Өмнө нь оролдлого бүртгэгдсэн байна.",
      });
    }

    const newResult = await Result.create({
      ...req.body,
      createdAt: new Date(),
    });
    return sendResponse(res, 201, {
      data: newResult,
      message: "Амжилттай хадгалагдлаа",
    });
  } catch (error) {
    return sendResponse(res, 500, { error: error.message });
  }
}

// 3. Дүн устгах (DELETE)
async function handleDelete(req, res) {
  try {
    const { userName, pageId, subject, classCode } = req.query;
    await Result.findOneAndDelete({
      userName: String(userName),
      pageId: String(pageId),
      subject: String(subject),
      classCode: String(classCode || ""),
    });
    return sendResponse(res, 200, { message: "Устгагдлаа" });
  } catch (error) {
    return sendResponse(res, 500, { error: error.message });
  }
}

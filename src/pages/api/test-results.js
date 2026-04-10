import dbConnect from "@/lib/dbConnect";
import Result from "@/models/Result";

const sendResponse = (res, status, data) =>
  res.status(status).json({ success: status < 400, ...data });

export default async function handler(req, res) {
  try {
    await dbConnect();
  } catch (e) {
    return sendResponse(res, 500, { message: "DB холболт амжилтгүй" });
  }

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { pageId, subject, classCode } = req.query;
        const filter = {};
        if (subject) filter.subject = subject;
        if (pageId) filter.pageId = pageId;
        if (classCode) filter.classCode = classCode;

        const results = await Result.find(filter)
          .sort({ createdAt: -1 })
          .lean();

        const average =
          results.length > 0
            ? Math.round(
                results.reduce(
                  (acc, c) => acc + (Number(c.percentage) || 0),
                  0,
                ) / results.length,
              )
            : 0;

        return sendResponse(res, 200, {
          average,
          count: results.length,
          results,
        });
      } catch (error) {
        return sendResponse(res, 500, { error: error.message });
      }

    case "POST":
      try {
        const { userName, pageId, subject, classCode } = req.body;

        // Давхардал шалгах (Нэг сурагч нэг хичээлээр нэг л дүн авна)
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
    case "DELETE":
      try {
        const { userName, pageId, subject, classCode } = req.query;

        // Өгөгдөл бааз дээрхтэй таарч байгааг шалгахын тулд console дээр хэвлэж үзэх (Debug)
        console.log("Устгах хүсэлт:", { userName, pageId, subject, classCode });

        const deletedResult = await Result.findOneAndDelete({
          // Нэр болон бусад талбаруудын хоосон зайг арилгаж хайх
          userName: userName?.trim(),
          pageId: String(pageId).trim(),
          subject: String(subject).trim(),
          // classCode байхгүй бол хоосон стринг эсвэл null-аар хайх
          classCode: classCode ? String(classCode).trim() : "",
        });

        if (!deletedResult) {
          // Хэрэв олдохгүй бол арай бага шүүлтүүрээр хайгаад үзэх (Зөвхөн нэр ба сэдвээр)
          const fallbackDelete = await Result.findOneAndDelete({
            userName: userName?.trim(),
            pageId: String(pageId).trim(),
          });

          if (!fallbackDelete) {
            return sendResponse(res, 404, {
              message: "Устгах өгөгдөл олдсонгүй",
            });
          }
        }

        return sendResponse(res, 200, { message: "Амжилттай устгагдлаа" });
      } catch (error) {
        return sendResponse(res, 500, { error: error.message });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      return sendResponse(res, 405, {
        message: `Method ${method} Not Allowed`,
      });
  }
}

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LessonTemplateP from "@/components/LessonTemplateP";
import { Loader2 } from "lucide-react";

export default function DynamicLessonPage() {
  const router = useRouter();
  const { id } = router.query;
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchLesson = async () => {
      try {
        // Энд мөн адил /api/physics-topics гэж дуудна
        const res = await fetch(`/api/physics-topics?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setLessonData(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id]);

  if (loading || !id)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#312C85]" size={48} />
      </div>
    );

  const finalConfig = lessonData?.config || {
    page: {
      title: lessonData?.title || "Хичээл",
      subtitle: "Цахим хичээл",
      videoUrl: "",
    },
    slider: [],
    experiments: [],
    theory: [],
  };

  return (
    <div className="min-h-screen bg-white">
      <LessonTemplateP pageId={id} config={finalConfig} />
    </div>
  );
}

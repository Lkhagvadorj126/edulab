"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LessonTemplateP from "@/components/LessonTemplateP";
import { Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function DynamicLessonPage() {
  const router = useRouter();
  const { id } = router.query;
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchLesson = async () => {
      try {
        const res = await fetch(`/api/physics-topics?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setLessonData(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id]);

  // Ангиллаас хамаарч буцах замыг шийдэх
  const getBackPath = () => {
    if (!lessonData) return "/dashboard";

    // Ангиллыг шалгах
    const category = lessonData.category?.toLowerCase();

    switch (category) {
      case "physics":
        return "/indexP";
      case "chemistry":
        return "/indexH"; // Хими бол indexH руу буцна
      case "biology":
        return "/biology";
      case "geography":
        return "/indexGeo";
      default:
        return "/dashboard";
    }
  };

  if (loading || !id)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#312C85]" size={48} />
      </div>
    );

  return (
    <div className="min-h-screen bg-white relative">
      <LessonTemplateP
        pageId={id}
        config={lessonData?.config || { page: { title: lessonData?.title } }}
        backUrl={getBackPath()} // Энэ утга Template доторх буцах товчинд очих ёстой
        categoryName={lessonData?.category}
      />
    </div>
  );
}

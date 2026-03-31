import { useRouter } from "next/router";
import { LESSONS_CONFIG } from "@/constants/lessonsData";
import LessonTemplate from "@/components/LessonTemplate";
import Head from "next/head";

export default function ChemistryDynamicPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady || !id)
    return <div className="min-h-screen bg-[#F8FAFC]" />;

  const config = LESSONS_CONFIG[id];

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#312C85]">404</h1>
          <p className="text-slate-500 font-bold uppercase mt-2">
            Химийн хичээл олдсонгүй
          </p>
          <button
            onClick={() => router.push("/indexH")}
            className="mt-4 bg-[#312C85] text-white px-6 py-2 rounded-xl font-bold"
          >
            Буцах
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{config.page.title} | Хими</title>
      </Head>
      {/* LessonTemplate-д config болон pageId-г дамжуулна */}
      <LessonTemplate pageId={id} config={config} />
    </>
  );
}

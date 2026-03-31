import { useRouter } from "next/router";
import { PHYSICS_CONFIG } from "@/constants/lessonDataP";
import LessonTemplateP from "@/components/LessonTemplateP";
import Head from "next/head";

export default function PhysicsDynamicPage() {
  const router = useRouter();
  const { id } = router.query; // Энд id гэж авна

  if (!router.isReady || !id)
    return <div className="min-h-screen bg-[#F8FAFC]" />;

  const config = PHYSICS_CONFIG[id];

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#312C85]">404</h1>
          <p className="text-slate-500 font-bold uppercase">
            Физикийн хичээл олдсонгүй
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-[#312C85] text-white px-6 py-2 rounded-xl"
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
        <title>{config.page.title} | Физик</title>
      </Head>
      <LessonTemplateP pageId={id} config={config} />
    </>
  );
}

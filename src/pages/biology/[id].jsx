import { useRouter } from "next/router";
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";
import LessonTemplateB from "@/components/LessonsTemplateBio";
import Head from "next/head";

export default function BiologyDynamicPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady || !id)
    return <div className="min-h-screen bg-[#F8FAFC]" />;

  const config = BIOLOGY_CONFIG[id];

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#10B981]">404</h1>
          <p className="text-slate-500 font-bold uppercase">
            Биологийн хичээл олдсонгүй
          </p>
          <button
            onClick={() => router.push("/biology")}
            className="mt-4 bg-[#10B981] text-white px-6 py-2 rounded-xl"
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
        <title>{config.page.title} | Биологи</title>
      </Head>
      <LessonTemplateB pageId={id} config={config} />
    </>
  );
}

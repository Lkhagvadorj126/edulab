import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Link from "next/link";
import { ChevronLeft, RotateCcw, CheckCircle2, X } from "lucide-react";
import NavAll from "@/components/NavAll";

const BioMatch = () => {
  const topics = useMemo(
    () => [
      {
        title: "Эсийн бүтэц ба Хэмжээ",
        questions: [
          {
            id: "c1",
            text: "Удамшлын мэдээллийг хадгалж, эсийн үйл ажиллагааг удирдах",
            matchId: "nucleus",
            name: "Бөөм",
          },
          {
            id: "c2",
            text: "Шим тэжээлийг задалж эрчим хүч (АТФ) үйлдвэрлэх",
            matchId: "mitochondria",
            name: "Митохондри",
          },
          {
            id: "c3",
            text: "Уураг нийлэгжүүлэх үүрэгтэй жижиг эрхтэнцэр",
            matchId: "ribosome",
            name: "Рибосом",
          },
          {
            id: "c4",
            text: "Ургамлын эсэд фотосинтез явуулж глюкоз үүсгэх",
            matchId: "chloroplast",
            name: "Хлоропласт",
          },
          {
            id: "c5",
            text: "Эсийн дотоод тээвэрлэлт болон бодис боловсруулах",
            matchId: "endoplasmic",
            name: "Эндоплазмын тор",
          },
        ],
      },
      {
        title: "Хүний хооллолт ба Шим тэжээл",
        questions: [
          {
            id: "f1",
            text: "Нүүрс усны задрал эхэлж, хоол боловсруулах эхний шат",
            matchId: "mouth",
            name: "Амны хөндий",
          },
          {
            id: "f2",
            text: "Уураг задалдаг хүчтэй хүчил бүхий булчинлаг эрхтэн",
            matchId: "stomach",
            name: "Ходоод",
          },
          {
            id: "f3",
            text: "Шим тэжээлийн бодисууд цусанд шимэгдэх үндсэн хэсэг",
            matchId: "small_intestine",
            name: "Нарийн гэдэс",
          },
          {
            id: "f4",
            text: "Цөс боловсруулж, цусан дахь хорт бодисыг шүүх",
            matchId: "liver",
            name: "Элэг",
          },
          {
            id: "f5",
            text: "Усыг эргүүлэн шимж, өтгөн ялгадас үүсгэх",
            matchId: "large_intestine",
            name: "Бүдүүн гэдэс",
          },
        ],
      },
      {
        title: "Амьсгал ба Зөөвөрлөлт",
        questions: [
          {
            id: "r1",
            text: "Цусыг бүх биеэр тасралтгүй шахах үүрэгтэй булчин",
            matchId: "heart",
            name: "Зүрх",
          },
          {
            id: "r2",
            text: "Хийн солилцоо явуулж хүчилтөрөгчөөр хангах",
            matchId: "lungs",
            name: "Уушги",
          },
          {
            id: "r3",
            text: "Хүчилтөрөгчийг зөөвөрлөгч цусны улаан эс",
            matchId: "rbc",
            name: "Эритроцит",
          },
          {
            id: "r4",
            text: "Зүрхнээс гарч буй хүчилтөрөгчөөр баялаг цусны судас",
            matchId: "artery",
            name: "Артерийн судас",
          },
          {
            id: "r5",
            text: "Эд эс болон цусны хооронд бодисын солилцоо явуулах судас",
            matchId: "capillary",
            name: "Хялгасан судас",
          },
        ],
      },
      {
        title: "Амьтны аймгийн ангилал зүй",
        questions: [
          {
            id: "a1",
            text: "Үр төлөө сүүгээрээ тэжээдэг, тогтмол халуун цустай",
            matchId: "mammals",
            name: "Хөхтөн",
          },
          {
            id: "a2",
            text: "Өдөөр бүрхэгдсэн, өндөг төрүүлдэг, хөндий ястай",
            matchId: "birds",
            name: "Шувуу",
          },
          {
            id: "a3",
            text: "Хайрстай, хуурай газар өндөглөдөг, хүйтэн цустай",
            matchId: "reptiles",
            name: "Мөлхөгчид",
          },
          {
            id: "a4",
            text: "Усанд болон хуурай газар амьдрах чадвартай",
            matchId: "amphibians",
            name: "Хоёр нутагтан",
          },
          {
            id: "a5",
            text: "Нурууны ясгүй, хатуу гадаргуутай амьтдын бүлэг",
            matchId: "invertebrates",
            name: "Нуруугүйтэн",
          },
        ],
      },
      {
        title: "Ургамлын ангилал зүй",
        questions: [
          {
            id: "p1",
            text: "Үр нь жимс дотор хамгаалагдсан, цэцэгт ургамал",
            matchId: "angiosperms",
            name: "Далд үртэн",
          },
          {
            id: "p2",
            text: "Үр нь боргоцой дээр нүцгэн байрладаг",
            matchId: "gymnosperms",
            name: "Нүцгэн үртэн",
          },
          {
            id: "p3",
            text: "Дамжуулах багцгүй, чийглэг газар ургадаг намхан ургамал",
            matchId: "moss",
            name: "Хөвд",
          },
          {
            id: "p4",
            text: "Спортоор үрждэг, өдлөг навчтай ургамал",
            matchId: "fern",
            name: "Ойм",
          },
          {
            id: "p5",
            text: "Навч нь зүү хэлбэртэй, жилийн турш ногооноороо байдаг",
            matchId: "conifer",
            name: "Шилмүүст",
          },
        ],
      },
      {
        title: "Зохицуулга ба Хяналт",
        questions: [
          {
            id: "n1",
            text: "Мэдрэлийн тогтолцооны төв удирдлагын эрхтэн",
            matchId: "brain",
            name: "Тархи",
          },
          {
            id: "n2",
            text: "Мэдрэлийн дохио дамжуулах тусгай бүтэцтэй эс",
            matchId: "neuron",
            name: "Нейрон",
          },
          {
            id: "n3",
            text: "Биеийн тэнцвэр болон хөдөлгөөнийг зохицуулах хэсэг",
            matchId: "cerebellum",
            name: "Бага тархи",
          },
          {
            id: "n4",
            text: "Гадаад орчны цочролыг хүлээн авч мэдээлэх",
            matchId: "receptor",
            name: "Хүлээн авуур",
          },
          {
            id: "n5",
            text: "Цусан дахь сахарыг зохицуулагч инсулин ялгаруулах",
            matchId: "pancreas",
            name: "Нойр булчирхай",
          },
        ],
      },
    ],
    [],
  );

  const [currentTopicIdx, setCurrentTopicIdx] = useState(0);
  const currentQuestions = topics[currentTopicIdx].questions;

  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selection, setSelection] = useState(null);
  const [connections, setConnections] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const containerRef = useRef(null);
  const leftRefs = useRef({});
  const rightRefs = useRef({});

  const shuffleData = useCallback(() => {
    const answers = currentQuestions.map((q) => ({
      id: q.matchId,
      name: q.name,
    }));
    setShuffledAnswers([...answers].sort(() => Math.random() - 0.5));
    setConnections([]);
    setIsChecked(false);
    setSelection(null);
  }, [currentQuestions]);

  useEffect(() => {
    shuffleData();
  }, [shuffleData]);

  const updateLineCoords = useCallback(() => {
    if (!containerRef.current || window.innerWidth < 768) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    setConnections((prev) =>
      prev.map((conn) => {
        const leftEl = leftRefs.current[conn.fromId];
        const rightEl = rightRefs.current[conn.toId];
        if (leftEl && rightEl) {
          const lRect = leftEl.getBoundingClientRect();
          const rRect = rightEl.getBoundingClientRect();
          return {
            ...conn,
            fromPos: {
              x: lRect.left - containerRect.left + lRect.width / 2,
              y: lRect.top - containerRect.top + lRect.height / 2,
            },
            toPos: {
              x: rRect.left - containerRect.left + rRect.width / 2,
              y: rRect.top - containerRect.top + rRect.height / 2,
            },
          };
        }
        return conn;
      }),
    );
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateLineCoords);
    return () => window.removeEventListener("resize", updateLineCoords);
  }, [updateLineCoords]);

  const handleLeftClick = (e, id) => {
    if (isChecked) return;
    setSelection({ id, el: e.currentTarget });
  };

  const handleRightClick = (e, matchId) => {
    if (selection && !isChecked) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const lRect = selection.el.getBoundingClientRect();
      const rRect = e.currentTarget.getBoundingClientRect();

      const newConnection = {
        fromId: selection.id,
        toId: matchId,
        fromPos: {
          x: lRect.left - containerRect.left + lRect.width / 2,
          y: lRect.top - containerRect.top + lRect.height / 2,
        },
        toPos: {
          x: rRect.left - containerRect.left + rRect.width / 2,
          y: rRect.top - containerRect.top + rRect.height / 2,
        },
      };

      const filtered = connections.filter(
        (c) => c.fromId !== selection.id && c.toId !== matchId,
      );
      setConnections([...filtered, newConnection]);
      setSelection(null);
    }
  };

  const removeConnection = (fromId) => {
    if (isChecked) return;
    setConnections(connections.filter((c) => c.fromId !== fromId));
  };

  return (
    <div className="pt-16 md:pt-24 p-4 max-w-6xl mx-auto min-h-screen font-sans bg-[#F8FAFC]">
      <NavAll />
      <div
        className="bg-white p-5 md:p-10 rounded-[30px] md:rounded-[40px] shadow-2xl relative overflow-hidden border border-slate-100"
        ref={containerRef}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-16 gap-4 relative z-20">
          <div className="flex items-center gap-4">
            <Link
              href="/biology"
              className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#312C85] transition-all"
            >
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl md:text-3xl font-black text-slate-800">
                Биологийн сорил
              </h1>
            </div>
          </div>
          <div className="w-full md:w-80">
            <select
              className="w-full p-3 md:p-4 border-2 border-slate-100 rounded-2xl bg-slate-50/50 text-slate-700 font-bold outline-none focus:border-[#312C85] transition-all text-sm md:text-base"
              value={currentTopicIdx}
              onChange={(e) => {
                setCurrentTopicIdx(Number(e.target.value));
                setConnections([]);
              }}
            >
              {topics.map((topic, i) => (
                <option key={i} value={i}>
                  {topic.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 relative z-10">
          {/* Questions Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
              Тодорхойлолт
            </h3>
            {currentQuestions.map((q) => {
              const connection = connections.find((c) => c.fromId === q.id);
              const linkedAnswer = shuffledAnswers.find(
                (a) => a.id === connection?.toId,
              );
              const isSelected = selection?.id === q.id;
              const isCorrect =
                isChecked && connection && q.matchId === connection.toId;

              return (
                <div key={q.id} className="flex flex-col gap-2">
                  <button
                    ref={(el) => (leftRefs.current[q.id] = el)}
                    onClick={(e) => handleLeftClick(e, q.id)}
                    className={`p-4 md:p-6 text-left text-sm md:text-[15px] leading-relaxed rounded-2xl md:rounded-3xl border-2 transition-all duration-300
                      ${isSelected ? "border-[#312C85] bg-indigo-50 ring-4 ring-indigo-50" : "border-slate-50 bg-white shadow-sm"}
                      ${isChecked && connection ? (isCorrect ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50") : ""}
                    `}
                  >
                    <span
                      className={`font-bold block ${isSelected ? "text-[#312C85]" : "text-slate-600"}`}
                    >
                      {q.text}
                    </span>
                  </button>

                  {/* Mobile-Only: Linked Answer Card */}
                  {connection && (
                    <div className="md:hidden flex animate-in slide-in-from-top-2 duration-300">
                      <div
                        className={`flex-1 flex items-center justify-between p-3 ml-6 rounded-xl border-2 bg-indigo-50/50 border-indigo-100
                        ${isChecked ? (isCorrect ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-red-50 border-red-200 text-red-700") : "text-[#312C85]"}
                      `}
                      >
                        <span className="font-black text-sm">
                          {linkedAnswer?.name}
                        </span>
                        {!isChecked && (
                          <button
                            onClick={() => removeConnection(q.id)}
                            className="p-1 hover:bg-white rounded-full transition-colors"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Answers Column (Hidden on mobile when all linked? No, let's keep for selection) */}
          <div className="flex flex-col gap-3 md:gap-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 text-right">
              Нэр томьёо
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
              {shuffledAnswers.map((ans) => {
                const isLinked = connections.some((c) => c.toId === ans.id);
                return (
                  <div
                    key={ans.id}
                    ref={(el) => (rightRefs.current[ans.id] = el)}
                    onClick={(e) => handleRightClick(e, ans.id)}
                    className={`h-14 md:h-[84px] w-full border-2 rounded-2xl md:rounded-3xl flex items-center justify-center cursor-pointer transition-all duration-300 font-black text-xs md:text-lg tracking-tight px-2 text-center
                      ${isLinked ? "opacity-30 bg-slate-100 border-transparent scale-95" : "border-slate-100 bg-slate-50/50 text-slate-500 hover:border-indigo-300 hover:bg-white"}
                      ${isChecked ? "cursor-default pointer-events-none" : ""}
                    `}
                  >
                    {ans.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop SVG - Hidden on Mobile */}
        <svg className="absolute inset-0 pointer-events-none w-full h-full z-0 overflow-visible hidden md:block">
          {connections.map((conn, index) => {
            const question = currentQuestions.find((q) => q.id === conn.fromId);
            const isCorrect = isChecked && question?.matchId === conn.toId;
            let strokeColor = isChecked
              ? isCorrect
                ? "#10B981"
                : "#F43F5E"
              : "#6366F1";
            return (
              <line
                key={index}
                x1={conn.fromPos.x}
                y1={conn.fromPos.y}
                x2={conn.toPos.x}
                y2={conn.toPos.y}
                stroke={strokeColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={isChecked && !isCorrect ? "8, 6" : "0"}
                className="transition-all duration-500 opacity-40"
              />
            );
          })}
        </svg>

        {/* Footer */}
        <div className="mt-12 flex flex-col items-center border-t border-slate-100 pt-8">
          {!isChecked ? (
            <button
              onClick={() => setIsChecked(true)}
              disabled={connections.length < currentQuestions.length}
              className={`w-full md:w-auto flex items-center justify-center gap-3 px-12 py-4 rounded-2xl font-black text-lg transition-all
                ${connections.length < currentQuestions.length ? "bg-slate-100 text-slate-300 cursor-not-allowed" : "bg-[#312C85] text-white shadow-xl"}`}
            >
              <CheckCircle2 size={24} /> Хариуг шалгах
            </button>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100 w-full md:w-auto">
              <div className="px-10 py-3 rounded-xl font-black text-2xl text-indigo-600 bg-white shadow-sm">
                {
                  connections.filter(
                    (c) =>
                      currentQuestions.find((q) => q.id === c.fromId)
                        ?.matchId === c.toId,
                  ).length
                }{" "}
                / {currentQuestions.length}
              </div>
              <button
                onClick={shuffleData}
                className="flex items-center gap-2 pr-6 font-black text-slate-500 hover:text-[#312C85]"
              >
                <RotateCcw size={20} /> Дахин
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BioMatch;

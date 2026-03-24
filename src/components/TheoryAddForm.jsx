import { Plus } from "lucide-react";

export default function TheoryAddForm({
  newCard,
  setNewCard,
  handleAdd,
  loading,
}) {
  return (
    <div className="mb-12 p-8 bg-[#312C85]/5 rounded-3xl border-2 border-dashed border-[#312C85]/20 flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input
          className="w-full p-4 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-[#312C85]/20 bg-white font-bold text-slate-700 transition-all"
          placeholder="Сэдвийн гарчиг..."
          value={newCard.title}
          onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
        />
        <textarea
          className="w-full p-4 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-[#312C85]/20 bg-white min-h-[60px] font-medium text-slate-600 transition-all"
          placeholder="Агуулга (Шинэ мөрөөр салгаж бичнэ үү)..."
          value={newCard.content}
          onChange={(e) => setNewCard({ ...newCard, content: e.target.value })}
        />
      </div>
      <button
        onClick={handleAdd}
        disabled={loading}
        className="bg-[#312C85] text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#312C85]/90 transition-all active:scale-[0.98] shadow-lg shadow-[#312C85]/20 disabled:bg-slate-400"
      >
        <Plus size={18} strokeWidth={3} />
        {loading ? "Нэмж байна..." : "Шинэ онол нэмэх"}
      </button>
    </div>
  );
}

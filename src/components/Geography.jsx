"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Search,
  Globe2,
  MapPin,
  Users,
  Maximize2,
  Coins,
  Languages,
  X,
  Plus,
  Edit2,
  Trash2,
  Save,
  Loader2,
  Flag,
} from "lucide-react";
import NavAll from "./NavAll";
import { useAuth } from "@/context/AuthContext";

const PAGE_ID = "geography_main";
// Тивүүдийн жагсаалт
const REGIONS = [
  "Бүгд",
  "Ази",
  "Европ",
  "Хойд Америк",
  "Өмнөд Америк",
  "Африк",
  "Австрали",
];

export default function Geography() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("Бүгд"); // Анхны утга "Бүгд"
  const [searchText, setSearchText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    code: "",
    flag: "🏳️",
    name: "",
    capital: "",
    region: "Ази",
    subregion: "",
    population: "",
    area: "",
    currency: "",
    languages: "",
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/countries?pageId=${PAGE_ID}`);
      if (res.ok) {
        const data = await res.json();
        setCountries(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!formData.name || !formData.code)
      return alert("Нэр болон кодыг бөглөнө үү!");
    setLoading(true);
    try {
      const res = await fetch("/api/countries", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, pageId: PAGE_ID, id: editingId }),
      });

      if (res.ok) {
        alert("Амжилттай хадгалагдлаа!");
        setFormData(initialForm);
        setEditingId(null);
        setShowForm(false);
        fetchData();
      } else {
        const data = await res.json();
        alert("Серверээс ирсэн алдаа: " + data.error);
      }
    } catch (error) {
      alert("Сервертэй холбогдож чадсангүй.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Устгахдаа итгэлтэй байна уу?")) return;
    const res = await fetch(`/api/countries?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  };

  // ЛОГИК: ТИВ болон ХАЙЛТ-аар шүүх
  const filtered = countries.filter((c) => {
    const matchesRegion =
      selectedRegion === "Бүгд" || c.region === selectedRegion;
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-4 md:px-8">
      <NavAll />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div className="flex items-center gap-5">
            <Link
              href="/dashboard"
              className="p-4 bg-white rounded-2xl  shadow-sm text-[#312C85] hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft />
            </Link>
            <div>
              <h2 className="text-sm font-black text-[#312C85] uppercase tracking-[0.3em] mb-1">
                Сургалтын хөтөлбөр
              </h2>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Газарзүй (Улс)
              </h1>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full md:w-80 pl-12 pr-4 py-4 rounded-2xl border-2 border-white outline-none focus:border-indigo-100 bg-white shadow-sm"
                placeholder="Улсын нэрээр хайх..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            {isTeacher && (
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingId(null);
                  setFormData(initialForm);
                }}
                className="p-4 bg-[#312C85] text-white rounded-2xl shadow-lg hover:bg-indigo-900 transition-all"
              >
                {showForm ? <X /> : <Plus />}
              </button>
            )}
          </div>
        </div>

        {/* ТИВЭЭР ШҮҮХ ХЭСЭГ (Region Filter) */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap shadow-sm border-2 ${
                selectedRegion === region
                  ? "bg-[#312C85] text-white border-[#312C85]"
                  : "bg-white text-slate-500 border-white hover:border-slate-200"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Admin Form - Өргөтгөсөн хувилбар */}
        {isTeacher && showForm && (
          <div className="mb-10 p-8 bg-white rounded-[30px] border-2 border-dashed border-indigo-200 animate-fadeIn shadow-xl shadow-indigo-100/50">
            <h3 className="text-[#312C85] font-black uppercase text-sm tracking-widest mb-6 flex items-center gap-2">
              <Flag size={18} /> Улсын мэдээлэл оруулах
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                className="p-3 border rounded-xl outline-none focus:ring-2 ring-indigo-100"
                placeholder="Улсын нэр (Монгол)..."
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                className="p-3 border rounded-xl outline-none focus:ring-2 ring-indigo-100"
                placeholder="Код (MN)..."
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
              />
              <input
                className="p-3 border rounded-xl outline-none focus:ring-2 ring-indigo-100"
                placeholder="Туг (🇲🇳)..."
                value={formData.flag}
                onChange={(e) =>
                  setFormData({ ...formData, flag: e.target.value })
                }
              />
              <input
                className="p-3 border rounded-xl outline-none focus:ring-2 ring-indigo-100"
                placeholder="Нийслэл..."
                value={formData.capital}
                onChange={(e) =>
                  setFormData({ ...formData, capital: e.target.value })
                }
              />

              <select
                className="p-3 border rounded-xl outline-none focus:ring-2 ring-indigo-100 bg-white"
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
              >
                {REGIONS.filter((r) => r !== "Бүгд").map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <input
                className="p-3 border rounded-xl outline-none focus:ring-2 ring-indigo-100"
                placeholder="Дэд бүс (Зүүн Ази)..."
                value={formData.subregion}
                onChange={(e) =>
                  setFormData({ ...formData, subregion: e.target.value })
                }
              />
              <input
                className="p-3 border rounded-xl outline-none focus:ring-2 ring-indigo-100"
                placeholder="Хүн ам..."
                value={formData.population}
                onChange={(e) =>
                  setFormData({ ...formData, population: e.target.value })
                }
              />
              <input
                className="p-3 border rounded-xl outline-none focus:ring-2 ring-indigo-100"
                placeholder="Талбай..."
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
              />
              <input
                className="p-3 border rounded-xl outline-none focus:ring-2 ring-indigo-100"
                placeholder="Валют (MNT)..."
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
              />
              <input
                className="p-3 border rounded-xl outline-none focus:ring-2 ring-indigo-100"
                placeholder="Хэл (Монгол хэл)..."
                value={formData.languages}
                onChange={(e) =>
                  setFormData({ ...formData, languages: e.target.value })
                }
              />

              <div className="md:col-span-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full h-full bg-[#312C85] text-white rounded-xl font-bold flex justify-center items-center gap-2 py-3 hover:bg-indigo-900 transition-all"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}{" "}
                  Мэдээллийг хадгалах
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Шүүгдсэн үр дүн хоосон байвал харуулах */}
        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border border-slate-100">
            <Globe2 className="mx-auto text-slate-200 mb-4" size={64} />
            <p className="text-slate-400 font-bold italic text-lg">
              Уучлаарай, мэдээлэл олдсонгүй.
            </p>
          </div>
        )}

        {/* Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((c) => (
            <div
              key={c._id}
              className="bg-white p-6 rounded-[35px] shadow-sm border border-slate-50 relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {isTeacher && (
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => {
                      setEditingId(c._id);
                      setFormData(c);
                      setShowForm(true);
                    }}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              )}
              <div className="flex flex-col items-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                  {c.flag}
                </div>
                <h3 className="text-lg font-black text-slate-800 text-center line-clamp-1">
                  {c.name}
                </h3>
                <p className="text-slate-400 text-[10px] mb-6 uppercase font-black tracking-[0.2em]">
                  {c.capital}
                </p>
                <button
                  onClick={() => {
                    setSelected(c);
                    setIsOpen(true);
                  }}
                  className="w-full py-2.5 bg-slate-50 text-[#312C85] rounded-xl font-black text-xs hover:bg-[#312C85] hover:text-white transition-all"
                >
                  МЭДЭЭЛЭЛ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - Бүх шинэ талбаруудыг харуулна */}
      {isOpen && selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white max-w-lg w-full rounded-[40px] p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-red-500 transition-colors p-2"
            >
              <X />
            </button>
            <div className="flex flex-col items-center">
              <div className="text-9xl mb-4 drop-shadow-lg">
                {selected.flag}
              </div>
              <h2 className="text-3xl font-black mb-1 text-slate-800">
                {selected.name}
              </h2>
              <p className="text-[#312C85] font-black mb-8 uppercase tracking-[0.3em] text-[10px] bg-indigo-50 px-4 py-1.5 rounded-full">
                {selected.subregion || selected.region}
              </p>

              <div className="w-full space-y-2">
                <DetailRow
                  icon={<MapPin size={16} />}
                  label="Нийслэл"
                  value={selected.capital}
                />
                <DetailRow
                  icon={<Users size={16} />}
                  label="Хүн ам"
                  value={selected.population}
                />
                <DetailRow
                  icon={<Maximize2 size={16} />}
                  label="Талбай"
                  value={selected.area}
                />
                <DetailRow
                  icon={<Coins size={16} />}
                  label="Валют"
                  value={selected.currency}
                />
                <DetailRow
                  icon={<Languages size={16} />}
                  label="Хэл"
                  value={selected.languages}
                />
                <DetailRow
                  icon={<Globe2 size={16} />}
                  label="Бүс нутаг"
                  value={selected.region}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-indigo-100 transition-all">
      <div className="flex gap-2.5 text-slate-400 font-black uppercase text-[9px] tracking-widest items-center">
        <span className="text-[#312C85]">{icon}</span> {label}
      </div>
      <span className="font-bold text-slate-700 text-xs">{value || "---"}</span>
    </div>
  );
}

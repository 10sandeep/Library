"use client";
import { useState } from "react";
import { Search, Grid3X3, List, BookOpen, ArrowRight } from "lucide-react";
import { RESOURCES } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CATEGORIES = ["All", "Books", "eBooks", "Journals", "Research Papers", "Thesis", "Govt Publications", "Reports", "Magazines"];
const TOP_BORDERS = ["#3aa04a","#fea500","#00d8ff","#8224e3","#1a6ebb","#e53935","#3aa04a","#fea500","#00d8ff","#8224e3","#1a6ebb","#e53935"];

export default function ResourcesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = RESOURCES.filter((r) =>
    (category === "All" || r.title.toLowerCase().includes(category.toLowerCase())) &&
    (query === "" || r.title.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <main className="min-h-screen" style={{ background: "#ededed" }}>
      {/* Page header */}
      <div style={{ background: "#730068", paddingTop: 48, paddingBottom: 48 }}>
        <div className="w-full lg:max-w-[1320px] xl:max-w-[1440px]" style={{ margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
          <div className="text-white/50 text-xs flex items-center gap-2" style={{ marginBottom: 8 }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Digital Resources</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white" style={{ marginBottom: 8 }}>Digital Resources</h1>
          <p className="text-white/60 text-sm max-w-xl">
            Explore our complete collection of books, journals, research papers, thesis, and more across all academic disciplines.
          </p>
        </div>
      </div>

      <div className="w-full lg:max-w-[1320px] xl:max-w-[1440px]" style={{ margin: "0 auto", paddingLeft: 24, paddingRight: 24, paddingTop: 32, paddingBottom: 32 }}>
        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center justify-between" style={{ marginBottom: 20 }}>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "text-xs font-semibold border-2 transition-all",
                  category === cat
                    ? "text-white border-[#ff9f08]"
                    : "border-[#ccc] text-[#555] hover:border-[#ff9f08] bg-white"
                )}
                style={{ padding: "4px 12px", ...(category === cat ? { background: "#ff9f08" } : {}) }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter resources..."
                className="bg-white border border-[#d6d6d6] text-sm text-[#333] placeholder-[#ccc] focus:outline-none focus:border-[#ff9f08] w-48 transition-colors"
                style={{ paddingLeft: 36, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}
              />
            </div>
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className="w-9 h-9 border flex items-center justify-center transition-all"
              style={view === "grid" ? { background: "#ff9f08", borderColor: "#ff9f08", color: "#fff" } : { borderColor: "#ccc", color: "#888", background: "#fff" }}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              aria-label="List view"
              className="w-9 h-9 border flex items-center justify-center transition-all"
              style={view === "list" ? { background: "#ff9f08", borderColor: "#ff9f08", color: "#fff" } : { borderColor: "#ccc", color: "#888", background: "#fff" }}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-xs text-[#888]" style={{ marginBottom: 20 }}>{filtered.length} collections found</p>

        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((res, i) => {
              const color = TOP_BORDERS[i % TOP_BORDERS.length];
              return (
                <div
                  key={res.id}
                  className="bg-[#f5f5f5] border border-[#d6d6d6] flex flex-col hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-200"
                  style={{ borderTop: `10px solid ${color}` }}
                >
                  <div className="h-20 flex items-center justify-center" style={{ background: `${color}12` }}>
                    <BookOpen className="w-8 h-8" style={{ color: `${color}80` }} />
                  </div>
                  <div className="flex-1" style={{ padding: 16 }}>
                    <h2 className="font-bold text-sm text-[#333]" style={{ marginBottom: 4 }}>{res.title}</h2>
                    <p className="text-xs text-[#777] line-clamp-2" style={{ marginBottom: 8 }}>{res.description}</p>
                    <p className="text-xs text-[#999]">{res.count}</p>
                  </div>
                  <div className="border-t border-[#e0e0e0] flex items-center justify-between" style={{ padding: "12px 16px" }}>
                    <Link href="/resources" className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: "#ff6600" }}>
                      Explore <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((res, i) => {
              const color = TOP_BORDERS[i % TOP_BORDERS.length];
              return (
                <div
                  key={res.id}
                  className="bg-[#f5f5f5] border border-[#d6d6d6] flex items-center gap-4 hover:border-[#ff9f08] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all"
                  style={{ padding: 16 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
                    <BookOpen className="w-6 h-6" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-sm text-[#333]" style={{ marginBottom: 2 }}>{res.title}</h2>
                    <p className="text-xs text-[#777] line-clamp-1">{res.description}</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-xs text-[#999] hidden sm:block">{res.count}</span>
                    <Link href="/resources" className="text-xs font-semibold flex items-center gap-1" style={{ color: "#ff6600" }}>
                      Explore <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

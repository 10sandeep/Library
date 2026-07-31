"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const SEARCH_TABS = ["Quick Search", "Advanced Search"];
const CATEGORIES  = ["All","Books","eBooks","Journals","Research Papers","Thesis","Govt Publications"];
const DEPARTMENTS = ["All Departments","Engineering","Science","Commerce","Management","Arts","Law","Medical","Computer Science"];
const LANGUAGES   = ["All Languages","English","Hindi","Bengali","Tamil","Telugu","Marathi","Gujarati"];

import LayoutContainer from "@/components/ui/LayoutContainer";

export default function SearchSection() {
  const [tab, setTab]     = useState(0);
  const [query, setQuery] = useState("");
  const router            = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/resources?q=${encodeURIComponent(query)}`);
  };

  // NIC style: purple/maroon section background
  return (
    <section className="py-16" style={{ background: "#730068" }} aria-labelledby="search-heading">
      <LayoutContainer>
        <div className="text-center mb-8">
          <h2
            id="search-heading"
            className="font-extrabold text-white mb-3"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.2 }}
          >
            Search the Digital Library
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xl mx-auto">
            Search across 2.5 million books, research papers, journals, and more.
          </p>
        </div>

        <div className="bg-white/8 border border-white/15 rounded p-6">
          {/* Tabs */}
          <div className="flex gap-0 border-b border-white/15 mb-5" role="tablist">
            {SEARCH_TABS.map((t, i) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={cn(
                  "px-5 py-2 text-sm font-semibold border-b-[3px] -mb-px transition-all",
                  tab === i ? "text-[#ff9f08] border-[#ff9f08]" : "text-white/55 border-transparent hover:text-white/80"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch}>
            {tab === 0 ? (
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title, author, ISBN, or keyword..."
                    aria-label="Search library resources"
                    className="w-full bg-white/10 border border-white/20 rounded px-10 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#ff9f08] transition-colors"
                  />
                </div>
                <select
                  aria-label="Category"
                  className="bg-white/10 border border-white/20 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff9f08] transition-colors"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#730068]">{c}</option>)}
                </select>
                <button type="submit" className="flex items-center gap-2 font-bold px-6 py-2.5 rounded text-sm transition-all" style={{ background: "#ff9f08", color: "#fff" }}>
                  <Search className="w-4 h-4" /> Search
                </button>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  {[{ label: "Title", ph: "e.g. Advanced Algorithms" },{ label: "Author", ph: "e.g. Cormen" },{ label: "ISBN", ph: "e.g. 978-0-262-03384-8" },{ label: "Publisher", ph: "e.g. MIT Press" }].map((f) => (
                    <div key={f.label}>
                      <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-1">{f.label}</label>
                      <input type="text" placeholder={f.ph} aria-label={f.label} className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ff9f08] transition-colors" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {[{ label: "Category", opts: CATEGORIES },{ label: "Department", opts: DEPARTMENTS },{ label: "Language", opts: LANGUAGES },{ label: "Year", opts: ["Any Year","2025","2024","2023","2022","Before 2020"] }].map((f) => (
                    <div key={f.label}>
                      <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-1">{f.label}</label>
                      <select aria-label={f.label} className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff9f08] transition-colors">
                        {f.opts.map((o) => <option key={o} value={o} className="bg-[#730068]">{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="flex items-center gap-2 font-bold px-6 py-2 rounded text-sm transition-all" style={{ background: "#ff9f08", color: "#fff" }}>
                    <Search className="w-4 h-4" /> Search Resources
                  </button>
                  <button type="reset" className="border border-white/25 text-white/70 hover:bg-white/8 px-5 py-2 rounded text-sm transition-all">
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </LayoutContainer>
    </section>
  );
}

"use client";
import { useState } from "react";
import { ANNOUNCEMENTS } from "@/lib/data";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TABS = ["All", "Notices", "Events", "Alerts"];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  notice: { bg: "#1a6ebb18", text: "#1a6ebb" },
  event:  { bg: "#3aa04a18", text: "#3aa04a" },
  alert:  { bg: "#fea50020", text: "#c47a00" },
};

export default function AnnouncementsPage() {
  const [tab, setTab] = useState(0);

  const filtered = ANNOUNCEMENTS.filter((a) => {
    if (tab === 0) return true;
    return a.tagType === ["all", "notice", "event", "alert"][tab];
  });

  return (
    <main className="min-h-screen" style={{ background: "#ededed" }}>
      <div className="py-12" style={{ background: "#730068" }}>
        <div className="max-w-[900px] mx-auto px-4">
          <div className="text-white/50 text-xs mb-2 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Announcements</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Announcements</h1>
          <p className="text-white/60 text-sm">Latest notices, events, and alerts from the library administration.</p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 py-8">
        <div className="flex gap-0 border-b-2 border-[#ccc] mb-5" role="tablist">
          {TABS.map((t, i) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={cn(
                "px-5 py-2.5 text-sm font-semibold border-b-[3px] -mb-0.5 transition-all",
                tab === i ? "text-[#ff9f08] border-[#ff9f08]" : "text-[#555] border-transparent hover:text-[#ff9f08]"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-[#f5f5f5] border border-[#d6d6d6] divide-y divide-[#e0e0e0]">
          {filtered.map((ann, i) => (
            <div key={i} className="flex gap-4 px-5 py-4 hover:bg-white transition-all cursor-pointer group">
              <div className="flex-shrink-0 w-12 h-14 flex flex-col items-center justify-center" style={{ background: "#730068" }}>
                <span className="text-lg font-extrabold text-white leading-none">{ann.day}</span>
                <span className="text-xs text-white/70 uppercase">{ann.month}</span>
              </div>
              <div className="flex-1 min-w-0 py-1">
                <span
                  className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 mb-2"
                  style={{
                    background: TAG_COLORS[ann.tagType]?.bg ?? "#f0f0f0",
                    color: TAG_COLORS[ann.tagType]?.text ?? "#555",
                  }}
                >
                  {ann.tag}
                </span>
                <h2 className="text-sm font-bold text-[#333] mb-1.5 leading-snug group-hover:text-[#ff6600] transition-colors">{ann.title}</h2>
                <p className="text-xs text-[#888]">{ann.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

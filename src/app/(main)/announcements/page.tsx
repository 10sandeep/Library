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
      <div style={{ background: "#730068", paddingTop: 48, paddingBottom: 48 }}>
        <div className="max-w-[900px]" style={{ margin: "0 auto", paddingLeft: 16, paddingRight: 16 }}>
          <div className="text-white/50 text-xs flex items-center gap-2" style={{ marginBottom: 8 }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Announcements</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white" style={{ marginBottom: 8 }}>Announcements</h1>
          <p className="text-white/60 text-sm">Latest notices, events, and alerts from the library administration.</p>
        </div>
      </div>

      <div className="max-w-[900px]" style={{ margin: "0 auto", paddingLeft: 16, paddingRight: 16, paddingTop: 32, paddingBottom: 32 }}>
        <div className="flex border-b-2 border-[#ccc]" role="tablist" style={{ gap: 0, marginBottom: 20 }}>
          {TABS.map((t, i) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={cn(
                "text-sm font-semibold border-b-[3px] -mb-0.5 transition-all",
                tab === i ? "text-[#ff9f08] border-[#ff9f08]" : "text-[#555] border-transparent hover:text-[#ff9f08]"
              )}
              style={{ padding: "10px 20px" }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-[#f5f5f5] border border-[#d6d6d6] divide-y divide-[#e0e0e0]">
          {filtered.map((ann, i) => (
            <div key={i} className="flex hover:bg-white transition-all cursor-pointer group" style={{ gap: 16, padding: "16px 20px" }}>
              <div className="flex-shrink-0 w-12 h-14 flex flex-col items-center justify-center" style={{ background: "#730068" }}>
                <span className="text-lg font-extrabold text-white leading-none">{ann.day}</span>
                <span className="text-xs text-white/70 uppercase">{ann.month}</span>
              </div>
              <div className="flex-1 min-w-0" style={{ paddingTop: 4, paddingBottom: 4 }}>
                <span
                  className="inline-block text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: TAG_COLORS[ann.tagType]?.bg ?? "#f0f0f0",
                    color: TAG_COLORS[ann.tagType]?.text ?? "#555",
                    padding: "2px 8px",
                    marginBottom: 8,
                  }}
                >
                  {ann.tag}
                </span>
                <h2 className="text-sm font-bold text-[#333] leading-snug group-hover:text-[#ff6600] transition-colors" style={{ marginBottom: 6 }}>{ann.title}</h2>
                <p className="text-xs text-[#888]">{ann.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

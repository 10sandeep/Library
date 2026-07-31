"use client";
import { useState } from "react";
import { FileDown, ArrowRight } from "lucide-react";
import { ANNOUNCEMENTS, DOWNLOADS } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ANN_TABS = ["All", "Notices", "Events", "Alerts"];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  notice: { bg: "#1a6ebb18", text: "#1a6ebb" },
  event:  { bg: "#3aa04a18", text: "#3aa04a" },
  alert:  { bg: "#fea50020", text: "#c47a00" },
};

import LayoutContainer from "@/components/ui/LayoutContainer";

export default function AnnouncementsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const filtered = ANNOUNCEMENTS.filter((a) => {
    if (activeTab === 0) return true;
    const map = ["All", "notice", "event", "alert"];
    return a.tagType === map[activeTab];
  });

  return (
    <section className="py-16" style={{ background: "#e5e5e5" }} aria-labelledby="announcements-title">
      <LayoutContainer>
        <SectionHeader
          eyebrow="News & Updates"
          title="Announcements & Downloads"
          description="Stay informed with the latest library notices, events, and downloadable resources."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Announcements */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-0 border-b-2 border-[#ccc] mb-4" role="tablist">
              {ANN_TABS.map((t, i) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={activeTab === i}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    "px-4 py-2 text-xs font-semibold border-b-[3px] -mb-0.5 transition-all",
                    activeTab === i
                      ? "text-[#ff9f08] border-[#ff9f08]"
                      : "text-[#555] border-transparent hover:text-[#ff9f08]"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="bg-[#f5f5f5] border border-[#d6d6d6] divide-y divide-[#e0e0e0]">
              {filtered.map((ann, i) => (
                <div
                  key={i}
                  className="flex gap-4 px-4 py-3 hover:bg-white transition-all cursor-pointer group"
                >
                  {/* Date badge */}
                  <div className="flex-shrink-0 w-12 h-14 bg-[#730068] flex flex-col items-center justify-center">
                    <span className="text-lg font-extrabold text-white leading-none">{ann.day}</span>
                    <span className="text-xs text-white/70 uppercase">{ann.month}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 py-1">
                    <span
                      className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 mb-1.5"
                      style={{
                        background: TAG_COLORS[ann.tagType]?.bg ?? "#f0f0f0",
                        color: TAG_COLORS[ann.tagType]?.text ?? "#555",
                      }}
                    >
                      {ann.tag}
                    </span>
                    <p className="text-sm font-semibold text-[#333] leading-snug mb-1 group-hover:text-[#ff6600] transition-colors">
                      {ann.title}
                    </p>
                    <p className="text-xs text-[#888]">{ann.meta}</p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#bbb] flex-shrink-0 self-center opacity-0 group-hover:opacity-100 group-hover:text-[#ff6600] transition-all" />
                </div>
              ))}
            </div>

            <div className="mt-3">
              <Link href="/announcements" className="text-sm font-semibold flex items-center gap-1" style={{ color: "#ff6600" }}>
                View all announcements <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Downloads */}
          <div>
            <h3 className="text-sm font-bold text-[#333] mb-3 flex items-center gap-2 border-b-2 border-[#ff9f08] pb-2">
              <FileDown className="w-4 h-4" style={{ color: "#ff9f08" }} />
              Quick Downloads
            </h3>
            <div className="flex flex-col gap-2">
              {DOWNLOADS.map((dl, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center gap-3 p-3 bg-[#f5f5f5] border border-[#d6d6d6] hover:border-[#ff9f08] hover:bg-white transition-all group"
                >
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: "#ff9f0818" }}>
                    <FileDown className="w-4 h-4" style={{ color: "#ff9f08" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#333] leading-snug group-hover:text-[#ff6600] transition-colors">{dl.name}</p>
                    <p className="text-xs text-[#888]">{dl.type} • {dl.size}</p>
                  </div>
                  {dl.tag && (
                    <span className="text-xs font-bold px-2 py-0.5 flex-shrink-0" style={{ background: "#3aa04a18", color: "#3aa04a" }}>
                      {dl.tag}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

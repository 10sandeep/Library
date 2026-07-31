"use client";
import Link from "next/link";
import {
  BookOpen, Tablet, FileText, ClipboardList, Newspaper, BookMarked,
  GraduationCap, Building2, BarChart3, ScrollText, Headphones, Video, ArrowRight
} from "lucide-react";
import { RESOURCES } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen, Tablet, FileText, ClipboardList, Newspaper, BookMarked,
  GraduationCap, Building2, BarChart3, ScrollText, Headphones, Video,
};

// NIC card top-border colours — rotated through
const TOP_BORDERS = [
  "#3aa04a", "#fea500", "#00d8ff", "#8224e3",
  "#1a6ebb", "#e53935", "#3aa04a", "#fea500",
  "#00d8ff", "#8224e3", "#1a6ebb", "#e53935",
];

import LayoutContainer from "@/components/ui/LayoutContainer";

export default function ResourcesSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section
      id="resources"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16"
      style={{ background: "#e5e5e5" }}
      aria-labelledby="resources-heading"
    >
      <LayoutContainer>
        <SectionHeader
          eyebrow="Digital Resources"
          title="Explore Our Collection"
          description="Access millions of high-quality resources across 12 categories, curated and verified by subject experts."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {RESOURCES.map((res, i) => {
            const Icon = ICON_MAP[res.icon] ?? BookOpen;
            const borderColor = TOP_BORDERS[i % TOP_BORDERS.length];
            return (
              <div
                key={res.id}
                className={cn(
                  "bg-[#f5f5f5] border border-[#d6d6d6] flex flex-col group hover:shadow-[0_6px_20px_rgba(0,0,0,0.14)] hover:-translate-y-1 hover:border-[#bbb] transition-all duration-200 fade-up",
                  inView && "visible"
                )}
                style={{
                  borderTop: `4px solid ${borderColor}`,
                  transitionDelay: `${(i % 4) * 60}ms`,
                }}
              >
                {/* Icon row */}
                <div className="px-5 pt-5 pb-3 flex items-start gap-3">
                  <div className="w-10 h-10 rounded flex-shrink-0 flex items-center justify-center" style={{ background: `${borderColor}18` }}>
                    <Icon className="w-5 h-5" style={{ color: borderColor }} />
                  </div>
                  <h3 className="font-bold text-[#222] text-sm leading-snug pt-0.5">{res.title}</h3>
                </div>
                <div className="px-5 pb-4 flex-1">
                  <p className="text-xs text-[#666] leading-relaxed">{res.description}</p>
                  <p className="text-xs text-[#aaa] mt-2 font-medium">{res.count} available</p>
                </div>
                <div className="px-5 pb-5 border-t border-[#e8e8e8] pt-3">
                  <Link
                    href="/resources"
                    className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
                    style={{ color: "#ff6600" }}
                  >
                    Explore <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-2.5 border-2 rounded transition-all hover:-translate-y-0.5"
            style={{ borderColor: "#ff9f08", color: "#ff9f08" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#ff9f08"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#ff9f08"; }}
          >
            View All Collections <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </LayoutContainer>
    </section>
  );
}

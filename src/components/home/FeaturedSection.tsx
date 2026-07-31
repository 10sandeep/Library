"use client";
import { useState } from "react";
import { FEATURED_BOOKS } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import Link from "next/link";

const TABS = ["Latest Books", "Trending", "Faculty Picks", "Govt Publications"];
const COVER_COLORS = ["#730068","#1a6ebb","#3aa04a","#8224e3","#e68900","#e53935"];

import LayoutContainer from "@/components/ui/LayoutContainer";

export default function FeaturedSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-16" style={{ background: "#e5e5e5" }} aria-labelledby="featured-heading">
      <LayoutContainer>
        <SectionHeader eyebrow="Featured Collections" title="Handpicked for You" description="Curated selections by our librarians, faculty members, and usage analytics." />

        {/* Tabs — NIC style: orange active tab */}
        <div className="flex gap-0 flex-wrap mb-6 border-b-2 border-[#ccc]" role="tablist">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "px-5 py-2 text-xs font-semibold border-b-[3px] -mb-0.5 transition-all",
                active === i
                  ? "border-[#ff9f08] text-[#ff9f08]"
                  : "border-transparent text-[#555] hover:text-[#ff9f08]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {FEATURED_BOOKS.map((book, i) => (
            <div
              key={i}
              className="bg-[#f5f5f5] border border-[#d6d6d6] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              style={{ borderTop: `6px solid ${COVER_COLORS[i % COVER_COLORS.length]}` }}
            >
              {/* Book cover — relative so the badge anchors inside it */}
              <div className="relative h-36 flex items-center justify-center" style={{ background: COVER_COLORS[i % COVER_COLORS.length] + "18" }}>
                <div className="w-16 h-20 rounded flex items-center justify-center text-center p-2" style={{ background: COVER_COLORS[i % COVER_COLORS.length] }}>
                  <span className="text-white text-xs font-bold leading-tight">{book.dept}</span>
                </div>
                {book.badge && (
                  <span
                    className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5"
                    style={{ background: "#ff9f08", color: "#fff" }}
                  >
                    {book.badge}
                  </span>
                )}
              </div>
              <div className="p-3 relative">
                <p className="text-xs font-bold text-[#333] leading-tight mb-1 line-clamp-2">{book.title}</p>
                <p className="text-xs text-[#777]">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/resources" className="text-sm font-semibold" style={{ color: "#ff6600" }}>
            View full catalogue →
          </Link>
        </div>
      </LayoutContainer>
    </section>
  );
}

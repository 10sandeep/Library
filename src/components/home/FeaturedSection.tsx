"use client";
import { useState } from "react";
import { FEATURED_BOOKS } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LayoutContainer from "@/components/ui/LayoutContainer";

const TABS = ["Latest Books", "Trending", "Faculty Picks", "Govt Publications"];
const COVER_COLORS = ["#730068","#1a6ebb","#3aa04a","#8224e3","#e68900","#e53935"];

export default function FeaturedSection() {
  const [active, setActive] = useState(0);
  return (
    <section style={{ background: "#e5e5e5", paddingTop: 64, paddingBottom: 64 }} aria-labelledby="featured-heading">
      <LayoutContainer>
        <SectionHeader eyebrow="Featured Collections" title="Handpicked for You" description="Curated selections by our librarians, faculty members, and usage analytics." />

        {/* Tabs */}
        <div
          className="flex flex-wrap border-b-2 border-[#ccc]"
          role="tablist"
          style={{ gap: 0, marginBottom: 24 }}
        >
          {TABS.map((tab, i) => (
            <button
              key={tab}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "text-xs font-semibold border-b-[3px] transition-all",
                active === i
                  ? "border-[#ff9f08] text-[#ff9f08]"
                  : "border-transparent text-[#555] hover:text-[#ff9f08]"
              )}
              style={{ padding: "8px 20px", marginBottom: -2 }}
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
              <div
                className="relative h-36 flex items-center justify-center"
                style={{ background: COVER_COLORS[i % COVER_COLORS.length] + "18" }}
              >
                <div
                  className="w-16 h-20 rounded flex items-center justify-center text-center"
                  style={{ background: COVER_COLORS[i % COVER_COLORS.length], padding: 8 }}
                >
                  <span className="text-white text-xs font-bold leading-tight">{book.dept}</span>
                </div>
                {book.badge && (
                  <span
                    className="absolute text-xs font-bold"
                    style={{ top: 8, right: 8, background: "#ff9f08", color: "#fff", padding: "2px 8px" }}
                  >
                    {book.badge}
                  </span>
                )}
              </div>
              <div style={{ padding: 12 }}>
                <p className="text-xs font-bold text-[#333] leading-tight line-clamp-2" style={{ marginBottom: 4 }}>{book.title}</p>
                <p className="text-xs text-[#777]">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/resources" className="text-sm font-semibold" style={{ color: "#ff6600" }}>
            View full catalogue →
          </Link>
        </div>
      </LayoutContainer>
    </section>
  );
}

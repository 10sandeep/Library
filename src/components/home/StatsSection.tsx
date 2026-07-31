"use client";
import { useEffect, useRef } from "react";
import { BookOpen, FileText, Tablet, Users, GraduationCap, Building2, Download, TrendingUp } from "lucide-react";
import { STATS } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { animateCounter } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  BookOpen, FileText, Tablet, Users, GraduationCap, Building2, Download, TrendingUp,
};

function StatItem({ value, suffix, label, icon, started, index, total }: (typeof STATS)[0] & { started: boolean; index: number; total: number }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const Icon = ICONS[icon] ?? BookOpen;

  useEffect(() => {
    if (started && spanRef.current) animateCounter(spanRef.current, value, 2200);
  }, [started, value]);

  // On desktop (4 cols × 2 rows): right border except last in each row; no bottom border on first row
  // We let CSS grid handle layout; borders are set via className so media queries work
  const isLastInRow2Col  = index % 2 === 1;   // rightmost in 2-col grid
  const isLastInRow4Col  = index % 4 === 3;   // rightmost in 4-col grid
  const isLastInRow8Col  = index % 8 === 7;   // rightmost in 8-col grid (desktop single row)
  const isBottomRow2Col  = index >= total - 2; // bottom row in 2-col
  const isBottomRow4Col  = index >= total - 4; // bottom row in 4-col

  return (
    <div
      className="stat-item flex flex-col items-center justify-center text-center hover:bg-white/6 transition-colors group cursor-default w-full"
      data-idx={index}
      data-last2={isLastInRow2Col}
      data-last4={isLastInRow4Col}
      data-last8={isLastInRow8Col}
      data-bottom2={isBottomRow2Col}
      data-bottom4={isBottomRow4Col}
    >
      <div
        className="flex items-center justify-center transition-colors group-hover:bg-white/20"
        style={{ width: 48, height: 48, background: "rgba(255,255,255,0.12)", marginBottom: 12, flexShrink: 0 }}
      >
        <Icon style={{ width: 24, height: 24, color: "rgba(255,255,255,0.65)" }} />
      </div>
      <div
        className="font-extrabold text-white leading-none tabular-nums"
        style={{ fontSize: "clamp(1.25rem, 3vw, 1.9rem)", marginBottom: 8 }}
      >
        <span ref={spanRef}>0</span>
        <span style={{ color: "#ff9f08" }}>{suffix}</span>
      </div>
      <div
        className="font-semibold uppercase leading-tight text-center"
        style={{ fontSize: 11, letterSpacing: "0.09em", color: "rgba(255,255,255,0.5)", marginTop: 2 }}
      >
        {label}
      </div>

      <style>{`
        .stat-item {
          padding: 28px 16px;
          border-right: 1px solid rgba(255,255,255,0.12);
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        /* 2-col: remove right border on col 2, remove bottom border on last row */
        .stat-item[data-last2="true"]   { border-right: none; }
        .stat-item[data-bottom2="true"] { border-bottom: none; }

        @media (min-width: 640px) {
          .stat-item { padding: 32px 18px; }
          /* 4-col: remove right border on col 4, remove bottom on last row */
          .stat-item[data-last2="true"]   { border-right: 1px solid rgba(255,255,255,0.12); }
          .stat-item[data-last4="true"]   { border-right: none; }
          .stat-item[data-bottom2="true"] { border-bottom: 1px solid rgba(255,255,255,0.12); }
          .stat-item[data-bottom4="true"] { border-bottom: none; }
        }

        @media (min-width: 1024px) {
          .stat-item { padding: 40px 20px; }
          /* 8-col single row: remove right border on last, no bottom borders */
          .stat-item[data-last4="true"]   { border-right: 1px solid rgba(255,255,255,0.12); }
          .stat-item[data-last8="true"]   { border-right: none; }
          .stat-item[data-bottom4="true"] { border-bottom: none; }
        }
      `}</style>
    </div>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView(0.2);
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Library statistics"
      style={{ background: "#730068", borderBottom: "3px solid rgba(255,255,255,0.08)" }}
    >
      <div
        style={{ height: 2, width: "100%", background: "linear-gradient(to right,#FF9933 33.33%,#FFFFFF 33.33%,#FFFFFF 66.66%,#138808 66.66%)" }}
        aria-hidden="true"
      />
      {/* 2-col mobile → 4-col tablet → 8-col desktop */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", width: "100%" }}
        className="sm:grid-cols-4 lg:grid-cols-8">
        {STATS.map((s, i) => (
          <StatItem key={s.label} {...s} started={inView} index={i} total={STATS.length} />
        ))}
      </div>
    </section>
  );
}

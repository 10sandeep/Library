"use client";
import { useEffect, useRef } from "react";
import { BookOpen, FileText, Tablet, Users, GraduationCap, Building2, Download, TrendingUp } from "lucide-react";
import { STATS } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { animateCounter } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  BookOpen, FileText, Tablet, Users, GraduationCap, Building2, Download, TrendingUp,
};

function StatItem({ value, suffix, label, icon, started, isLast, index, total }: (typeof STATS)[0] & { started: boolean; isLast: boolean; index: number; total: number }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const Icon = ICONS[icon] ?? BookOpen;

  useEffect(() => {
    if (started && spanRef.current) animateCounter(spanRef.current, value, 2200);
  }, [started, value]);

  // Mobile 2-col borders
  const isLastInRow2 = index % 2 === 1;        // right column → no right border
  const isLastRow2   = index >= total - 2;      // last 2 items → no bottom border

  return (
    <div
      className="stat-item flex flex-col items-center justify-center text-center hover:bg-white/6 transition-colors group cursor-default w-full"
      data-last2={isLastInRow2}
      data-lastrow2={isLastRow2}
      data-desktop-last={isLast}
    >
      <div
        className="flex items-center justify-center transition-colors group-hover:bg-white/20"
        style={{ width: 48, height: 48, background: "rgba(255,255,255,0.12)", marginBottom: 12, flexShrink: 0 }}
      >
        <Icon style={{ width: 24, height: 24, color: "rgba(255,255,255,0.65)" }} />
      </div>
      <div
        className="font-extrabold text-white leading-none tabular-nums"
        style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", marginBottom: 8 }}
      >
        <span ref={spanRef}>0</span>
        <span style={{ color: "#ff9f08" }}>{suffix}</span>
      </div>
      <div
        className="font-semibold uppercase tracking-[0.1em] leading-tight text-center"
        style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}
      >
        {label}
      </div>

      <style>{`
        /* ── Mobile: 2-column grid ─────────────────────────── */
        .stat-item {
          padding: 32px 16px;
          border-right:  1px solid rgba(255,255,255,0.12);
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .stat-item[data-last2="true"]    { border-right: none; }
        .stat-item[data-lastrow2="true"] { border-bottom: none; }

        /* ── Desktop: 8-column row — identical to original ── */
        @media (min-width: 640px) {
          .stat-item {
            padding: 40px 20px;
            border-right:  1px solid rgba(255,255,255,0.12);
            border-bottom: none;
          }
          .stat-item[data-desktop-last="true"] { border-right: none; }
          /* undo mobile overrides */
          .stat-item[data-last2="true"]    { border-right: 1px solid rgba(255,255,255,0.12); }
          .stat-item[data-lastrow2="true"] { border-bottom: none; }
          .stat-item[data-last2="true"][data-desktop-last="true"] { border-right: none; }
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
      {/* tricolor top accent */}
      <div
        className="h-0.5 w-full"
        style={{ background: "linear-gradient(to right,#FF9933 33.33%,#FFFFFF 33.33%,#FFFFFF 66.66%,#138808 66.66%)" }}
        aria-hidden="true"
      />

      {/* Mobile: 2 cols. Desktop (≥640px): 8 cols — same as original */}
      <div
        style={{ display: "grid", width: "100%", gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
        className="sm:grid-cols-8"
      >
        {STATS.map((s, i) => (
          <StatItem
            key={s.label}
            {...s}
            started={inView}
            isLast={i === STATS.length - 1}
            index={i}
            total={STATS.length}
          />
        ))}
      </div>
    </section>
  );
}

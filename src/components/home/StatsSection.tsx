"use client";
import { useEffect, useRef } from "react";
import { BookOpen, FileText, Tablet, Users, GraduationCap, Building2, Download, TrendingUp } from "lucide-react";
import { STATS } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { animateCounter } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  BookOpen, FileText, Tablet, Users, GraduationCap, Building2, Download, TrendingUp,
};

function StatItem({ value, suffix, label, icon, started, isLast }: (typeof STATS)[0] & { started: boolean; isLast: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const Icon = ICONS[icon] ?? BookOpen;

  useEffect(() => {
    if (started && spanRef.current) animateCounter(spanRef.current, value, 2200);
  }, [started, value]);

  return (
    <div
      className="flex flex-col items-center justify-center text-center hover:bg-white/6 transition-colors group cursor-default w-full"
      style={{
        padding: "40px 20px",
        borderRight: isLast ? "none" : "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div
        className="w-12 h-12 flex items-center justify-center transition-colors group-hover:bg-white/20"
        style={{ background: "rgba(255,255,255,0.12)", marginBottom: 12 }}
      >
        <Icon className="w-6 h-6 transition-colors" style={{ color: "rgba(255,255,255,0.65)" }} />
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
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${STATS.length}, minmax(0, 1fr))`, width: "100%" }}>
        {STATS.map((s, i) => (
          <StatItem key={s.label} {...s} started={inView} isLast={i === STATS.length - 1} />
        ))}
      </div>
    </section>
  );
}

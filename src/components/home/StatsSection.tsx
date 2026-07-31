"use client";
import { useEffect, useRef } from "react";
import { BookOpen, FileText, Tablet, Users, GraduationCap, Building2, Download, TrendingUp } from "lucide-react";
import { STATS } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { animateCounter } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  BookOpen, FileText, Tablet, Users, GraduationCap, Building2, Download, TrendingUp,
};

function StatItem({ value, suffix, label, icon, started }: (typeof STATS)[0] & { started: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const Icon = ICONS[icon] ?? BookOpen;

  useEffect(() => {
    if (started && spanRef.current) animateCounter(spanRef.current, value, 2200);
  }, [started, value]);

  return (
    <div
      className="flex flex-col items-center text-center border-r border-white/10 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(4n)]:border-r lg:last:border-r-0 hover:bg-white/6 transition-colors group cursor-default"
      style={{ padding: "32px 16px" }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center transition-colors group-hover:bg-white/20"
        style={{ background: "rgba(255,255,255,0.12)", marginBottom: 12 }}
      >
        <Icon className="w-5 h-5 text-white/55 group-hover:text-[#ff9f08] transition-colors" />
      </div>
      <div className="text-2xl sm:text-3xl font-extrabold text-white leading-none tabular-nums" style={{ marginBottom: 4 }}>
        <span ref={spanRef}>0</span>
        <span style={{ color: "#ff9f08" }}>{suffix}</span>
      </div>
      <div className="text-xs font-semibold text-white/55 uppercase tracking-[0.08em] leading-tight text-center" style={{ marginTop: 6 }}>{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView(0.2);
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Library statistics"
      style={{ background: "#730068" }}
    >
      <div className="w-full mx-auto lg:max-w-[1320px] xl:max-w-[1440px]">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
          {STATS.map((s) => <StatItem key={s.label} {...s} started={inView} />)}
        </div>
      </div>
    </section>
  );
}

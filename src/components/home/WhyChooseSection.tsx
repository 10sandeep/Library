import { ShieldCheck, Clock, BadgeCheck, Building2, Smartphone, Zap, Globe, Archive } from "lucide-react";
import { WHY_CHOOSE } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck, Clock, BadgeCheck, Building2, Smartphone, Zap, Globe, Archive,
};

import LayoutContainer from "@/components/ui/LayoutContainer";

export default function WhyChooseSection() {
  return (
    <section className="py-16" style={{ background: "#730068" }} aria-labelledby="why-title">
      <LayoutContainer>
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Built for India's Students & Scholars"
          description="A platform designed with purpose — secure, inclusive, and built to scale for millions of learners."
          dark
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY_CHOOSE.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? ShieldCheck;
            return (
              <div
                key={item.title}
                className="p-6 hover:-translate-y-1 hover:bg-white/15 transition-all duration-200 border border-white/15"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <div className="w-11 h-11 flex items-center justify-center mb-4" style={{ background: "rgba(255,159,8,0.18)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#ff9f08" }} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">{item.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
}

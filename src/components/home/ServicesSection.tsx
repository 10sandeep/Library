import { Search, BookOpen, CreditCard, FlaskConical, Calendar, RefreshCw, MessageSquare, FolderOpen, Bell, History } from "lucide-react";
import { SERVICES } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import LayoutContainer from "@/components/ui/LayoutContainer";

const ICON_MAP: Record<string, React.ElementType> = {
  Search, BookOpen, CreditCard, FlaskConical, Calendar, RefreshCw, MessageSquare, FolderOpen, Bell, History,
};

const COLORS = ["#3aa04a","#fea500","#00d8ff","#8224e3","#1a6ebb","#e53935","#3aa04a","#fea500","#00d8ff","#8224e3"];

export default function ServicesSection() {
  return (
    <section style={{ background: "#ededed", paddingTop: 64, paddingBottom: 64 }} aria-labelledby="services-heading">
      <LayoutContainer>
        <SectionHeader
          eyebrow="Library Services"
          title="Services Available Online"
          description="Manage all your library needs digitally — from book discovery to membership renewal."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {SERVICES.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon] ?? BookOpen;
            const color = COLORS[i % COLORS.length];
            return (
              <button
                key={svc.title}
                aria-label={svc.title}
                className="bg-[#f5f5f5] border border-[#d6d6d6] flex flex-col items-center text-center hover:shadow-[0_6px_20px_rgba(0,0,0,0.13)] hover:-translate-y-1 hover:border-[#bbb] transition-all duration-200 group"
                style={{ borderTop: `4px solid ${color}`, padding: "24px 16px", gap: 12 }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-colors group-hover:scale-110 duration-200"
                  style={{ background: `${color}15` }}
                >
                  <Icon className="w-6 h-6 transition-colors" style={{ color }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#222]" style={{ marginBottom: 6 }}>{svc.title}</div>
                  <div className="text-xs text-[#777] leading-relaxed">{svc.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
}

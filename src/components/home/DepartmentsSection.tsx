import { Cpu, FlaskConical, TrendingUp, Briefcase, Palette, Scale, Leaf, Stethoscope, Monitor, Globe, ArrowRight } from "lucide-react";
import { DEPARTMENTS } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu, FlaskConical, TrendingUp, Briefcase, Palette, Scale, Leaf, Stethoscope, Monitor, Globe,
};

import LayoutContainer from "@/components/ui/LayoutContainer";

export default function DepartmentsSection() {
  return (
    <section className="py-16" style={{ background: "#ededed" }} aria-labelledby="dept-heading">
      <LayoutContainer>
        <SectionHeader eyebrow="Departments" title="Resources by Academic Department" description="Explore curated digital collections tailored to each faculty and discipline." />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {DEPARTMENTS.map((dept) => {
            const Icon = ICON_MAP[dept.icon] ?? Cpu;
            return (
              <Link
                key={dept.name}
                href={`/departments/${dept.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="bg-[#f5f5f5] border border-[#d6d6d6] p-4 flex flex-col items-center text-center gap-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200 group"
                style={{ borderTop: `8px solid ${dept.color}` }}
                aria-label={`${dept.name} department`}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${dept.color}18` }}>
                  <Icon className="w-6 h-6" style={{ color: dept.color }} />
                </div>
                <div className="font-bold text-sm text-[#333]">{dept.name}</div>
                <div className="flex gap-4">
                  <div>
                    <div className="text-sm font-extrabold" style={{ color: dept.color }}>{dept.books}</div>
                    <div className="text-xs text-[#888] uppercase">Books</div>
                  </div>
                  <div>
                    <div className="text-sm font-extrabold" style={{ color: dept.color }}>{dept.faculty}</div>
                    <div className="text-xs text-[#888] uppercase">Faculty</div>
                  </div>
                </div>
                <span className="text-xs font-semibold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#ff6600" }}>
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
}

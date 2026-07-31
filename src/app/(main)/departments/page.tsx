import { Cpu, FlaskConical, TrendingUp, Briefcase, Palette, Scale, Leaf, Stethoscope, Monitor, Globe, ArrowRight } from "lucide-react";
import { DEPARTMENTS } from "@/lib/data";
import Link from "next/link";

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu, FlaskConical, TrendingUp, Briefcase, Palette, Scale, Leaf, Stethoscope, Monitor, Globe,
};

export default function DepartmentsPage() {
  return (
    <main className="min-h-screen" style={{ background: "#ededed" }}>
      <div className="py-12" style={{ background: "#730068" }}>
        <div className="w-full mx-auto px-4 sm:px-6 lg:max-w-[1320px] xl:max-w-[1440px]">
          <div className="text-white/50 text-xs mb-2 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Departments</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Academic Departments</h1>
          <p className="text-white/60 text-sm max-w-xl">
            Curated digital collections tailored to each academic faculty and discipline.
          </p>
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:max-w-[1320px] xl:max-w-[1440px] py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {DEPARTMENTS.map((dept) => {
            const Icon = ICON_MAP[dept.icon] ?? Cpu;
            return (
              <Link
                key={dept.name}
                href={`/departments/${dept.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="bg-[#f5f5f5] border border-[#d6d6d6] p-5 flex flex-col items-center text-center gap-3 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-200 group"
                style={{ borderTop: `8px solid ${dept.color}` }}
              >
                <div className="w-14 h-14 flex items-center justify-center" style={{ background: `${dept.color}18` }}>
                  <Icon className="w-7 h-7" style={{ color: dept.color }} />
                </div>
                <div>
                  <h2 className="font-extrabold text-sm text-[#333] mb-3">{dept.name}</h2>
                  <div className="flex gap-6 justify-center mb-3">
                    <div>
                      <div className="text-base font-extrabold" style={{ color: dept.color }}>{dept.books}</div>
                      <div className="text-xs text-[#888] uppercase tracking-wider">Books</div>
                    </div>
                    <div>
                      <div className="text-base font-extrabold" style={{ color: dept.color }}>{dept.faculty}</div>
                      <div className="text-xs text-[#888] uppercase tracking-wider">Faculty</div>
                    </div>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#ff6600" }}>
                  Explore Collection <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

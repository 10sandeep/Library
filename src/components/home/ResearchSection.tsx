import { FlaskConical, Quote, BookMarked, FolderSearch, Library, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";

const COLORS = ["#3aa04a", "#1a6ebb", "#fea500", "#8224e3", "#730068", "#00d8ff"];

const ITEMS = [
  {
    icon: FlaskConical,
    title: "Research Assistance",
    desc: "One-on-one consultation with subject librarians to plan, scope, and execute your research projects.",
  },
  {
    icon: Quote,
    title: "Citation & Reference Help",
    desc: "Expert guidance on APA, MLA, Chicago, and IEEE citation formats with live review sessions.",
  },
  {
    icon: BookMarked,
    title: "Reference Management",
    desc: "Training and support for Zotero, Mendeley, and EndNote to manage your research bibliography.",
  },
  {
    icon: FolderSearch,
    title: "Research Guides",
    desc: "Curated subject-specific guides for every academic department, updated each semester.",
  },
  {
    icon: Library,
    title: "Institutional Repository",
    desc: "Submit and preserve your research in our open-access repository — visible globally, archived permanently.",
  },
  {
    icon: ArrowRight,
    title: "Publication Support",
    desc: "Guidance on identifying appropriate journals, navigating peer review, and meeting publication standards.",
  },
];

import LayoutContainer from "@/components/ui/LayoutContainer";

export default function ResearchSection() {
  return (
    <section className="py-16" style={{ background: "#ededed" }} aria-labelledby="research-title">
      <LayoutContainer>
        <SectionHeader
          eyebrow="Research Support"
          title="Supporting Your Academic Journey"
          description="Dedicated research services to help students, scholars, and faculty at every stage of the research lifecycle."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            const color = COLORS[i % COLORS.length];
            return (
              <div
                key={item.title}
                className="bg-[#f5f5f5] border border-[#d6d6d6] p-5 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-200 group"
                style={{ borderTop: `8px solid ${color}` }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center mb-4"
                  style={{ background: `${color}18` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="text-sm font-bold text-[#333] mb-2">{item.title}</h3>
                <p className="text-xs text-[#666] leading-relaxed mb-4">{item.desc}</p>
                <Link
                  href="/services"
                  className="text-xs font-semibold flex items-center gap-1 transition-all group-hover:gap-2"
                  style={{ color: "#ff6600" }}
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
}

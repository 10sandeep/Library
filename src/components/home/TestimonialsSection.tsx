import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import LayoutContainer from "@/components/ui/LayoutContainer";

export default function TestimonialsSection() {
  return (
    <section style={{ background: "#e5e5e5", paddingTop: 64, paddingBottom: 64 }} aria-labelledby="testimonials-title">
      <LayoutContainer>
        <SectionHeader
          eyebrow="Testimonials"
          title="Trusted by Thousands Across India"
          description="Hear from students, faculty, researchers, and librarians who use the portal every day."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-[#f5f5f5] border border-[#d6d6d6] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-200"
              style={{ borderTop: "6px solid #ff9f08", padding: 20 }}
            >
              {/* Stars */}
              <div className="flex gap-0.5" aria-label={`${t.stars} out of 5 stars`} style={{ marginBottom: 12 }}>
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-[#ff9f08] text-[#ff9f08]" />
                ))}
              </div>
              {/* Quote */}
              <blockquote
                className="text-sm text-[#555] leading-relaxed relative"
                style={{ paddingLeft: 16, marginBottom: 20, borderLeft: "2px solid #ff9f08" }}
              >
                "{t.quote}"
              </blockquote>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: t.color }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#333]">{t.name}</div>
                  <div className="text-xs text-[#888]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
}

import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";

const SocialIcons = {
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
      <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Youtube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
};

const QUICK_LINKS = [
  { label: "About Library", href: "/about" },
  { label: "Digital Resources", href: "/resources" },
  { label: "Library Services", href: "/services" },
  { label: "Departments", href: "/departments" },
  { label: "Announcements", href: "/announcements" },
  { label: "Downloads", href: "/downloads" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

const RESOURCES_LINKS = [
  { label: "eBooks", href: "/resources/ebooks" },
  { label: "Journals", href: "/resources/journals" },
  { label: "Research Papers", href: "/resources/research" },
  { label: "Thesis Repository", href: "/resources/thesis" },
  { label: "Question Papers", href: "/resources/question-papers" },
  { label: "Govt Publications", href: "/resources/govt" },
  { label: "Audio Books", href: "/resources/audio" },
  { label: "Video Lectures", href: "/resources/videos" },
];

const GOV_LINKS = [
  { label: "India.gov.in", href: "#" },
  { label: "Digital India", href: "#" },
  { label: "NIC", href: "#" },
  { label: "UGC India", href: "#" },
  { label: "MHRD Portal", href: "#" },
  { label: "NDL India", href: "#" },
  { label: "INFLIBNET", href: "#" },
  { label: "Shodhganga", href: "#" },
];

const SOCIAL = [
  { icon: SocialIcons.Facebook, label: "Facebook", href: "#" },
  { icon: SocialIcons.Twitter, label: "Twitter / X", href: "#" },
  { icon: SocialIcons.Youtube, label: "YouTube", href: "#" },
  { icon: SocialIcons.Instagram, label: "Instagram", href: "#" },
  { icon: SocialIcons.Linkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#2b2b2b" }} className="text-white/70 w-full overflow-hidden" role="contentinfo">
      {/* NIC tricolor bar */}
      <div
        className="h-1.5 w-full"
        style={{ background: "linear-gradient(to right,#FF9933 33.33%,#FFFFFF 33.33%,#FFFFFF 66.66%,#138808 66.66%)" }}
        aria-hidden="true"
      />

      <div className="w-full lg:max-w-[1320px] xl:max-w-[1440px]" style={{ margin: "0 auto", paddingLeft: 24, paddingRight: 24, paddingTop: 40 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10" style={{ marginBottom: 40 }}>
          {/* Brand */}
          <div className="lg:col-span-2 min-w-0">
            <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "#ff9f08" }}>
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white">National Digital Library</div>
                <div className="text-xs" style={{ color: "#ff9f08" }}>Government of India</div>
              </div>
            </div>
            <p className="text-xs text-white/50 leading-relaxed max-w-xs break-words" style={{ marginBottom: 20 }}>
              Providing secure, equitable, and instant access to digital learning resources for students, teachers, researchers, and staff across India.
            </p>
            <div className="flex flex-wrap gap-2" style={{ marginBottom: 20 }}>
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center text-white/55 border border-white/15 hover:border-[#ff9f08] hover:text-[#ff9f08] transition-all flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <Icon />
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {["🇮🇳 Government of India", "Digital India", "NIC Certified"].map((badge) => (
                <span key={badge} className="text-xs border border-white/15 text-white/40 whitespace-nowrap" style={{ padding: "4px 12px" }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white" style={{ borderBottom: "2px solid #ff9f08", marginBottom: 12, paddingBottom: 8 }}>Quick Links</h3>
            <ul className="flex flex-col gap-1.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs text-white/50 hover:text-[#ff9f08] transition-colors flex items-center gap-1.5">
                    <span style={{ color: "#ff9f08" }}>›</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white" style={{ borderBottom: "2px solid #ff9f08", marginBottom: 12, paddingBottom: 8 }}>Digital Resources</h3>
            <ul className="flex flex-col gap-1.5">
              {RESOURCES_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs text-white/50 hover:text-[#ff9f08] transition-colors flex items-center gap-1.5">
                    <span style={{ color: "#ff9f08" }}>›</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gov Links */}
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white" style={{ borderBottom: "2px solid #ff9f08", marginBottom: 12, paddingBottom: 8 }}>Important Links</h3>
            <ul className="flex flex-col gap-1.5">
              {GOV_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/50 hover:text-[#ff9f08] transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3 h-3 flex-shrink-0" style={{ color: "#ff9f08" }} />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 flex flex-wrap items-center justify-between gap-3" style={{ paddingTop: 16, paddingBottom: 16 }}>
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} National Digital Library Portal. Government of India. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {["Privacy Policy", "Terms of Use", "Accessibility Statement", "Sitemap", "RTI"].map((label) => (
              <Link key={label} href="#" className="text-xs text-white/35 hover:text-[#ff9f08] transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

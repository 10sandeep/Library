import { BookOpen, Search, Bell, Download } from "lucide-react";

function PhoneMockup({ isMain }: { isMain?: boolean }) {
  return (
    <div
      className={`relative flex-shrink-0 ${isMain ? "w-[180px] h-[360px]" : "w-[155px] h-[310px] opacity-70"}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#1a1a2e] rounded-[2.2rem] border-[7px] border-[#2a2a4e] shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
        <div className="absolute inset-0 flex flex-col gap-2 p-3 overflow-hidden" style={{ background: "linear-gradient(135deg,#730068,#5a0050)" }}>
          <div className="flex justify-between text-[7px] text-white/50 px-1">
            <span>9:41</span><span>●●● 5G</span>
          </div>
          <div className="flex flex-col items-center gap-1 mb-1">
            <div className="w-9 h-9 flex items-center justify-center" style={{ background: "#ff9f08" }}>
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-[8px] font-bold text-white text-center leading-tight">National Digital Library</span>
          </div>
          <div className="bg-white/15 rounded-lg px-2 py-1.5 flex items-center gap-1">
            <Search className="w-2.5 h-2.5 text-white/50" />
            <span className="text-[7px] text-white/40">Search books, journals...</span>
          </div>
          {[
            { color: "#ff9f08", label: "eBooks", val: "85K+" },
            { color: "#3aa04a", label: "Research", val: "180K+" },
            { color: "#1a6ebb", label: "Journals", val: "12K+" },
          ].map((c) => (
            <div key={c.label} className="bg-white/10 rounded-lg p-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex-shrink-0" style={{ background: c.color + "40" }} />
              <div className="flex-1">
                <div className="h-1.5 w-16 rounded bg-white/20 mb-1" />
                <div className="h-1 w-10 rounded bg-white/10" />
              </div>
              <span className="text-[7px] font-bold text-white/70">{c.val}</span>
            </div>
          ))}
          <div className="mt-auto flex justify-around pt-2 border-t border-white/10">
            {[BookOpen, Search, Bell, Download].map((Icon, i) => (
              <div key={i} className={`p-1 rounded-lg`} style={i === 0 ? { background: "rgba(255,159,8,0.3)" } : {}}>
                <Icon className="w-3 h-3 text-white/60" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#2a2a4e] rounded-b-xl z-10" />
    </div>
  );
}

function PlayStoreIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 512 512" aria-hidden="true">
      <path fill="#FF3D00" d="M301.9 214.8L86.7 0 64 22.7 256 214.8z" />
      <path fill="#00F076" d="M425.9 256l-62.3-62.3L301.9 256l61.7 61.7z" />
      <path fill="#FFD400" d="M86.7 512l215.2-214.8L256 244.7 64 436.7z" />
      <path fill="#00AEFF" d="M64 22.7v466.6L256 244.7z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 814 1000" fill="white" aria-hidden="true">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-39.5-148.1-102.1c-56.3-78.6-80.6-175.5-80.6-269.2 0-173.8 91.2-262.5 230.5-262.5 60 0 109.4 39.5 148.1 39.5 37.5 0 96.3-41.6 164.3-41.6 26.3 0 108.3 2.6 164 96.7zM548.3 30.6C560.5-6.4 572.7-40 581.7-40c8.1 0 8.9.8 8.9 8.1 0 36.7-26.2 105-52.3 148.9-26.2 44.7-71.5 89.5-124.8 89.5-8.1 0-15.7-4.8-15.7-13.5 0-39.5 36.7-101.6 150.5-162.4z" />
    </svg>
  );
}

import LayoutContainer from "@/components/ui/LayoutContainer";

export default function MobileAppSection() {
  return (
    <section id="mobile-app" className="py-16 overflow-hidden" style={{ background: "#730068" }} aria-labelledby="app-title">
      <LayoutContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 border border-white/30 px-4 py-1.5 text-xs text-white font-semibold tracking-wide mb-5" style={{ background: "rgba(255,159,8,0.2)" }}>
              Mobile Application
            </div>
            <h2 id="app-title" className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
              Take the Library<br />Everywhere You Go
            </h2>
            <p className="text-white/65 text-sm leading-relaxed mb-5 max-w-md">
              Download the official National Digital Library app — read offline, get personalised recommendations, and receive instant notifications on new resources.
            </p>
            <ul className="flex flex-col gap-2 mb-7">
              {[
                "Download and read books offline",
                "Smart search with voice input",
                "Push notifications for new resources",
                "Scan QR code to access physical books",
                "Sync reading progress across all devices",
                "Available in 13 Indian languages",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#ff9f08" }} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="flex items-center gap-3 border border-white/20 hover:border-white/50 px-4 py-3 text-white transition-all"
                style={{ background: "rgba(255,255,255,0.1)" }}
                aria-label="Get it on Google Play"
              >
                <PlayStoreIcon />
                <div>
                  <div className="text-xs text-white/60 leading-none">GET IT ON</div>
                  <div className="text-sm font-bold leading-tight">Google Play</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 border border-white/20 hover:border-white/50 px-4 py-3 text-white transition-all"
                style={{ background: "rgba(255,255,255,0.1)" }}
                aria-label="Download on the App Store"
              >
                <AppleIcon />
                <div>
                  <div className="text-xs text-white/60 leading-none">DOWNLOAD ON THE</div>
                  <div className="text-sm font-bold leading-tight">App Store</div>
                </div>
              </a>
            </div>
          </div>

          {/* Phone mockups */}
          <div className="hidden lg:flex items-end justify-center gap-5 pb-0">
            <PhoneMockup />
            <div className="-mb-8">
              <PhoneMockup isMain />
            </div>
            <PhoneMockup />
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

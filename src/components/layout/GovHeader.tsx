"use client";
import { useState, useEffect } from "react";
import { Phone, Mail, Sun, Moon, Search, X } from "lucide-react";
import Link from "next/link";

const r3 = (n: number) => Math.round(n * 1000) / 1000;

function StateEmblem() {
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const deg = (i * 360) / 24;
    const rad = (deg * Math.PI) / 180;
    return (
      <line
        key={i}
        x1={r3(28 + Math.cos(rad) * 6)} y1={r3(28 + Math.sin(rad) * 6)}
        x2={r3(28 + Math.cos(rad) * 13)} y2={r3(28 + Math.sin(rad) * 13)}
        stroke="#9a7212" strokeWidth="0.9"
      />
    );
  });
  return (
    <svg width="60" height="72" viewBox="0 0 60 75" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="State Emblem of India" role="img">
      <ellipse cx="30" cy="28" rx="26" ry="26" stroke="#9a7212" strokeWidth="1.5" fill="none" />
      <ellipse cx="30" cy="28" rx="19" ry="19" stroke="#9a7212" strokeWidth="0.7" fill="none" opacity="0.4" />
      {/* Lions (stylized) */}
      <ellipse cx="30" cy="20" rx="7" ry="9" fill="#b8860b" />
      <ellipse cx="19" cy="25" rx="5" ry="7" fill="#b8860b" opacity="0.7" />
      <ellipse cx="41" cy="25" rx="5" ry="7" fill="#b8860b" opacity="0.7" />
      {/* Dharma Chakra */}
      <circle cx="30" cy="38" r="6" stroke="#b8860b" strokeWidth="1.2" fill="none" />
      {spokes}
      <circle cx="30" cy="38" r="1.5" fill="#b8860b" />
      {/* Base stripe */}
      <rect x="17" y="47" width="26" height="2" fill="#b8860b" opacity="0.65" rx="1" />
      <text x="30" y="58" textAnchor="middle" fill="#5a3e00" fontSize="5.5" fontWeight="700" letterSpacing="0.6">सत्यमेव जयते</text>
      <text x="30" y="65" textAnchor="middle" fill="#7a5a00" fontSize="3.8" letterSpacing="0.4">SATYAMEV JAYATE</text>
    </svg>
  );
}

export default function GovHeader() {
  const [dark, setDark] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const changeFont = (dir: "up" | "down" | "reset") => {
    setFontSize((prev) => {
      const next = dir === "up" ? Math.min(prev + 0.1, 1.3) : dir === "down" ? Math.max(prev - 0.1, 0.85) : 1;
      document.documentElement.style.fontSize = `${next * 16}px`;
      return next;
    });
  };

  return (
    <>
      {/* ── Utility bar ── */}
      <div className="bg-[#f4f4f4] border-b border-[#d8d8d8]">
        <div className="w-full lg:max-w-[1320px] xl:max-w-[1440px] flex flex-wrap items-center justify-between gap-y-1 min-h-[32px]" style={{ margin: "0 auto", paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4 }}>
          {/* Left: skip + breadcrumb */}
          <div className="flex items-center gap-3 text-xs">
            <a href="#main-content" className="text-[#444] hover:text-[#ff9f08] hover:underline transition-colors">
              Skip to Content
            </a>
            <span className="text-[#ccc]">|</span>
            <a href="#main-nav" className="text-[#444] hover:text-[#ff9f08] hover:underline transition-colors">
              Skip to Navigation
            </a>
            <span className="text-[#ccc] hidden sm:inline">|</span>
            <a href="/sitemap" className="text-[#444] hover:text-[#ff9f08] hover:underline transition-colors hidden sm:inline">
              Sitemap
            </a>
          </div>

          {/* Right: controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Official badge */}
            <span className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#138808] bg-[#138808]/8 border border-[#138808]/25 rounded" style={{ padding: "2px 8px" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#138808] pulse-dot" aria-hidden="true" />
              Official Website
            </span>

            {/* Language */}
            <div className="flex border border-[#ccc] rounded overflow-hidden">
              {(["en", "hi"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className="text-xs font-semibold transition-colors"
                  style={{ padding: "2px 8px" }}
                  style={lang === l ? { background: "#ff9f08", color: "#fff" } : { background: "transparent", color: "#555" }}
                >
                  {l === "en" ? "EN" : "हि"}
                </button>
              ))}
            </div>

            {/* Text size */}
            <div className="flex border border-[#ccc] rounded overflow-hidden">
              {([["A-", "down"], ["A", "reset"], ["A+", "up"]] as const).map(([label, dir]) => (
                <button
                  key={label}
                  onClick={() => changeFont(dir)}
                  aria-label={`${dir === "up" ? "Increase" : dir === "down" ? "Decrease" : "Reset"} text size`}
                  className="w-7 h-6 flex items-center justify-center text-xs font-bold text-[#555] hover:bg-[#ff9f08] hover:text-white transition-colors border-r border-[#ccc] last:border-r-0"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Dark mode */}
            <button
              onClick={toggleDark}
              aria-label="Toggle dark/light mode"
              className="flex items-center gap-1 h-6 border border-[#ccc] rounded text-xs text-[#555] hover:bg-[#ff9f08] hover:text-white hover:border-[#ff9f08] transition-colors"
              style={{ paddingLeft: 8, paddingRight: 8 }}
            >
              {dark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
              {dark ? "Light" : "Dark"}
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle site search"
              aria-expanded={searchOpen}
              className="flex items-center gap-1 h-6 border border-[#ccc] rounded text-xs text-[#555] hover:bg-[#ff9f08] hover:text-white hover:border-[#ff9f08] transition-colors"
              style={{ paddingLeft: 8, paddingRight: 8 }}
            >
              <Search className="w-3 h-3" />
              Search
            </button>
          </div>
        </div>

        {/* Inline search panel */}
        {searchOpen && (
          <div className="border-t border-[#d0d0d0] bg-white" style={{ paddingTop: 8, paddingBottom: 8 }}>
            <div className="w-full lg:max-w-[1320px] xl:max-w-[1440px] flex gap-2" style={{ margin: "0 auto", paddingLeft: 16, paddingRight: 16 }}>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the portal..."
                autoFocus
                className="flex-1 border border-[#ccc] text-sm focus:outline-none focus:border-[#ff9f08] transition-colors"
                style={{ padding: "6px 12px" }}
              />
              <button
                className="text-sm font-semibold text-white transition-colors"
                style={{ background: "#ff9f08", padding: "6px 16px" }}
              >
                Go
              </button>
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="w-8 flex items-center justify-center text-[#888] hover:text-[#333] border border-[#ddd]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Main header ── */}
      <header className="bg-white border-b border-[#e0e0e0] shadow-[0_1px_4px_rgba(0,0,0,0.06)]" role="banner">
        <div className="w-full lg:max-w-[1320px] xl:max-w-[1440px] flex items-center gap-6" style={{ margin: "0 auto", paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16 }}>
          {/* State Emblem */}
          <div className="flex-shrink-0">
            <StateEmblem />
          </div>

          {/* Divider */}
          <div className="w-px h-14 bg-[#ddd] flex-shrink-0 hidden sm:block" aria-hidden="true" />

          {/* Institution identity */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#888] uppercase tracking-wider leading-none" style={{ marginBottom: 6 }}>
              Ministry of Education &nbsp;·&nbsp; Government of India &nbsp;·&nbsp; Digital India
            </p>
            <h1 className="text-lg sm:text-2xl font-extrabold leading-tight" style={{ color: "#730068" }}>
              National Digital Library Portal
            </h1>
            <p className="text-sm text-[#555] font-medium leading-none" style={{ marginTop: 4 }}>
              राष्ट्रीय डिजिटल पुस्तकालय पोर्टल
            </p>
          </div>

          {/* Right side: social + contact */}
          <div className="hidden lg:flex flex-col items-end gap-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              {[
                { label: "Facebook", d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", fill: true },
                { label: "Twitter/X", d: "M4 4l16 16M4 20L20 4", fill: false },
                { label: "YouTube", d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z", fill: true },
                { label: "Instagram", d: "M2 2h20v20H2zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0z", fill: true },
              ].map(({ label, d, fill }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-7 h-7 border border-[#ddd] flex items-center justify-center text-[#666] hover:border-[#ff9f08] hover:text-[#ff9f08] transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"} strokeWidth="2" strokeLinecap="round">
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-5 text-xs text-[#666]">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Phone className="w-3 h-3 text-[#ff9f08] flex-shrink-0" />
                1800-XXX-XXXX (Toll Free)
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Mail className="w-3 h-3 text-[#ff9f08] flex-shrink-0" />
                library@ndlp.gov.in
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

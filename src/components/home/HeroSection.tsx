"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, LogIn, Search } from "lucide-react";

const SLIDES = [
  {
    tag: "Government of India Initiative",
    title: "National Digital Library Portal",
    subtitle: "Secure, verified access to 2.5 million books, research papers, journals and more — for every student, teacher and researcher across India.",
    gradient: ["#4a0043", "#730068"],
    accent: "#ff9f08",
  },
  {
    tag: "Digital India Mission",
    title: "Empowering Learners Through Digital Access",
    subtitle: "24×7 access to eBooks, thesis repository, question papers, government publications and audio-visual resources — from any device, anywhere.",
    gradient: ["#0f2a5c", "#1a6ebb"],
    accent: "#fea500",
  },
  {
    tag: "Academic Excellence",
    title: "Research Support for India's Scholars",
    subtitle: "Dedicated research assistance, citation management, institutional repository, and curated subject guides — supporting academics at every stage.",
    gradient: ["#1a3a0a", "#3aa04a"],
    accent: "#ff9f08",
  },
  {
    tag: "Inclusive Education",
    title: "Multi-language. Accessible. Inclusive.",
    subtitle: "Available in 13 Indian languages with full WCAG 2.1 AA compliance, high-contrast modes, and screen-reader support.",
    gradient: ["#5a3000", "#c97000"],
    accent: "#ffffff",
  },
];

const QUICK_STATS = [
  { val: "2.5M+", label: "Books & eBooks",   color: "#ff9f08" },
  { val: "180K+", label: "Research Papers",   color: "#3aa04a" },
  { val: "125K+", label: "Active Members",    color: "#1a6ebb" },
  { val: "24×7",  label: "Always Online",     color: "#8224e3" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % SLIDES.length);
        setAnimating(false);
      }, 300);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    setAnimating(true);
    setTimeout(() => { setCurrent(i); setAnimating(false); }, 200);
  };

  const slide = SLIDES[current];
  const [from, to] = slide.gradient;

  return (
    <section
      aria-label="Hero banner"
      style={{
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
        transition: "background 0.8s ease",
        minHeight: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Subtle dot pattern overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Left tricolor rail */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: 6,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, background: "#FF9933" }} />
        <div style={{ flex: 1, background: "#ffffff" }} />
        <div style={{ flex: 1, background: "#138808" }} />
      </div>

      {/* Centered content — inline padding ensures cascade safety */}
      <div
        style={{
          maxWidth: 960,
          width: "100%",
          margin: "0 auto",
          padding: "56px 32px 72px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(10px)" : "translateY(0)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Eyebrow tag */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <span style={{ height: 1, width: 40, flexShrink: 0, background: slide.accent }} aria-hidden="true" />
            <span style={{ color: slide.accent, fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase" }}>
              {slide.tag}
            </span>
            <span style={{ height: 1, width: 40, flexShrink: 0, background: slide.accent }} aria-hidden="true" />
          </div>

          {/* Main heading */}
          <h2
            style={{
              fontWeight: 800,
              color: "#fff",
              marginBottom: 20,
              lineHeight: 1.15,
              fontSize: "clamp(1.875rem, 4.5vw, 3.25rem)",
            }}
          >
            {slide.title}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 680,
              fontSize: "clamp(0.9375rem, 1.4vw, 1.0625rem)",
            }}
          >
            {slide.subtitle}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: 40,
            }}
          >
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "#ff9f08", color: "#fff", padding: "12px 28px" }}
            >
              <BookOpen className="w-4 h-4" />
              Browse Library
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.4)", color: "#fff", padding: "12px 28px" }}
            >
              <LogIn className="w-4 h-4" />
              Member Login
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:text-white"
              style={{ color: "rgba(255,255,255,0.65)", padding: "12px 28px" }}
            >
              <Search className="w-4 h-4" />
              Search Resources
            </Link>
          </div>

          {/* Quick-stat tiles */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4"
            style={{ gap: 12, width: "100%", maxWidth: 800 }}
          >
            {QUICK_STATS.map((s) => (
              <div
                key={s.label}
                className="hover:-translate-y-0.5 transition-transform cursor-default"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 16px",
                  background: "rgba(255,255,255,0.09)",
                  borderTop: `3px solid ${s.color}`,
                  backdropFilter: "blur(8px)",
                }}
              >
                <span style={{ fontSize: 24, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{s.val}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 8, lineHeight: 1.3, textAlign: "center" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prev / Next controls */}
      <button
        onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white transition-all hover:scale-110"
        style={{ background: "rgba(0,0,0,0.35)" }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => goTo((current + 1) % SLIDES.length)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white transition-all hover:scale-110"
        style={{ background: "rgba(0,0,0,0.35)" }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide dots */}
      <div
        role="tablist"
        aria-label="Slides"
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="transition-all"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? "#ff9f08" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
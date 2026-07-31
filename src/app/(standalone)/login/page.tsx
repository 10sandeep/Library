"use client";
import { useState } from "react";
import Link from "next/link";
import {
  BookOpen, Eye, EyeOff, LogIn, User, Lock, ArrowLeft,
  Shield, ShieldCheck, FileText, Globe, Smartphone, BadgeCheck,
} from "lucide-react";

const r3 = (n: number) => Math.round(n * 1000) / 1000;

function AshokChakra({ size = 80, opacity = 0.12 }: { size?: number; opacity?: number }) {
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const rad = (i * 15 * Math.PI) / 180;
    const cx = size / 2, cy = size / 2;
    const r1 = size * 0.2, r2 = size * 0.44;
    return (
      <line key={i}
        x1={r3(cx + Math.cos(rad) * r1)} y1={r3(cy + Math.sin(rad) * r1)}
        x2={r3(cx + Math.cos(rad) * r2)} y2={r3(cy + Math.sin(rad) * r2)}
        stroke="white" strokeWidth="0.9" />
    );
  });
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ opacity }} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={size * 0.46} fill="none" stroke="white" strokeWidth="1.5" />
      <circle cx={size / 2} cy={size / 2} r={size * 0.14} fill="none" stroke="white" strokeWidth="1.2" />
      {spokes}
    </svg>
  );
}

const STATS = [
  { val: "2.5M+", label: "Books",           Icon: BookOpen,   color: "#ff9f08" },
  { val: "180K+", label: "Research Papers",  Icon: FileText,   color: "#3aa04a" },
  { val: "13",    label: "Languages",        Icon: Globe,      color: "#1a6ebb" },
  { val: "24×7",  label: "Online Access",    Icon: Smartphone, color: "#8224e3" },
];

export default function LoginPage() {
  const [show,    setShow]    = useState(false);
  const [tab,     setTab]     = useState<"member" | "admin">("member");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex" }} aria-label="Login — National Digital Library Portal">

      {/* ════════════════════════════════════════
          LEFT  —  hero panel, 40% on lg+
      ════════════════════════════════════════ */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0"
        style={{
          width: "40%",
          background: "linear-gradient(158deg,#3a0034 0%,#730068 52%,#8f2a88 100%)",
          position: "relative",
          overflow: "hidden",
        }}
        aria-label="Portal overview"
      >
        {/* Decorative bg */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
          <div style={{
            position: "absolute", top: -80, right: -80,
            width: 360, height: 360, borderRadius: "50%",
            background: "radial-gradient(circle,rgba(255,159,8,0.18),transparent 65%)",
          }} />
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.045 }}>
            <defs>
              <pattern id="lp-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lp-dots)" />
          </svg>
          <div style={{ position: "absolute", bottom: -20, right: -20, opacity: 0.06 }}>
            <AshokChakra size={220} opacity={1} />
          </div>
        </div>

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column",
          height: "100%",
          padding: "40px",
        }}>

          {/* Brand */}
          <Link href="/" aria-label="Return to home"
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, flexShrink: 0 }}>
            <div style={{
              width: 40, height: 40, background: "#ff9f08",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <BookOpen style={{ width: 20, height: 20, color: "#fff" }} aria-hidden="true" />
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>National Digital Library</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 3, letterSpacing: "0.1em", textTransform: "uppercase" }}>Government of India</div>
            </div>
          </Link>

          {/* Middle — heading at top, stats at bottom */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

            {/* Copy */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
                Secure Member Portal
              </p>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", lineHeight: 1.25, marginBottom: 16 }}>
                Your gateway to{" "}
                <span style={{ color: "#ff9f08" }}>India&apos;s knowledge</span>{" "}
                ecosystem
              </h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 0 }}>
                Secure, certified access to millions of curated digital resources for students, researchers, and educators across India.
              </p>
            </div>

            {/* Stats + badges */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {STATS.map(({ val, label, Icon, color }) => (
                  <div key={label} style={{
                    padding: "12px 14px",
                    background: "rgba(255,255,255,0.08)",
                    borderLeft: `3px solid ${color}`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <Icon style={{ width: 13, height: 13, color, flexShrink: 0 }} aria-hidden="true" />
                      <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{val}</span>
                    </div>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{label}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { Icon: ShieldCheck, label: "SSL Secured" },
                  { Icon: BadgeCheck,  label: "NIC Certified" },
                ].map(({ Icon, label }) => (
                  <div key={label} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 10px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 500,
                  }}>
                    <Icon style={{ width: 12, height: 12, color: "#5fdd73" }} aria-hidden="true" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div style={{
            flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between",
            marginTop: 32, paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", lineHeight: 1.6 }}>
              © 2026 Government of India<br />Ministry of Education · NIC
            </p>
            <AshokChakra size={36} opacity={0.22} />
          </div>

        </div>

        {/* Tricolor */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(to right,#FF9933 33.33%,#fff 33.33%,#fff 66.66%,#138808 66.66%)",
        }} aria-hidden="true" />
      </aside>

      {/* ════════════════════════════════════════
          RIGHT  —  login panel
      ════════════════════════════════════════ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", minWidth: 0 }}>

        {/* Top bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 32px",
          background: "#fff", borderBottom: "1px solid #ebebeb",
          flexShrink: 0,
        }}>
          <Link href="/"
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#ff6600] transition-colors"
                style={{ color: "#555" }}>
            <ArrowLeft style={{ width: 16, height: 16 }} aria-hidden="true" />
            Back to Portal
          </Link>
          <div className="hidden sm:flex items-center gap-2" style={{ fontSize: 11, color: "#bbb" }}>
            <Shield style={{ width: 14, height: 14, color: "#3aa04a" }} aria-hidden="true" />
            National Digital Library · Government of India
          </div>
        </div>

        {/* Form area — scrollable, content near top with padding */}
        <div style={{
          flex: 1, overflowY: "auto",
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "40px 16px 48px",
        }}>
          <div style={{ width: "100%", maxWidth: 420 }}>

            {/* Mobile brand */}
            <div className="flex lg:hidden items-center justify-center gap-3" style={{ marginBottom: 24 }}>
              <div style={{ width: 36, height: 36, background: "#730068", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <BookOpen style={{ width: 16, height: 16, color: "#fff" }} aria-hidden="true" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>National Digital Library</div>
                <div style={{ fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em" }}>Government of India</div>
              </div>
            </div>

            {/* Official badge */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 11, fontWeight: 600, color: "#138808",
                background: "rgba(19,136,8,0.07)", border: "1px solid rgba(19,136,8,0.2)",
                padding: "5px 12px",
              }}>
                <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#138808", flexShrink: 0 }} aria-hidden="true" />
                Official Government of India Portal
              </span>
            </div>

            {/* LOGIN CARD */}
            <div role="region" aria-label="Login form" style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.08)",
            }}>
              {/* Accent stripe */}
              <div style={{ height: 3, background: "linear-gradient(to right,#ff9f08,#ff6600)" }} aria-hidden="true" />

              <div style={{ padding: 32 }}>

                {/* Tabs */}
                <div role="tablist" aria-label="Select login type" style={{
                  display: "flex", border: "1px solid #e4e4e4", background: "#f8f8f8", marginBottom: 28,
                }}>
                  {(["member", "admin"] as const).map((t) => (
                    <button key={t}
                      id={`tab-${t}`} role="tab"
                      aria-selected={tab === t} aria-controls={`panel-${t}`}
                      onClick={() => setTab(t)}
                      style={{
                        flex: 1, padding: "10px 0", fontSize: 13, fontWeight: 600,
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                        border: "none", cursor: "pointer", transition: "background 0.15s, color 0.15s",
                        background: tab === t ? "#730068" : "transparent",
                        color: tab === t ? "#fff" : "#a0a0a0",
                      }}>
                      {t === "admin"
                        ? <Shield style={{ width: 14, height: 14, flexShrink: 0 }} aria-hidden="true" />
                        : <User   style={{ width: 14, height: 14, flexShrink: 0 }} aria-hidden="true" />}
                      {t === "member" ? "Member Login" : "Admin Login"}
                    </button>
                  ))}
                </div>

                {/* Panel */}
                <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>

                  {/* Heading */}
                  <div style={{ marginBottom: 24 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 6, lineHeight: 1.25 }}>
                      {tab === "member" ? "Sign in to your account" : "Administrator Access"}
                    </h2>
                    <p style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>
                      {tab === "member"
                        ? "Enter your credentials to access the library portal."
                        : "Restricted area — authorised personnel only."}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    {/* User ID */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label htmlFor="userid" style={{ fontSize: 12, fontWeight: 600, color: "#666", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {tab === "member" ? "Member ID / Roll Number" : "Admin Username"}
                      </label>
                      <div style={{ position: "relative" }}>
                        <User style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#c8c8c8", pointerEvents: "none" }} aria-hidden="true" />
                        <input id="userid" name="userid" type="text"
                          autoComplete={tab === "member" ? "username" : "off"}
                          placeholder={tab === "member" ? "e.g. LIB2025001" : "admin.username"}
                          required
                          style={{
                            width: "100%", boxSizing: "border-box",
                            paddingLeft: 38, paddingRight: 14, paddingTop: 11, paddingBottom: 11,
                            fontSize: 14, color: "#1a1a1a",
                            background: "#f9f9f9", border: "1px solid #ddd", outline: "none",
                            transition: "border-color 0.15s, box-shadow 0.15s, background 0.15s",
                          }}
                          onFocus={(e) => { e.target.style.background = "#fff"; e.target.style.borderColor = "#ff9f08"; e.target.style.boxShadow = "0 0 0 3px rgba(255,159,8,0.10)"; }}
                          onBlur={(e)  => { e.target.style.background = "#f9f9f9"; e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <label htmlFor="password" style={{ fontSize: 12, fontWeight: 600, color: "#666", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          Password
                        </label>
                        {tab === "member" && (
                          <Link href="#" className="text-xs font-semibold hover:underline" style={{ color: "#ff6600" }}>
                            Forgot password?
                          </Link>
                        )}
                      </div>
                      <div style={{ position: "relative" }}>
                        <Lock style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#c8c8c8", pointerEvents: "none" }} aria-hidden="true" />
                        <input id="password" name="password" type={show ? "text" : "password"}
                          autoComplete={tab === "member" ? "current-password" : "off"}
                          placeholder="Enter your password"
                          required
                          style={{
                            width: "100%", boxSizing: "border-box",
                            paddingLeft: 38, paddingRight: 40, paddingTop: 11, paddingBottom: 11,
                            fontSize: 14, color: "#1a1a1a",
                            background: "#f9f9f9", border: "1px solid #ddd", outline: "none",
                            transition: "border-color 0.15s, box-shadow 0.15s, background 0.15s",
                          }}
                          onFocus={(e) => { e.target.style.background = "#fff"; e.target.style.borderColor = "#ff9f08"; e.target.style.boxShadow = "0 0 0 3px rgba(255,159,8,0.10)"; }}
                          onBlur={(e)  => { e.target.style.background = "#f9f9f9"; e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                        />
                        <button type="button" onClick={() => setShow(!show)}
                          aria-label={show ? "Hide password" : "Show password"}
                          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#c0c0c0", padding: 0, display: "flex" }}
                          onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = "#666"}
                          onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = "#c0c0c0"}>
                          {show ? <EyeOff style={{ width: 16, height: 16 }} aria-hidden="true" /> : <Eye style={{ width: 16, height: 16 }} aria-hidden="true" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember me */}
                    {tab === "member" && (
                      <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}>
                        <input type="checkbox" name="remember" style={{ width: 15, height: 15, accentColor: "#730068", flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#555" }}>Keep me signed in for 30 days</span>
                      </label>
                    )}

                    {/* Submit */}
                    <button type="submit" disabled={loading} aria-busy={loading}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        padding: "13px 0", fontSize: 14, fontWeight: 600, color: "#fff",
                        border: "none", cursor: loading ? "not-allowed" : "pointer",
                        background: loading ? "#ccc" : "linear-gradient(90deg,#ff9f08,#ff6600)",
                        boxShadow: loading ? "none" : "0 4px 14px rgba(255,100,0,0.28)",
                        transition: "box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(255,100,0,0.40)"; }}
                      onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 14px rgba(255,100,0,0.28)"; }}>
                      {loading ? (
                        <>
                          <span className="animate-spin" style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", flexShrink: 0 }} aria-hidden="true" />
                          Signing in…
                        </>
                      ) : (
                        <>
                          <LogIn style={{ width: 16, height: 16, flexShrink: 0 }} aria-hidden="true" />
                          Sign In Securely
                        </>
                      )}
                    </button>
                  </form>

                  {/* Register */}
                  {tab === "member" && (
                    <p style={{ textAlign: "center", fontSize: 13, color: "#aaa", marginTop: 20 }}>
                      Not yet a member?{" "}
                      <Link href="/contact" className="font-semibold hover:underline" style={{ color: "#ff6600" }}>
                        Register now
                      </Link>
                    </p>
                  )}

                  {/* Security notices */}
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #f0f0f0", display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#aaa" }}>
                      <ShieldCheck style={{ width: 14, height: 14, flexShrink: 0, marginTop: 1, color: "#3aa04a" }} aria-hidden="true" />
                      256-bit SSL encryption · All sessions are monitored
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#aaa" }}>
                      <Lock style={{ width: 14, height: 14, flexShrink: 0, marginTop: 1, color: "#730068" }} aria-hidden="true" />
                      IT Act 2000 compliant · Unauthorized access is a criminal offence
                    </div>
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div style={{
                padding: "12px 32px", background: "#fafafa", borderTop: "1px solid #f0f0f0",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <Shield style={{ width: 14, height: 14, flexShrink: 0, color: "#3aa04a" }} aria-hidden="true" />
                <p style={{ fontSize: 11, color: "#bbb", lineHeight: 1.5 }}>
                  Secure Government of India portal. All access is logged per IT Act 2000.
                </p>
              </div>
            </div>

            {/* Gov badges */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16 }}>
              {["🇮🇳 Govt of India", "Digital India", "NIC Certified", "SSL Protected"].map((b) => (
                <span key={b} style={{ fontSize: 11, color: "#bbb", border: "1px solid #e4e4e4", background: "#fafafa", padding: "4px 10px", fontWeight: 500 }}>
                  {b}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

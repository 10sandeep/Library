"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, LogIn } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

const NAV_BG    = "#ff9f08";
const NAV_HOVER = "#e68900";
const NAV_ACTIVE= "#c97000";
const SUB_BG    = "#464141";
const SUB_HOVER = "#333333";

export default function Navigation() {
  const pathname    = usePathname();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu,   setOpenMenu]   = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenMenu(null); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openSub = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const closeSub = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        id="main-nav"
        role="navigation"
        aria-label="Main navigation"
        className="sticky top-0 z-50"
        style={{
          background: NAV_BG,
          boxShadow: scrolled ? "0 3px 16px rgba(0,0,0,0.22)" : "none",
          transition: "box-shadow 0.2s ease",
        }}
      >
        {/* h-[52px] = 48px grid anchor + 4px breathing space. px-4 sm:px-6 = responsive gutter. */}
        <div className="w-full mx-auto px-4 sm:px-6 lg:max-w-[1320px] xl:max-w-[1440px] flex items-stretch h-[52px]">
          {/* Desktop items — flex-shrink-0 on each item keeps them at natural width; no overflow-hidden so dropdowns aren't clipped */}
          <div className="hidden lg:flex items-stretch flex-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative flex items-stretch flex-shrink-0"
                onMouseEnter={() => link.children && openSub(link.label)}
                onMouseLeave={() => link.children && closeSub()}
              >
                {link.children ? (
                  <>
                    <button
                      onFocus={() => openSub(link.label)}
                      onBlur={closeSub}
                      aria-expanded={openMenu === link.label}
                      aria-haspopup="true"
                      className="flex items-center gap-1 px-4 h-full text-[13px] font-semibold border-r border-white/20 whitespace-nowrap"
                      style={{
                        color: "#fff",
                        backgroundColor: isActive(link.href) ? NAV_ACTIVE : "transparent",
                        borderBottom: isActive(link.href) ? "2px solid rgba(255,255,255,0.75)" : "2px solid transparent",
                        transition: "background-color 150ms ease",
                      }}
                      onMouseEnter={(e) => { if (!isActive(link.href)) e.currentTarget.style.backgroundColor = NAV_HOVER; }}
                      onMouseLeave={(e) => { if (!isActive(link.href)) e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      {link.label}
                      <ChevronDown
                        className="w-3 h-3 flex-shrink-0 transition-transform"
                        style={{ transform: openMenu === link.label ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>

                    {/* Dropdown */}
                    <div
                      onMouseEnter={() => openSub(link.label)}
                      onMouseLeave={closeSub}
                      className="absolute top-full left-0 z-50 min-w-[200px] transition-all duration-150 origin-top"
                      style={{
                        background: SUB_BG,
                        boxShadow: "0 6px 20px rgba(0,0,0,0.28)",
                        opacity: openMenu === link.label ? 1 : 0,
                        transform: openMenu === link.label ? "scaleY(1)" : "scaleY(0.92)",
                        pointerEvents: openMenu === link.label ? "auto" : "none",
                      }}
                    >
                      <div className={link.mega ? "grid grid-cols-2 p-1" : "py-1"} style={link.mega ? { minWidth: 380 } : {}}>
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-[12px] font-medium border-b border-white/8 last:border-b-0 transition-colors"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = SUB_HOVER)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center px-4 h-full text-[13px] font-semibold border-r border-white/20 whitespace-nowrap"
                    style={{
                      color: "#fff",
                      backgroundColor: isActive(link.href) ? NAV_ACTIVE : "transparent",
                      borderBottom: isActive(link.href) ? "2px solid rgba(255,255,255,0.75)" : "2px solid transparent",
                      transition: "background-color 150ms ease",
                    }}
                    onMouseEnter={(e) => { if (!isActive(link.href)) (e.currentTarget as HTMLAnchorElement).style.backgroundColor = NAV_HOVER; }}
                    onMouseLeave={(e) => { if (!isActive(link.href)) (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; }}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Login */}
          <div className="hidden lg:flex items-center ml-auto flex-shrink-0">
            <Link
              href="/login"
              className="flex items-center gap-1.5 font-bold text-[12px] px-6 h-full border-l border-white/25 whitespace-nowrap"
              style={{ color: "#ff9f08", backgroundColor: "#fff", transition: "background-color 150ms ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#fff8ec"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#fff"; }}
            >
              <LogIn className="w-3.5 h-3.5" />
              Member Login
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 ml-auto text-white self-center flex-shrink-0"
            style={{ background: "rgba(0,0,0,0.20)", borderRadius: 4 }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          className="fixed inset-0 z-[9999] overflow-y-auto flex flex-col"
          style={{ background: NAV_BG }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/20">
            <span className="text-white font-extrabold text-sm">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-white"
              style={{ background: "rgba(0,0,0,0.20)", borderRadius: 4 }}
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block px-5 py-3 text-white font-semibold text-sm border-b border-white/15"
                  style={{ background: isActive(link.href) ? NAV_ACTIVE : "transparent" }}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div style={{ background: SUB_BG }}>
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-7 py-2.5 text-[12px] font-medium border-b border-white/8"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-white/20">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 bg-white font-bold py-3 text-sm w-full"
              style={{ color: "#ff9f08" }}
            >
              <LogIn className="w-4 h-4" />
              Member Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

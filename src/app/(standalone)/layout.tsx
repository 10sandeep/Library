// Standalone pages (login, admin) — no site header or footer
export default function StandaloneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

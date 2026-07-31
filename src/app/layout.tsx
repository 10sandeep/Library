import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "National Digital Library Portal — Government of India",
  description:
    "Providing secure access to digital learning resources — books, journals, research papers, and more — for students, teachers, researchers, and staff across India.",
  keywords:
    "digital library, national library, government library, eBooks, research papers, India, university library",
  openGraph: {
    title: "National Digital Library Portal",
    description: "Government of India — Digital Learning Resource Hub",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

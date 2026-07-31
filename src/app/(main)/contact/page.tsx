import ContactSection from "@/components/home/ContactSection";
import Link from "next/link";

export const metadata = {
  title: "Contact Us — National Digital Library",
  description: "Get in touch with the library team for queries, research assistance, and support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ background: "#ededed" }}>
      <div className="py-12" style={{ background: "#730068" }}>
        <div className="w-full mx-auto px-4 sm:px-6 lg:max-w-[1320px] xl:max-w-[1440px]">
          <div className="text-white/50 text-xs mb-2 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Contact Us</h1>
          <p className="text-white/60 text-sm max-w-xl">
            Have a question, feedback, or need research assistance? Our team is here to help.
          </p>
        </div>
      </div>
      <ContactSection />
    </main>
  );
}

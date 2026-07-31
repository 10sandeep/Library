import ContactSection from "@/components/home/ContactSection";
import Link from "next/link";

export const metadata = {
  title: "Contact Us — National Digital Library",
  description: "Get in touch with the library team for queries, research assistance, and support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ background: "#ededed" }}>
      <div style={{ background: "#730068", paddingTop: 48, paddingBottom: 48 }}>
        <div className="w-full lg:max-w-[1320px] xl:max-w-[1440px]" style={{ margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
          <div className="text-white/50 text-xs flex items-center gap-2" style={{ marginBottom: 8 }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white" style={{ marginBottom: 8 }}>Contact Us</h1>
          <p className="text-white/60 text-sm max-w-xl">
            Have a question, feedback, or need research assistance? Our team is here to help.
          </p>
        </div>
      </div>
      <ContactSection />
    </main>
  );
}

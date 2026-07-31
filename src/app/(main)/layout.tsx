import GovHeader from "@/components/layout/GovHeader";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Tricolor bar — top of every public page */}
      <div
        className="h-[5px] w-full flex-shrink-0"
        style={{ background: "linear-gradient(to right, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)" }}
        aria-hidden="true"
      />
      <GovHeader />
      <Navigation />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

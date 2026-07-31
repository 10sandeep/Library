import type { Metadata } from "next";
import AnnouncementTicker from "@/components/home/AnnouncementTicker";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ResourcesSection from "@/components/home/ResourcesSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import SearchSection from "@/components/home/SearchSection";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import ResearchSection from "@/components/home/ResearchSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import MobileAppSection from "@/components/home/MobileAppSection";
import ContactSection from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "National Digital Library Portal — Government of India",
  description:
    "Providing secure access to digital learning resources — books, journals, research papers, and more — for students, teachers, researchers, and staff across India.",
};

export default function HomePage() {
  return (
    <>
      <AnnouncementTicker />
      <HeroSection />
      <StatsSection />
      <ResourcesSection />
      <ServicesSection />
      <FeaturedSection />
      <SearchSection />
      <DepartmentsSection />
      <AnnouncementsSection />
      <ResearchSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <MobileAppSection />
      <ContactSection />
    </>
  );
}

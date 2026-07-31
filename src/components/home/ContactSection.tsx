"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const INFO_COLORS = ["#1a6ebb", "#3aa04a", "#ff9f08", "#8224e3"];

import LayoutContainer from "@/components/ui/LayoutContainer";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section style={{ background: "#e5e5e5", paddingTop: 64, paddingBottom: 64 }} aria-labelledby="contact-title">
      <LayoutContainer>
        <SectionHeader
          eyebrow="Get in Touch"
          title="Contact the Library"
          description="Have a question, feedback, or need research assistance? Our team is here to help."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-[#f5f5f5] border border-[#d6d6d6]" style={{ borderTop: "8px solid #ff9f08" }}>
            <div style={{ padding: 24 }}>
              <h3 className="text-base font-bold text-[#333]" style={{ marginBottom: 20 }}>Send a Message</h3>
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-3" style={{ paddingTop: 48, paddingBottom: 48 }}>
                  <div className="w-14 h-14 flex items-center justify-center" style={{ background: "#3aa04a18" }}>
                    <Send className="w-7 h-7" style={{ color: "#3aa04a" }} />
                  </div>
                  <p className="font-bold text-[#333]">Message Sent!</p>
                  <p className="text-sm text-[#666] text-center">We'll get back to you within 2 working days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "name", label: "Full Name", type: "text", placeholder: "Your full name", required: true },
                      { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com", required: true },
                      { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
                      { id: "dept", label: "Department", type: "text", placeholder: "Your department / faculty" },
                    ].map((f) => (
                      <div key={f.id} className="flex flex-col" style={{ gap: 6 }}>
                        <label htmlFor={f.id} className="text-xs font-bold text-[#888] uppercase tracking-wider">
                          {f.label} {f.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          id={f.id}
                          type={f.type}
                          placeholder={f.placeholder}
                          required={f.required}
                          className="bg-white border border-[#ccc] text-sm text-[#333] placeholder-[#bbb] focus:outline-none focus:border-[#ff9f08] transition-colors"
                          style={{ padding: "10px 12px" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col" style={{ gap: 6 }}>
                    <label htmlFor="subject" className="text-xs font-bold text-[#888] uppercase tracking-wider">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      required
                      className="bg-white border border-[#ccc] text-sm text-[#333] focus:outline-none focus:border-[#ff9f08] transition-colors"
                      style={{ padding: "10px 12px" }}
                    >
                      <option value="">Select a subject</option>
                      {["General Inquiry", "Membership", "Technical Support", "Resource Request", "Research Assistance", "Feedback", "Complaint"].map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col" style={{ gap: 6 }}>
                    <label htmlFor="message" className="text-xs font-bold text-[#888] uppercase tracking-wider">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Describe your query in detail..."
                      className="bg-white border border-[#ccc] text-sm text-[#333] placeholder-[#bbb] focus:outline-none focus:border-[#ff9f08] transition-colors resize-none"
                      style={{ padding: "10px 12px" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 text-white font-bold text-sm transition-all hover:-translate-y-0.5"
                    style={{ background: "#ff9f08", padding: "12px 24px" }}
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3">
            {[
              { icon: MapPin, label: "Address", value: "Central Library Building, University Campus, New Delhi — 110001", color: INFO_COLORS[0] },
              { icon: Phone, label: "Phone", value: "1800-XXX-XXXX (Toll Free)\n+91-11-XXXX-XXXX (Direct)", color: INFO_COLORS[1] },
              { icon: Mail, label: "Email", value: "library@university.gov.in\nresearch@library.gov.in", color: INFO_COLORS[2] },
              { icon: Clock, label: "Working Hours", value: "Monday–Friday: 8:00 AM – 9:00 PM\nSaturday: 9:00 AM – 5:00 PM\nSunday: Closed (Digital Access 24×7)", color: INFO_COLORS[3] },
            ].map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.label} className="flex items-start bg-[#f5f5f5] border border-[#d6d6d6]" style={{ gap: 16, padding: 16 }}>
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: `${info.color}18` }}>
                    <Icon className="w-5 h-5" style={{ color: info.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#888] uppercase tracking-wider" style={{ marginBottom: 4 }}>{info.label}</div>
                    <p className="text-sm text-[#333] whitespace-pre-line leading-relaxed">{info.value}</p>
                  </div>
                </div>
              );
            })}

            {/* Map placeholder */}
            <div className="bg-[#f5f5f5] border border-[#d6d6d6] h-36 flex flex-col items-center justify-center gap-2 text-[#aaa]">
              <MapPin className="w-7 h-7 opacity-40" />
              <span className="text-sm font-semibold">Interactive Map</span>
              <span className="text-xs opacity-70">University Campus, New Delhi</span>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

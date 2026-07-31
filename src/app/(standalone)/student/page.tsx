"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, LogOut, User, BookMarked, Search, X, FileText, ChevronRight } from "lucide-react";
import { getStudentSession, clearStudentSession, type Student } from "@/lib/studentAuth";
import { getBooksForClass, type Book } from "@/lib/bookStore";

const SUBJECTS = ["All Subjects", "Mathematics", "Science", "Physics", "Chemistry", "Biology", "English", "Social Science", "Computer Science", "General Knowledge"];

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [subject, setSubject] = useState("All Subjects");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Book | null>(null);

  useEffect(() => {
    const s = getStudentSession();
    if (!s) { router.replace("/login"); return; }
    setStudent(s);
    setBooks(getBooksForClass(s.className));
  }, [router]);

  const logout = () => {
    clearStudentSession();
    router.replace("/login");
  };

  const filtered = books.filter(b =>
    (subject === "All Subjects" || b.subject === subject) &&
    (query === "" || b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()))
  );

  if (!student) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#ededed", display: "flex", flexDirection: "column" }}>

      {/* Top header */}
      <header style={{ background: "#730068", flexShrink: 0 }}>
        {/* Tricolor bar */}
        <div style={{ height: 3, background: "linear-gradient(to right,#FF9933 33.33%,#fff 33.33%,#fff 66.66%,#138808 66.66%)" }} aria-hidden="true" />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: "#ff9f08", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <BookOpen style={{ width: 18, height: 18, color: "#fff" }} />
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>National Digital Library</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Student Portal</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", padding: "8px 14px" }}>
              <div style={{ width: 28, height: 28, background: "#ff9f08", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <User style={{ width: 14, height: 14, color: "#fff" }} />
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 13, lineHeight: 1.2 }}>{student.name}</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11 }}>Class {student.className} · Sec {student.section} · Roll {student.rollNo}</div>
              </div>
            </div>
            <button
              onClick={logout}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, padding: "8px 14px" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            >
              <LogOut style={{ width: 14, height: 14 }} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ flex: 1, padding: 24 }} id="main-content">

        {/* Welcome banner */}
        <div style={{ background: "linear-gradient(135deg,#5a0050,#730068)", marginBottom: 24, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Welcome back</div>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 800, lineHeight: 1.2 }}>{student.name}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 4 }}>
              Class {student.className} — Section {student.section} &nbsp;·&nbsp; Roll No: {student.rollNo}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ background: "rgba(255,255,255,0.1)", padding: "12px 20px", textAlign: "center" }}>
              <div style={{ color: "#ff9f08", fontSize: 22, fontWeight: 800 }}>{books.length}</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>Books Available</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.1)", padding: "12px 20px", textAlign: "center" }}>
              <div style={{ color: "#ff9f08", fontSize: 22, fontWeight: 800 }}>{filtered.length}</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>Showing Now</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 20 }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 240px" }}>
            <Search style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "#bbb" }} />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search books or authors..."
              style={{ width: "100%", boxSizing: "border-box", paddingLeft: 32, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: "1px solid #d6d6d6", background: "#fff", fontSize: 13, color: "#333", outline: "none" }}
            />
          </div>
          {/* Subject filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {SUBJECTS.map(s => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                style={{
                  fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                  padding: "5px 12px",
                  ...(subject === s
                    ? { background: "#730068", borderColor: "#730068", color: "#fff" }
                    : { background: "#fff", borderColor: "#ccc", color: "#555" })
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Books grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px", color: "#888" }}>
            <BookOpen style={{ width: 40, height: 40, margin: "0 auto 12px", opacity: 0.3 }} />
            <p style={{ fontSize: 15, fontWeight: 600 }}>No books found</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {filtered.map(book => (
              <div
                key={book.id}
                style={{ background: "#f5f5f5", border: "1px solid #d6d6d6", borderTop: `8px solid ${book.coverColor}`, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
                onClick={() => setSelected(book)}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
              >
                {/* Cover */}
                <div style={{ height: 120, background: book.coverColor + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 60, height: 80, background: book.coverColor, display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
                    <BookMarked style={{ width: 28, height: 28, color: "rgba(255,255,255,0.9)" }} />
                  </div>
                </div>
                {/* Info */}
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: book.coverColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{book.subject}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#222", lineHeight: 1.3, marginBottom: 4 }}>{book.title}</div>
                  <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>{book.author}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, background: book.coverColor + "18", color: book.coverColor, fontWeight: 700, padding: "2px 8px" }}>
                      {book.className === "All" ? "All Classes" : `Class ${book.className}`}
                    </span>
                    <span style={{ fontSize: 11, color: "#aaa" }}>{book.totalPages} pages</span>
                  </div>
                </div>
                <div style={{ borderTop: "1px solid #e0e0e0", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#ff6600" }}>Read Now</span>
                  <ChevronRight style={{ width: 14, height: 14, color: "#ff6600" }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Book detail modal */}
      {selected && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{ background: "#fff", width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto", position: "relative" }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ borderTop: `6px solid ${selected.coverColor}` }} />
            <div style={{ padding: 28 }}>
              <button
                onClick={() => setSelected(null)}
                style={{ position: "absolute", top: 16, right: 16, background: "#f5f5f5", border: "none", cursor: "pointer", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}
              >
                <X style={{ width: 14, height: 14 }} />
              </button>
              <div style={{ fontSize: 11, fontWeight: 700, color: selected.coverColor, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{selected.subject}</div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", marginBottom: 6, lineHeight: 1.3 }}>{selected.title}</h2>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>by {selected.author}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                <span style={{ fontSize: 12, fontWeight: 700, background: selected.coverColor + "18", color: selected.coverColor, padding: "3px 10px" }}>
                  {selected.className === "All" ? "All Classes" : `Class ${selected.className}`}
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, background: "#f0f0f0", color: "#555", padding: "3px 10px" }}>
                  {selected.totalPages} pages
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, background: "#f0f0f0", color: "#555", padding: "3px 10px" }}>
                  Added {selected.uploadedAt}
                </span>
              </div>
              <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 24 }}>{selected.description}</p>
              <button
                style={{ width: "100%", background: "linear-gradient(90deg,#ff9f08,#ff6600)", color: "#fff", border: "none", cursor: "pointer", padding: "13px 0", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                <FileText style={{ width: 16, height: 16 }} />
                Open Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen, Users, FileText, Bell, Settings, BarChart3, Shield, LogOut,
  Menu, X, Search, ChevronRight, Trash2, Plus, CheckCircle, Clock,
  AlertCircle, Home, Layers, GraduationCap, Building2, Activity, Lock,
  BookMarked, Upload, UserPlus, Check, XCircle, Save, EyeOff, Eye,
  Info, TrendingUp,
} from "lucide-react";
import { getBooks, addBook, deleteBook, type Book } from "@/lib/bookStore";
import { DEMO_STUDENTS, type Student } from "@/lib/studentAuth";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AuditEntry  { id: string; action: string; detail: string; at: string; }
interface Notif       { id: string; msg: string; type: "info"|"warn"|"ok"; read: boolean; at: string; }
interface Teacher     { id: string; name: string; subject: string; email: string; classes: string; joined: string; }
interface PendingBook { id: string; title: string; author: string; subject: string; className: string; totalPages: number; submittedBy: string; submittedAt: string; }
interface AdminSettings { siteName: string; adminPass: string; allowReg: boolean; emailAlerts: boolean; maintenance: boolean; }

// ─── Storage helpers ──────────────────────────────────────────────────────────
function ls<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
}
function lsSet(key: string, val: unknown) {
  if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(val));
}
function lsInit<T>(key: string, init: T): T {
  if (typeof window === "undefined") return init;
  const raw = localStorage.getItem(key);
  if (raw === null) { localStorage.setItem(key, JSON.stringify(init)); return init; }
  try { return JSON.parse(raw) as T; } catch { return init; }
}

// ─── Audit ────────────────────────────────────────────────────────────────────
function getAudit(): AuditEntry[] { return ls<AuditEntry[]>("ndlp_audit", []); }
function addAudit(action: string, detail: string) {
  const log = getAudit();
  log.unshift({ id: "a" + Date.now(), action, detail, at: new Date().toISOString() });
  lsSet("ndlp_audit", log.slice(0, 200));
}

// ─── Notifications ────────────────────────────────────────────────────────────
const INIT_NOTIFS: Notif[] = [
  { id:"n1", msg:"System backup completed successfully",    type:"ok",   read:false, at: new Date(Date.now()-3600000).toISOString() },
  { id:"n2", msg:"3 books pending content approval",        type:"warn", read:false, at: new Date(Date.now()-7200000).toISOString() },
  { id:"n3", msg:"New student registrations are available", type:"info", read:false, at: new Date(Date.now()-86400000).toISOString() },
];
function getNotifs(): Notif[] { return lsInit("ndlp_notifs", INIT_NOTIFS); }
function addNotif(msg: string, type: Notif["type"]) {
  const all = getNotifs();
  all.unshift({ id:"n"+Date.now(), msg, type, read:false, at: new Date().toISOString() });
  lsSet("ndlp_notifs", all.slice(0, 50));
}
function markRead(id: string)    { lsSet("ndlp_notifs", getNotifs().map(n => n.id===id ? {...n,read:true} : n)); }
function markAllRead()            { lsSet("ndlp_notifs", getNotifs().map(n => ({...n,read:true}))); }
function deleteNotif(id: string) { lsSet("ndlp_notifs", getNotifs().filter(n => n.id!==id)); }

// ─── Students ─────────────────────────────────────────────────────────────────
function getStudents(): Student[] { return lsInit("ndlp_students", DEMO_STUDENTS); }
function addStudentLS(s: Student) { lsSet("ndlp_students", [...getStudents(), s]); }
function deleteStudentLS(rollNo: string) { lsSet("ndlp_students", getStudents().filter(s => s.rollNo!==rollNo)); }

// ─── Teachers ─────────────────────────────────────────────────────────────────
const INIT_TEACHERS: Teacher[] = [
  { id:"t1", name:"Mrs. Sunita Sharma",   subject:"Mathematics",      email:"sunita@ndlp.gov.in",  classes:"9,10,11",  joined:"2022-06-01" },
  { id:"t2", name:"Mr. Rajan Mehta",      subject:"Physics",          email:"rajan@ndlp.gov.in",   classes:"11,12",    joined:"2021-08-15" },
  { id:"t3", name:"Ms. Priya Das",        subject:"Chemistry",        email:"priya@ndlp.gov.in",   classes:"11,12",    joined:"2023-01-10" },
  { id:"t4", name:"Mr. Akhil Nair",       subject:"English",          email:"akhil@ndlp.gov.in",   classes:"9,10",     joined:"2020-07-01" },
  { id:"t5", name:"Mrs. Kavita Reddy",    subject:"Biology",          email:"kavita@ndlp.gov.in",  classes:"11,12",    joined:"2022-03-20" },
  { id:"t6", name:"Mr. Suresh Yadav",     subject:"Computer Science", email:"suresh@ndlp.gov.in",  classes:"10,11,12", joined:"2023-06-15" },
];
function getTeachers(): Teacher[] { return lsInit("ndlp_teachers", INIT_TEACHERS); }
function addTeacherLS(t: Omit<Teacher,"id">): Teacher {
  const teacher = { ...t, id:"t"+Date.now() };
  lsSet("ndlp_teachers", [...getTeachers(), teacher]);
  return teacher;
}
function deleteTeacherLS(id: string) { lsSet("ndlp_teachers", getTeachers().filter(t => t.id!==id)); }

// ─── Pending books ────────────────────────────────────────────────────────────
const INIT_PENDING: PendingBook[] = [
  { id:"p1", title:"Advanced Algebra",       author:"S.K. Sharma",  subject:"Mathematics",     className:"11", totalPages:320, submittedBy:"Mrs. Sunita Sharma", submittedAt:"2026-07-28" },
  { id:"p2", title:"Environmental Science",  author:"NCERT",        subject:"Science",         className:"9",  totalPages:180, submittedBy:"External",           submittedAt:"2026-07-29" },
  { id:"p3", title:"Computer Applications",  author:"Sumita Arora", subject:"Computer Science",className:"10", totalPages:428, submittedBy:"Mr. Suresh Yadav",   submittedAt:"2026-07-30" },
];
function getPending(): PendingBook[] { return lsInit("ndlp_pending", INIT_PENDING); }
function approvePending(p: PendingBook, cb: () => void) {
  addBook({ title:p.title, author:p.author, subject:p.subject, className:p.className, description:"Approved from content queue.", totalPages:p.totalPages });
  lsSet("ndlp_pending", getPending().filter(x => x.id!==p.id));
  addAudit("APPROVE", `Approved "${p.title}" by ${p.author}`);
  addNotif(`Book "${p.title}" approved and published`, "ok");
  cb();
}
function rejectPending(id: string, title: string, cb: () => void) {
  lsSet("ndlp_pending", getPending().filter(x => x.id!==id));
  addAudit("REJECT", `Rejected "${title}"`);
  cb();
}

// ─── Settings ─────────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS: AdminSettings = { siteName:"National Digital Library Portal", adminPass:"admin123", allowReg:true, emailAlerts:true, maintenance:false };
function getSettings(): AdminSettings { return lsInit("ndlp_settings", DEFAULT_SETTINGS); }
function saveSettingsLS(s: AdminSettings) { lsSet("ndlp_settings", s); }

// ─── Constants ────────────────────────────────────────────────────────────────
const CLASSES_LIST  = ["1","2","3","4","5","6","7","8","9","10","11","12","All"];
const SUBJECTS_LIST = ["Mathematics","Science","Physics","Chemistry","Biology","English","Social Science","Computer Science","General Knowledge","History","Geography","Economics","Other"];

const SIDEBAR_ITEMS = [
  { icon: Home,          label: "Dashboard" },
  { icon: BookOpen,      label: "Book Management" },
  { icon: Layers,        label: "Category Management" },
  { icon: Users,         label: "Student Management" },
  { icon: GraduationCap, label: "Teacher Management" },
  { icon: Building2,     label: "Department Management" },
  { icon: FileText,      label: "Content Approval" },
  { icon: BarChart3,     label: "Reports & Analytics" },
  { icon: Bell,          label: "Notifications" },
  { icon: Activity,      label: "Audit Logs" },
  { icon: Settings,      label: "Settings" },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────
const INPUT: React.CSSProperties = {
  width:"100%", boxSizing:"border-box",
  paddingLeft:12, paddingRight:12, paddingTop:9, paddingBottom:9,
  border:"1px solid #d6d6d6", background:"#f9f9f9", fontSize:13, color:"#333", outline:"none",
};

function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{ marginBottom:20 }}>
      <h2 style={{ fontSize:16, fontWeight:800, color:"#1a1a1a", marginBottom:2 }}>{title}</h2>
      {sub && <p style={{ fontSize:12, color:"#888" }}>{sub}</p>}
    </div>
  );
}

function Badge({ label, bg, color }: { label: string; bg: string; color: string }) {
  return <span style={{ fontSize:11, fontWeight:700, background:bg, color, padding:"2px 8px" }}>{label}</span>;
}

function HBar({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
      {data.map(item => (
        <div key={item.label} style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:100, fontSize:11, color:"#666", textAlign:"right", flexShrink:0, lineHeight:1.3 }}>{item.label}</div>
          <div style={{ flex:1, height:20, background:"#f0f0f0", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:`${(item.value/max)*100}%`, background:item.color, transition:"width 0.6s ease" }} />
          </div>
          <div style={{ width:28, fontSize:11, fontWeight:700, color:"#333", textAlign:"right", flexShrink:0 }}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

function Toggle({ val, onToggle }: { val: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} style={{ width:44, height:24, borderRadius:12, background:val?"#730068":"#d0d0d0", border:"none", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
      <div style={{ position:"absolute", top:3, left:val?20:3, width:18, height:18, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
    </button>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ nav }: { nav: (s: string) => void }) {
  const books    = getBooks();
  const students = getStudents();
  const teachers = getTeachers();
  const pending  = getPending();
  const audit    = getAudit().slice(0, 6);

  const stats = [
    { label:"Total Books",      value: books.length,    icon: BookOpen,      color:"#1a6ebb", sub: `${books.filter(b=>b.uploadedAt===new Date().toISOString().split("T")[0]).length} added today` },
    { label:"Active Students",  value: students.length, icon: Users,         color:"#3aa04a", sub: `${students.filter(s=>s.className==="12").length} in Class 12` },
    { label:"Teaching Staff",   value: teachers.length, icon: GraduationCap, color:"#730068", sub: `${[...new Set(teachers.map(t=>t.subject))].length} subjects covered` },
    { label:"Pending Approval", value: pending.length,  icon: AlertCircle,   color:"#e53935", sub: pending.length>0 ? "Needs attention" : "All clear" },
  ];

  return (
    <div>
      {/* Stat cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:24 }}>
        {stats.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:`6px solid ${card.color}`, padding:16 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                <span style={{ fontSize:12, color:"#888", fontWeight:600 }}>{card.label}</span>
                <div style={{ width:36, height:36, background:card.color+"18", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon style={{ width:16, height:16, color:card.color }} />
                </div>
              </div>
              <div style={{ fontSize:28, fontWeight:800, color:"#1a1a1a", fontVariantNumeric:"tabular-nums", marginBottom:4 }}>{card.value}</div>
              <div style={{ fontSize:12, color: card.color==="#e53935" && card.value>0 ? "#e53935" : "#3aa04a", fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>
                <TrendingUp style={{ width:11, height:11 }} />{card.sub}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20 }}>
        {/* Recent books */}
        <div style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #ff9f08", overflow:"hidden" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 20px", borderBottom:"1px solid #e0e0e0" }}>
            <span style={{ fontSize:13, fontWeight:700, color:"#333" }}>Recently Added Books</span>
            <button onClick={() => nav("Book Management")} style={{ fontSize:12, fontWeight:600, color:"#ff6600", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
              <Plus style={{ width:13, height:13 }} /> Add Book
            </button>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:"#f5f5f5" }}>
                  {["Title","Author","Class","Added"].map(h => (
                    <th key={h} style={{ textAlign:"left", fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.06em", padding:"10px 16px", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {books.slice(0, 7).map((b, i) => (
                  <tr key={b.id} style={{ borderTop:"1px solid #f0f0f0", background:i%2===0?"#fff":"#fafafa" }}>
                    <td style={{ padding:"10px 16px", fontWeight:600, color:"#222" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:6, height:6, background:b.coverColor, borderRadius:"50%", flexShrink:0 }} />
                        <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:180 }}>{b.title}</span>
                      </div>
                    </td>
                    <td style={{ padding:"10px 16px", color:"#777", fontSize:12 }}>{b.author}</td>
                    <td style={{ padding:"10px 16px" }}>
                      <Badge label={b.className==="All"?"All":`Cl.${b.className}`} bg={b.coverColor+"18"} color={b.coverColor} />
                    </td>
                    <td style={{ padding:"10px 16px", color:"#999", fontSize:12, whiteSpace:"nowrap" }}>{b.uploadedAt}</td>
                  </tr>
                ))}
                {books.length===0 && <tr><td colSpan={4} style={{ padding:"30px 16px", textAlign:"center", color:"#bbb" }}>No books yet.</td></tr>}
              </tbody>
            </table>
          </div>
          <div style={{ padding:"10px 16px", borderTop:"1px solid #f0f0f0" }}>
            <button onClick={() => nav("Book Management")} style={{ fontSize:12, color:"#730068", fontWeight:600, background:"none", border:"none", cursor:"pointer" }}>
              View all {books.length} books →
            </button>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* Quick actions */}
          <div style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #730068", padding:16 }}>
            <span style={{ fontSize:13, fontWeight:700, color:"#333", display:"block", marginBottom:12 }}>Quick Actions</span>
            {[
              { label:"Upload a Book",     section:"Book Management",     icon:Upload,      color:"#1a6ebb", badge:0 },
              { label:"Add Student",       section:"Student Management",  icon:UserPlus,    color:"#3aa04a", badge:0 },
              { label:"Content Approval",  section:"Content Approval",    icon:CheckCircle, color:"#e53935", badge:pending.length },
              { label:"View Reports",      section:"Reports & Analytics", icon:BarChart3,   color:"#730068", badge:0 },
            ].map(a => {
              const Icon = a.icon;
              return (
                <button key={a.label} onClick={() => nav(a.section)}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 8px", border:"none", background:"none", cursor:"pointer", textAlign:"left", marginBottom:2 }}
                  onMouseEnter={e => (e.currentTarget.style.background="#f5f5f5")}
                  onMouseLeave={e => (e.currentTarget.style.background="none")}
                >
                  <div style={{ width:28, height:28, background:a.color+"18", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon style={{ width:13, height:13, color:a.color }} />
                  </div>
                  <span style={{ fontSize:13, fontWeight:600, color:"#333", flex:1 }}>{a.label}</span>
                  {a.badge > 0 && <span style={{ fontSize:10, fontWeight:700, background:"#e53935", color:"#fff", padding:"1px 6px", borderRadius:8 }}>{a.badge}</span>}
                  <ChevronRight style={{ width:13, height:13, color:"#ccc" }} />
                </button>
              );
            })}
          </div>

          {/* Recent activity */}
          <div style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #3aa04a", padding:16 }}>
            <span style={{ fontSize:13, fontWeight:700, color:"#333", display:"block", marginBottom:12 }}>Recent Activity</span>
            {audit.length===0
              ? <p style={{ fontSize:12, color:"#bbb" }}>No activity yet.</p>
              : <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {audit.map(e => (
                    <div key={e.id} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                      <div style={{ width:6, height:6, background:"#730068", borderRadius:"50%", flexShrink:0, marginTop:5 }} />
                      <div>
                        <div style={{ fontSize:12, color:"#333", lineHeight:1.4 }}>{e.detail}</div>
                        <div style={{ fontSize:11, color:"#bbb" }}>{new Date(e.at).toLocaleString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</div>
                      </div>
                    </div>
                  ))}
                </div>
            }
            {audit.length>0 && (
              <button onClick={() => nav("Audit Logs")} style={{ fontSize:12, color:"#730068", fontWeight:600, background:"none", border:"none", cursor:"pointer", marginTop:8 }}>
                View full log →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Book Management ──────────────────────────────────────────────────────────
function BookManagement({ onAction }: { onAction: () => void }) {
  const [books, setBooks]       = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterCls, setFilterCls] = useState("All");
  const [search, setSearch]     = useState("");
  const [form, setForm]         = useState({ title:"", author:"", subject:"Mathematics", className:"10", description:"", totalPages:"" });

  useEffect(() => { setBooks(getBooks()); }, []);
  const refresh = () => { setBooks(getBooks()); onAction(); };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    deleteBook(id);
    addAudit("BOOK_DELETE", `Deleted book "${title}"`);
    addNotif(`Book "${title}" was deleted`, "warn");
    refresh();
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()||!form.author.trim()||!form.totalPages) return;
    const b = addBook({ title:form.title.trim(), author:form.author.trim(), subject:form.subject, className:form.className, description:form.description.trim(), totalPages:Number(form.totalPages) });
    addAudit("BOOK_ADD", `Added "${b.title}" by ${b.author} for Class ${b.className}`);
    addNotif(`Book "${b.title}" added to library`, "ok");
    setForm({ title:"", author:"", subject:"Mathematics", className:"10", description:"", totalPages:"" });
    setShowForm(false);
    refresh();
  };

  const displayed = books.filter(b =>
    (filterCls==="All" || b.className===filterCls || b.className==="All") &&
    (search===""||b.title.toLowerCase().includes(search.toLowerCase())||b.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h2 style={{ fontSize:16, fontWeight:800, color:"#1a1a1a", marginBottom:2 }}>Book Management</h2>
          <p style={{ fontSize:12, color:"#888" }}>{books.length} books across all classes</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ display:"flex", alignItems:"center", gap:6, background:"#730068", color:"#fff", border:"none", cursor:"pointer", fontSize:13, fontWeight:600, padding:"9px 16px" }}>
          {showForm ? <X style={{ width:14, height:14 }} /> : <Plus style={{ width:14, height:14 }} />}
          {showForm ? "Cancel" : "Upload Book"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #ff9f08", marginBottom:20, padding:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
            <Upload style={{ width:15, height:15, color:"#ff9f08" }} />
            <span style={{ fontSize:14, fontWeight:700, color:"#333" }}>Upload New Book</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16 }}>
            {[{label:"Title *",key:"title",placeholder:"Book title"},{label:"Author *",key:"author",placeholder:"Author name"}].map(f => (
              <div key={f.key} style={{ display:"flex", flexDirection:"column", gap:5 }}>
                <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>{f.label}</label>
                <input required value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({...p,[f.key]:e.target.value}))} placeholder={f.placeholder} style={INPUT} />
              </div>
            ))}
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>Subject *</label>
              <select value={form.subject} onChange={e => setForm(p => ({...p,subject:e.target.value}))} style={INPUT}>
                {SUBJECTS_LIST.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>Class *</label>
              <select value={form.className} onChange={e => setForm(p => ({...p,className:e.target.value}))} style={INPUT}>
                {CLASSES_LIST.map(c => <option key={c} value={c}>{c==="All"?"All Classes":`Class ${c}`}</option>)}
              </select>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>Total Pages *</label>
              <input required type="number" min="1" value={form.totalPages} onChange={e => setForm(p => ({...p,totalPages:e.target.value}))} placeholder="e.g. 250" style={INPUT} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>Description</label>
              <input value={form.description} onChange={e => setForm(p => ({...p,description:e.target.value}))} placeholder="Brief description (optional)" style={INPUT} />
            </div>
          </div>
          <button type="submit" style={{ background:"linear-gradient(90deg,#ff9f08,#ff6600)", color:"#fff", border:"none", cursor:"pointer", fontSize:13, fontWeight:700, padding:"10px 24px", display:"flex", alignItems:"center", gap:6 }}>
            <Upload style={{ width:13, height:13 }} /> Save Book
          </button>
        </form>
      )}

      {/* Filters */}
      <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:14, flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:"1 1 200px" }}>
          <Search style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", width:13, height:13, color:"#bbb" }} />
          <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search title or author…" style={{ ...INPUT, paddingLeft:30 }} />
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
          {["All",...CLASSES_LIST.filter(c=>c!=="All")].map(c => (
            <button key={c} onClick={() => setFilterCls(c)} style={{ fontSize:11, fontWeight:600, cursor:"pointer", border:"1.5px solid", padding:"3px 10px", ...(filterCls===c?{background:"#730068",borderColor:"#730068",color:"#fff"}:{background:"#fff",borderColor:"#ccc",color:"#555"}) }}>
              {c==="All"?"All":`Cl.${c}`}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #730068", overflow:"hidden" }}>
        <div style={{ padding:"10px 16px", borderBottom:"1px solid #e0e0e0" }}>
          <span style={{ fontSize:12, fontWeight:700, color:"#555" }}>{displayed.length} result{displayed.length!==1?"s":""}</span>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background:"#f5f5f5" }}>
                {["Title","Author","Subject","Class","Pages","Added",""].map((h,i) => (
                  <th key={i} style={{ textAlign:"left", fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.06em", padding:"10px 16px", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.map((b, i) => (
                <tr key={b.id} style={{ borderTop:"1px solid #f0f0f0", background:i%2===0?"#fff":"#fafafa" }}>
                  <td style={{ padding:"10px 16px", fontWeight:600, color:"#222" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <div style={{ width:7, height:7, background:b.coverColor, borderRadius:"50%", flexShrink:0 }} />
                      <span style={{ maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.title}</span>
                    </div>
                  </td>
                  <td style={{ padding:"10px 16px", color:"#777", fontSize:12 }}>{b.author}</td>
                  <td style={{ padding:"10px 16px" }}><Badge label={b.subject} bg={b.coverColor+"18"} color={b.coverColor} /></td>
                  <td style={{ padding:"10px 16px", fontSize:12, fontWeight:600, color:"#555" }}>{b.className==="All"?"All":`Class ${b.className}`}</td>
                  <td style={{ padding:"10px 16px", color:"#999", fontSize:12 }}>{b.totalPages}</td>
                  <td style={{ padding:"10px 16px", color:"#999", fontSize:12, whiteSpace:"nowrap" }}>{b.uploadedAt}</td>
                  <td style={{ padding:"10px 16px" }}>
                    <button onClick={() => handleDelete(b.id, b.title)} style={{ width:28, height:28, background:"#f5f5f5", border:"1px solid #e0e0e0", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#888" }}
                      onMouseEnter={e => (e.currentTarget.style.color="#e53935")} onMouseLeave={e => (e.currentTarget.style.color="#888")}>
                      <Trash2 style={{ width:13, height:13 }} />
                    </button>
                  </td>
                </tr>
              ))}
              {displayed.length===0 && <tr><td colSpan={7} style={{ padding:"40px 16px", textAlign:"center", color:"#bbb" }}>No books found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Category Management ──────────────────────────────────────────────────────
function CategoryManagement({ onAction }: { onAction: () => void }) {
  const [custom, setCustom] = useState<string[]>([]);
  const [newCat, setNewCat] = useState("");
  const books = getBooks();

  useEffect(() => { setCustom(lsInit<string[]>("ndlp_custom_cats", [])); }, []);
  const saveCustom = (list: string[]) => { lsSet("ndlp_custom_cats", list); setCustom(list); };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const v = newCat.trim();
    if (!v||[...SUBJECTS_LIST,...custom].includes(v)) return;
    saveCustom([...custom, v]);
    addAudit("CAT_ADD", `Added custom category "${v}"`);
    setNewCat("");
    onAction();
  };

  const allSubs = [...SUBJECTS_LIST, ...custom];

  return (
    <div>
      <SectionTitle title="Category Management" sub={`${allSubs.length} categories · ${books.length} total books`} />
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20 }}>
        {/* Table */}
        <div style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #730068", overflow:"hidden" }}>
          <div style={{ padding:"10px 16px", borderBottom:"1px solid #e0e0e0" }}>
            <span style={{ fontSize:13, fontWeight:700, color:"#333" }}>All Categories</span>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:"#f5f5f5" }}>
                  {["Category","Books","Type",""].map((h,i) => (
                    <th key={i} style={{ textAlign:"left", fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.06em", padding:"10px 16px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allSubs.map((cat, i) => {
                  const count = books.filter(b => b.subject===cat).length;
                  const isCustom = custom.includes(cat);
                  const maxCount = Math.max(...allSubs.map(c => books.filter(b=>b.subject===c).length), 1);
                  return (
                    <tr key={cat} style={{ borderTop:"1px solid #f0f0f0", background:i%2===0?"#fff":"#fafafa" }}>
                      <td style={{ padding:"10px 16px", fontWeight:600, color:"#222" }}>{cat}</td>
                      <td style={{ padding:"10px 16px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <div style={{ width:Math.max((count/maxCount)*80,3), height:6, background:"#730068" }} />
                          <span style={{ fontSize:12, color:"#555", fontWeight:600 }}>{count}</span>
                        </div>
                      </td>
                      <td style={{ padding:"10px 16px" }}>
                        <Badge label={isCustom?"Custom":"Built-in"} bg={isCustom?"#ff9f0820":"#73006818"} color={isCustom?"#c47a00":"#730068"} />
                      </td>
                      <td style={{ padding:"10px 16px" }}>
                        {isCustom && (
                          <button onClick={() => { saveCustom(custom.filter(c=>c!==cat)); addAudit("CAT_DELETE",`Deleted category "${cat}"`); onAction(); }}
                            style={{ width:26, height:26, background:"#f5f5f5", border:"1px solid #e0e0e0", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#888" }}
                            onMouseEnter={e => (e.currentTarget.style.color="#e53935")} onMouseLeave={e => (e.currentTarget.style.color="#888")}>
                            <Trash2 style={{ width:12, height:12 }} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <form onSubmit={handleAdd} style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #ff9f08", padding:20 }}>
            <span style={{ fontSize:13, fontWeight:700, color:"#333", display:"block", marginBottom:14 }}>Add Custom Category</span>
            <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:14 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>Name *</label>
              <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="e.g. Fine Arts" style={INPUT} required />
            </div>
            <button type="submit" style={{ background:"#730068", color:"#fff", border:"none", cursor:"pointer", fontSize:13, fontWeight:700, padding:"9px 18px", display:"flex", alignItems:"center", gap:6 }}>
              <Plus style={{ width:13, height:13 }} /> Add
            </button>
          </form>
          <div style={{ background:"#730068", padding:20 }}>
            <span style={{ color:"#fff", fontSize:13, fontWeight:700, display:"block", marginBottom:12 }}>Category Stats</span>
            {[
              { label:"Built-in",   value: SUBJECTS_LIST.length },
              { label:"Custom",     value: custom.length },
              { label:"With books", value: allSubs.filter(c=>books.some(b=>b.subject===c)).length },
              { label:"Empty",      value: allSubs.filter(c=>!books.some(b=>b.subject===c)).length },
            ].map(s => (
              <div key={s.label} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontSize:12, color:"rgba(255,255,255,0.55)" }}>{s.label}</span>
                <span style={{ fontSize:13, fontWeight:700, color:"#ff9f08" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Student Management ───────────────────────────────────────────────────────
function StudentManagement({ onAction }: { onAction: () => void }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch]     = useState("");
  const [filterCls, setFilterCls] = useState("All");
  const [form, setForm]         = useState({ rollNo:"", name:"", className:"9", section:"A", password:"1234" });

  useEffect(() => { setStudents(getStudents()); }, []);
  const refresh = () => { setStudents(getStudents()); onAction(); };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (students.some(s => s.rollNo===form.rollNo.trim())) { alert("Roll number already exists."); return; }
    addStudentLS({ rollNo:form.rollNo.trim(), name:form.name.trim(), className:form.className, section:form.section, password:form.password||"1234" });
    addAudit("STUDENT_ADD", `Added student ${form.name} (Roll ${form.rollNo}, Class ${form.className}-${form.section})`);
    addNotif(`New student ${form.name} added to Class ${form.className}`, "ok");
    setForm({ rollNo:"", name:"", className:"9", section:"A", password:"1234" });
    setShowForm(false);
    refresh();
  };

  const handleDelete = (rollNo: string, name: string) => {
    if (!confirm(`Remove student ${name} (${rollNo})?`)) return;
    deleteStudentLS(rollNo);
    addAudit("STUDENT_DELETE", `Removed student ${name} (Roll ${rollNo})`);
    refresh();
  };

  const filtered = students.filter(s =>
    (filterCls==="All"||s.className===filterCls) &&
    (search===""||s.name.toLowerCase().includes(search.toLowerCase())||s.rollNo.includes(search))
  );

  const classDist = ["9","10","11","12"].map(c => ({ label:`Class ${c}`, value:students.filter(s=>s.className===c).length, color:"#730068" }));

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h2 style={{ fontSize:16, fontWeight:800, color:"#1a1a1a", marginBottom:2 }}>Student Management</h2>
          <p style={{ fontSize:12, color:"#888" }}>{students.length} students enrolled</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ display:"flex", alignItems:"center", gap:6, background:"#730068", color:"#fff", border:"none", cursor:"pointer", fontSize:13, fontWeight:600, padding:"9px 16px" }}>
          {showForm ? <X style={{ width:14, height:14 }} /> : <UserPlus style={{ width:14, height:14 }} />}
          {showForm ? "Cancel" : "Add Student"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #3aa04a", marginBottom:20, padding:24 }}>
          <span style={{ fontSize:14, fontWeight:700, color:"#333", display:"block", marginBottom:16 }}>New Student</span>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16 }}>
            {[{label:"Roll Number *",key:"rollNo",placeholder:"e.g. 2025009"},{label:"Full Name *",key:"name",placeholder:"Student's full name"}].map(f => (
              <div key={f.key} style={{ display:"flex", flexDirection:"column", gap:5 }}>
                <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>{f.label}</label>
                <input required value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({...p,[f.key]:e.target.value}))} placeholder={f.placeholder} style={INPUT} />
              </div>
            ))}
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>Class *</label>
              <select value={form.className} onChange={e => setForm(p => ({...p,className:e.target.value}))} style={INPUT}>
                {["9","10","11","12"].map(c => <option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>Section *</label>
              <select value={form.section} onChange={e => setForm(p => ({...p,section:e.target.value}))} style={INPUT}>
                {["A","B","C","D"].map(s => <option key={s}>Section {s}</option>)}
              </select>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>Password</label>
              <input value={form.password} onChange={e => setForm(p => ({...p,password:e.target.value}))} placeholder="Default: 1234" style={INPUT} />
            </div>
          </div>
          <button type="submit" style={{ background:"#3aa04a", color:"#fff", border:"none", cursor:"pointer", fontSize:13, fontWeight:700, padding:"9px 20px", display:"flex", alignItems:"center", gap:6 }}>
            <UserPlus style={{ width:13, height:13 }} /> Add Student
          </button>
        </form>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20 }}>
        <div>
          <div style={{ display:"flex", gap:10, marginBottom:12, flexWrap:"wrap" }}>
            <div style={{ position:"relative", flex:"1 1 180px" }}>
              <Search style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", width:13, height:13, color:"#bbb" }} />
              <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or roll no…" style={{ ...INPUT, paddingLeft:30 }} />
            </div>
            <div style={{ display:"flex", gap:5 }}>
              {["All","9","10","11","12"].map(c => (
                <button key={c} onClick={() => setFilterCls(c)} style={{ fontSize:11, fontWeight:600, cursor:"pointer", border:"1.5px solid", padding:"3px 10px", ...(filterCls===c?{background:"#730068",borderColor:"#730068",color:"#fff"}:{background:"#fff",borderColor:"#ccc",color:"#555"}) }}>
                  {c==="All"?"All":`Cl.${c}`}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #3aa04a", overflow:"hidden" }}>
            <div style={{ padding:"10px 16px", borderBottom:"1px solid #e0e0e0" }}>
              <span style={{ fontSize:12, fontWeight:700, color:"#555" }}>{filtered.length} student{filtered.length!==1?"s":""} shown</span>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr style={{ background:"#f5f5f5" }}>
                    {["Roll No","Name","Class","Section","Password",""].map((h,i) => (
                      <th key={i} style={{ textAlign:"left", fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.06em", padding:"10px 16px", whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={s.rollNo} style={{ borderTop:"1px solid #f0f0f0", background:i%2===0?"#fff":"#fafafa" }}>
                      <td style={{ padding:"10px 16px", fontWeight:700, color:"#730068", fontSize:13, fontVariantNumeric:"tabular-nums" }}>{s.rollNo}</td>
                      <td style={{ padding:"10px 16px", fontWeight:600, color:"#222" }}>{s.name}</td>
                      <td style={{ padding:"10px 16px" }}><Badge label={`Class ${s.className}`} bg="#73006818" color="#730068" /></td>
                      <td style={{ padding:"10px 16px", color:"#555", fontWeight:600 }}>Sec {s.section}</td>
                      <td style={{ padding:"10px 16px", color:"#bbb", fontSize:12, fontFamily:"monospace" }}>{s.password}</td>
                      <td style={{ padding:"10px 16px" }}>
                        <button onClick={() => handleDelete(s.rollNo, s.name)} style={{ width:26, height:26, background:"#f5f5f5", border:"1px solid #e0e0e0", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#888" }}
                          onMouseEnter={e => (e.currentTarget.style.color="#e53935")} onMouseLeave={e => (e.currentTarget.style.color="#888")}>
                          <Trash2 style={{ width:12, height:12 }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length===0 && <tr><td colSpan={6} style={{ padding:"40px 16px", textAlign:"center", color:"#bbb" }}>No students found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #730068", padding:20 }}>
          <span style={{ fontSize:13, fontWeight:700, color:"#333", display:"block", marginBottom:16 }}>Class Distribution</span>
          <HBar data={classDist} />
          <div style={{ marginTop:20, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
            {["A","B","C","D"].map(sec => (
              <div key={sec} style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:12, color:"#666" }}>Section {sec}</span>
                <span style={{ fontSize:12, fontWeight:700, color:"#730068" }}>{students.filter(s=>s.section===sec).length}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Teacher Management ───────────────────────────────────────────────────────
function TeacherManagement({ onAction }: { onAction: () => void }) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch]     = useState("");
  const [form, setForm]         = useState({ name:"", subject:"Mathematics", email:"", classes:"", joined:new Date().toISOString().split("T")[0] });

  useEffect(() => { setTeachers(getTeachers()); }, []);
  const refresh = () => { setTeachers(getTeachers()); onAction(); };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()||!form.email.trim()) return;
    const t = addTeacherLS({ name:form.name.trim(), subject:form.subject, email:form.email.trim(), classes:form.classes.trim(), joined:form.joined });
    addAudit("TEACHER_ADD", `Added teacher ${t.name} (${t.subject})`);
    addNotif(`Teacher ${t.name} added to staff`, "ok");
    setForm({ name:"", subject:"Mathematics", email:"", classes:"", joined:new Date().toISOString().split("T")[0] });
    setShowForm(false);
    refresh();
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Remove teacher ${name}?`)) return;
    deleteTeacherLS(id);
    addAudit("TEACHER_DELETE", `Removed teacher ${name}`);
    refresh();
  };

  const filtered = teachers.filter(t => search===""||t.name.toLowerCase().includes(search.toLowerCase())||t.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h2 style={{ fontSize:16, fontWeight:800, color:"#1a1a1a", marginBottom:2 }}>Teacher Management</h2>
          <p style={{ fontSize:12, color:"#888" }}>{teachers.length} teachers on staff</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ display:"flex", alignItems:"center", gap:6, background:"#730068", color:"#fff", border:"none", cursor:"pointer", fontSize:13, fontWeight:600, padding:"9px 16px" }}>
          {showForm ? <X style={{ width:14, height:14 }} /> : <Plus style={{ width:14, height:14 }} />}
          {showForm ? "Cancel" : "Add Teacher"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #3aa04a", marginBottom:20, padding:24 }}>
          <span style={{ fontSize:14, fontWeight:700, color:"#333", display:"block", marginBottom:16 }}>New Teacher</span>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16 }}>
            {[{label:"Full Name *",key:"name",placeholder:"Teacher's full name"},{label:"Email *",key:"email",placeholder:"teacher@ndlp.gov.in"}].map(f => (
              <div key={f.key} style={{ display:"flex", flexDirection:"column", gap:5 }}>
                <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>{f.label}</label>
                <input required value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({...p,[f.key]:e.target.value}))} placeholder={f.placeholder} style={INPUT} />
              </div>
            ))}
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>Subject *</label>
              <select value={form.subject} onChange={e => setForm(p => ({...p,subject:e.target.value}))} style={INPUT}>
                {SUBJECTS_LIST.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>Classes (comma-separated)</label>
              <input value={form.classes} onChange={e => setForm(p => ({...p,classes:e.target.value}))} placeholder="e.g. 9,10,11" style={INPUT} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>Joining Date</label>
              <input type="date" value={form.joined} onChange={e => setForm(p => ({...p,joined:e.target.value}))} style={INPUT} />
            </div>
          </div>
          <button type="submit" style={{ background:"#3aa04a", color:"#fff", border:"none", cursor:"pointer", fontSize:13, fontWeight:700, padding:"9px 20px", display:"flex", alignItems:"center", gap:6 }}>
            <Plus style={{ width:13, height:13 }} /> Add Teacher
          </button>
        </form>
      )}

      <div style={{ position:"relative", marginBottom:14 }}>
        <Search style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", width:13, height:13, color:"#bbb" }} />
        <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or subject…" style={{ ...INPUT, paddingLeft:30, maxWidth:320 }} />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
        {filtered.map(t => (
          <div key={t.id} style={{ background:"#fff", border:"1px solid #d6d6d6", borderLeft:"5px solid #730068", padding:16 }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:10 }}>
              <div style={{ width:36, height:36, background:"#730068", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <GraduationCap style={{ width:16, height:16, color:"#fff" }} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:"#1a1a1a", marginBottom:4 }}>{t.name}</div>
                <Badge label={t.subject} bg="#73006818" color="#730068" />
              </div>
              <button onClick={() => handleDelete(t.id, t.name)} style={{ width:26, height:26, background:"#f5f5f5", border:"1px solid #e0e0e0", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#888", flexShrink:0 }}
                onMouseEnter={e => (e.currentTarget.style.color="#e53935")} onMouseLeave={e => (e.currentTarget.style.color="#888")}>
                <Trash2 style={{ width:12, height:12 }} />
              </button>
            </div>
            <div style={{ fontSize:12, color:"#777", marginBottom:4 }}>✉ {t.email}</div>
            {t.classes && <div style={{ fontSize:12, color:"#777", marginBottom:4 }}>Classes: <strong style={{ color:"#333" }}>{t.classes}</strong></div>}
            <div style={{ fontSize:11, color:"#bbb" }}>Joined {t.joined}</div>
          </div>
        ))}
        {filtered.length===0 && (
          <div style={{ gridColumn:"1/-1", padding:"40px 16px", textAlign:"center", color:"#bbb", background:"#fff", border:"1px solid #d6d6d6" }}>No teachers found.</div>
        )}
      </div>
    </div>
  );
}

// ─── Department Management ────────────────────────────────────────────────────
function DepartmentManagement() {
  const books    = getBooks();
  const students = getStudents();
  const teachers = getTeachers();

  const depts = SUBJECTS_LIST.map(sub => {
    const dBooks    = books.filter(b => b.subject===sub);
    const dTeachers = teachers.filter(t => t.subject===sub);
    const classes   = [...new Set(dBooks.map(b => b.className).filter(c => c!=="All"))];
    const dStudents = students.filter(s => classes.includes(s.className));
    return { name:sub, books:dBooks.length, teachers:dTeachers.length, students:dStudents.length, head:dTeachers[0]?.name ?? "—" };
  }).filter(d => d.books>0||d.teachers>0);

  return (
    <div>
      <SectionTitle title="Department Management" sub={`${depts.length} active departments`} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14 }}>
        {depts.map(d => (
          <div key={d.name} style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"5px solid #730068", padding:16 }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#1a1a1a", marginBottom:4 }}>{d.name}</div>
            <div style={{ fontSize:12, color:"#888", marginBottom:12 }}>Head: {d.head}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {[{label:"Books",val:d.books,color:"#1a6ebb"},{label:"Teachers",val:d.teachers,color:"#730068"},{label:"Students",val:d.students,color:"#3aa04a"}].map(s => (
                <div key={s.label} style={{ textAlign:"center", background:s.color+"18", padding:"8px 0" }}>
                  <div style={{ fontSize:18, fontWeight:800, color:s.color }}>{s.val}</div>
                  <div style={{ fontSize:10, color:"#888", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {depts.length===0 && <p style={{ color:"#bbb", fontSize:13 }}>No department data yet.</p>}
      </div>
    </div>
  );
}

// ─── Content Approval ─────────────────────────────────────────────────────────
function ContentApproval({ onAction }: { onAction: () => void }) {
  const [pending, setPending] = useState<PendingBook[]>([]);
  useEffect(() => { setPending(getPending()); }, []);
  const refresh = () => { setPending(getPending()); onAction(); };

  return (
    <div>
      <SectionTitle title="Content Approval" sub={`${pending.length} book${pending.length!==1?"s":""} awaiting review`} />
      {pending.length===0 ? (
        <div style={{ background:"#fff", border:"1px solid #d6d6d6", padding:"60px 24px", textAlign:"center" }}>
          <CheckCircle style={{ width:36, height:36, color:"#3aa04a", margin:"0 auto 12px" }} />
          <p style={{ fontSize:15, fontWeight:700, color:"#333", marginBottom:4 }}>All caught up!</p>
          <p style={{ fontSize:13, color:"#888" }}>No pending submissions at this time.</p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {pending.map(p => (
            <div key={p.id} style={{ background:"#fff", border:"1px solid #d6d6d6", borderLeft:"5px solid #fea500", padding:20 }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:"#1a1a1a", marginBottom:4 }}>{p.title}</div>
                  <div style={{ fontSize:13, color:"#666", marginBottom:8 }}>by {p.author}</div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:8 }}>
                    <Badge label={p.subject}  bg="#73006818" color="#730068" />
                    <Badge label={p.className==="All"?"All Classes":`Class ${p.className}`} bg="#1a6ebb18" color="#1a6ebb" />
                    <Badge label={`${p.totalPages} pages`} bg="#f0f0f0" color="#555" />
                  </div>
                  <div style={{ fontSize:12, color:"#999" }}>Submitted by <strong style={{ color:"#555" }}>{p.submittedBy}</strong> on {p.submittedAt}</div>
                </div>
                <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                  <button onClick={() => approvePending(p, refresh)} style={{ display:"flex", alignItems:"center", gap:6, background:"#3aa04a", color:"#fff", border:"none", cursor:"pointer", fontSize:12, fontWeight:700, padding:"8px 14px" }}>
                    <Check style={{ width:13, height:13 }} /> Approve
                  </button>
                  <button onClick={() => rejectPending(p.id, p.title, refresh)} style={{ display:"flex", alignItems:"center", gap:6, background:"#f5f5f5", color:"#e53935", border:"1px solid #e53935", cursor:"pointer", fontSize:12, fontWeight:700, padding:"8px 14px" }}>
                    <XCircle style={{ width:13, height:13 }} /> Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Reports & Analytics ──────────────────────────────────────────────────────
function ReportsAnalytics() {
  const books    = getBooks();
  const students = getStudents();
  const teachers = getTeachers();

  const byClass  = ["9","10","11","12"].map(c => ({ label:`Class ${c}`, value:books.filter(b=>b.className===c||b.className==="All").length, color:"#730068" }));
  const bySub    = SUBJECTS_LIST.map(s => ({ label:s, value:books.filter(b=>b.subject===s).length, color:"#1a6ebb" })).filter(d=>d.value>0).sort((a,b)=>b.value-a.value).slice(0,8);
  const stuByCls = ["9","10","11","12"].map(c => ({ label:`Class ${c}`, value:students.filter(s=>s.className===c).length, color:"#3aa04a" }));

  const summary = [
    { label:"Total Books",     value:books.length,    color:"#1a6ebb" },
    { label:"Total Students",  value:students.length, color:"#3aa04a" },
    { label:"Total Teachers",  value:teachers.length, color:"#730068" },
    { label:"Subjects Covered",value:[...new Set(teachers.map(t=>t.subject))].length, color:"#ff9f08" },
  ];

  return (
    <div>
      <SectionTitle title="Reports & Analytics" sub="Live stats from library data" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
        {summary.map(s => (
          <div key={s.label} style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:`4px solid ${s.color}`, padding:16 }}>
            <div style={{ fontSize:26, fontWeight:800, color:s.color, fontVariantNumeric:"tabular-nums" }}>{s.value}</div>
            <div style={{ fontSize:12, color:"#888", fontWeight:600, marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
        <div style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #730068", padding:20 }}>
          <span style={{ fontSize:13, fontWeight:700, color:"#333", display:"block", marginBottom:16 }}>Books Available per Class</span>
          <HBar data={byClass} />
        </div>
        <div style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #3aa04a", padding:20 }}>
          <span style={{ fontSize:13, fontWeight:700, color:"#333", display:"block", marginBottom:16 }}>Students per Class</span>
          <HBar data={stuByCls} />
        </div>
      </div>
      <div style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #1a6ebb", padding:20 }}>
        <span style={{ fontSize:13, fontWeight:700, color:"#333", display:"block", marginBottom:16 }}>Top Subjects by Book Count</span>
        <HBar data={bySub} />
      </div>
    </div>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────
function NotificationsPanel({ onAction }: { onAction: () => void }) {
  const [notifs, setNotifs] = useState<Notif[]>([]);
  useEffect(() => { setNotifs(getNotifs()); }, []);
  const refresh = () => { setNotifs(getNotifs()); onAction(); };

  const ICON = { ok:CheckCircle, warn:AlertCircle, info:Info };
  const CLR  = { ok:"#3aa04a", warn:"#fea500", info:"#1a6ebb" };

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h2 style={{ fontSize:16, fontWeight:800, color:"#1a1a1a", marginBottom:2 }}>Notifications</h2>
          <p style={{ fontSize:12, color:"#888" }}>{notifs.filter(n=>!n.read).length} unread of {notifs.length}</p>
        </div>
        {notifs.some(n=>!n.read) && (
          <button onClick={() => { markAllRead(); refresh(); }} style={{ fontSize:12, fontWeight:600, color:"#730068", background:"none", border:"1px solid #730068", cursor:"pointer", padding:"6px 14px" }}>
            Mark all read
          </button>
        )}
      </div>
      {notifs.length===0 ? (
        <div style={{ background:"#fff", border:"1px solid #d6d6d6", padding:"60px 24px", textAlign:"center" }}>
          <Bell style={{ width:36, height:36, color:"#ccc", margin:"0 auto 12px" }} />
          <p style={{ fontSize:14, color:"#bbb" }}>No notifications.</p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {notifs.map(n => {
            const Icon  = ICON[n.type];
            const color = CLR[n.type];
            return (
              <div key={n.id} style={{ background:n.read?"#fff":"#f8f4ff", border:"1px solid #d6d6d6", borderLeft:`4px solid ${color}`, padding:"14px 16px", display:"flex", alignItems:"flex-start", gap:12 }}>
                <Icon style={{ width:16, height:16, color, flexShrink:0, marginTop:2 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:n.read?400:600, color:"#222", marginBottom:2 }}>{n.msg}</div>
                  <div style={{ fontSize:11, color:"#bbb" }}>{new Date(n.at).toLocaleString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}</div>
                </div>
                <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                  {!n.read && (
                    <button onClick={() => { markRead(n.id); refresh(); }} style={{ fontSize:11, fontWeight:600, color:"#730068", background:"none", border:"none", cursor:"pointer" }}>
                      Mark read
                    </button>
                  )}
                  <button onClick={() => { deleteNotif(n.id); refresh(); }} style={{ width:22, height:22, background:"none", border:"none", cursor:"pointer", color:"#ccc", display:"flex", alignItems:"center", justifyContent:"center" }}
                    onMouseEnter={e => (e.currentTarget.style.color="#e53935")} onMouseLeave={e => (e.currentTarget.style.color="#ccc")}>
                    <X style={{ width:12, height:12 }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Audit Logs ───────────────────────────────────────────────────────────────
function AuditLogs() {
  const [log, setLog]     = useState<AuditEntry[]>([]);
  const [filter, setFilter] = useState("All");
  useEffect(() => { setLog(getAudit()); }, []);

  const ACTION_TYPES = ["All","BOOK_ADD","BOOK_DELETE","STUDENT_ADD","STUDENT_DELETE","TEACHER_ADD","TEACHER_DELETE","APPROVE","REJECT","CAT_ADD","CAT_DELETE","SETTINGS"];
  const CLR: Record<string,string> = { BOOK_ADD:"#3aa04a", BOOK_DELETE:"#e53935", STUDENT_ADD:"#1a6ebb", STUDENT_DELETE:"#e53935", TEACHER_ADD:"#3aa04a", TEACHER_DELETE:"#e53935", APPROVE:"#3aa04a", REJECT:"#e53935", CAT_ADD:"#730068", CAT_DELETE:"#e53935", SETTINGS:"#ff9f08" };
  const filtered = log.filter(e => filter==="All"||e.action===filter);

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <div>
          <h2 style={{ fontSize:16, fontWeight:800, color:"#1a1a1a", marginBottom:2 }}>Audit Logs</h2>
          <p style={{ fontSize:12, color:"#888" }}>{log.length} total entries</p>
        </div>
        {log.length>0 && (
          <button onClick={() => { lsSet("ndlp_audit",[]); setLog([]); }} style={{ fontSize:12, fontWeight:600, color:"#e53935", background:"none", border:"1px solid #e53935", cursor:"pointer", padding:"5px 12px" }}>
            Clear Logs
          </button>
        )}
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:16 }}>
        {ACTION_TYPES.map(a => (
          <button key={a} onClick={() => setFilter(a)} style={{ fontSize:11, fontWeight:600, cursor:"pointer", border:"1.5px solid", padding:"3px 10px", ...(filter===a?{background:"#730068",borderColor:"#730068",color:"#fff"}:{background:"#fff",borderColor:"#ccc",color:"#555"}) }}>
            {a}
          </button>
        ))}
      </div>
      {filtered.length===0 ? (
        <div style={{ background:"#fff", border:"1px solid #d6d6d6", padding:"60px 24px", textAlign:"center" }}>
          <Activity style={{ width:36, height:36, color:"#ccc", margin:"0 auto 12px" }} />
          <p style={{ fontSize:14, color:"#bbb" }}>No log entries. Actions you take will appear here.</p>
        </div>
      ) : (
        <div style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #730068", overflow:"hidden" }}>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:"#f5f5f5" }}>
                  {["Time","Action","Details"].map(h => (
                    <th key={h} style={{ textAlign:"left", fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.06em", padding:"10px 16px", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((e, i) => (
                  <tr key={e.id} style={{ borderTop:"1px solid #f0f0f0", background:i%2===0?"#fff":"#fafafa" }}>
                    <td style={{ padding:"10px 16px", color:"#999", fontSize:12, whiteSpace:"nowrap" }}>
                      {new Date(e.at).toLocaleString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}
                    </td>
                    <td style={{ padding:"10px 16px" }}>
                      <Badge label={e.action} bg={(CLR[e.action]??"#730068")+"18"} color={CLR[e.action]??"#730068"} />
                    </td>
                    <td style={{ padding:"10px 16px", color:"#333" }}>{e.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function SettingsPanel({ onAction }: { onAction: () => void }) {
  const [settings, setSettings] = useState<AdminSettings>(DEFAULT_SETTINGS);
  const [showPass, setShowPass] = useState(false);
  const [saved, setSaved]       = useState(false);

  useEffect(() => { setSettings(getSettings()); }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettingsLS(settings);
    addAudit("SETTINGS", "Admin settings updated");
    addNotif("Admin settings were updated", "info");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    onAction();
  };

  const handleReset = () => {
    if (!confirm("Reset ALL data? This cannot be undone.")) return;
    ["ndlp_books","ndlp_students","ndlp_teachers","ndlp_pending","ndlp_audit","ndlp_notifs","ndlp_settings","ndlp_custom_cats"].forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };

  return (
    <div>
      <SectionTitle title="Settings" sub="Configure admin portal preferences" />
      <form onSubmit={handleSave}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {/* General */}
            <div style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #730068", padding:24 }}>
              <span style={{ fontSize:13, fontWeight:700, color:"#333", display:"block", marginBottom:16 }}>General Settings</span>
              <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:16 }}>
                <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>Site Name</label>
                <input value={settings.siteName} onChange={e => setSettings(p => ({...p,siteName:e.target.value}))} style={INPUT} />
              </div>
              {[
                { label:"Allow Student Self-Registration", sub:"", key:"allowReg" as const },
                { label:"Email Notifications",            sub:"Send alerts to admin email", key:"emailAlerts" as const },
                { label:"Maintenance Mode",               sub:"Shows maintenance page to all users", key:"maintenance" as const },
              ].map(f => (
                <div key={f.key} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:14, paddingBottom:14, borderTop:"1px solid #f0f0f0" }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:"#333" }}>{f.label}</div>
                    {f.sub && <div style={{ fontSize:11, color: f.key==="maintenance"?"#e53935":"#bbb", marginTop:2 }}>{f.sub}</div>}
                  </div>
                  <Toggle val={settings[f.key]} onToggle={() => setSettings(p => ({...p,[f.key]:!p[f.key]}))} />
                </div>
              ))}
            </div>

            {/* Security */}
            <div style={{ background:"#fff", border:"1px solid #d6d6d6", borderTop:"4px solid #e53935", padding:24 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                <Lock style={{ width:14, height:14, color:"#e53935" }} />
                <span style={{ fontSize:13, fontWeight:700, color:"#333" }}>Change Admin Password</span>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                <label style={{ fontSize:11, fontWeight:700, color:"#666", textTransform:"uppercase", letterSpacing:"0.08em" }}>New Password</label>
                <div style={{ position:"relative" }}>
                  <input type={showPass?"text":"password"} value={settings.adminPass} onChange={e => setSettings(p => ({...p,adminPass:e.target.value}))} style={{ ...INPUT, paddingRight:40 }} />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#bbb", display:"flex" }}>
                    {showPass ? <EyeOff style={{ width:14, height:14 }} /> : <Eye style={{ width:14, height:14 }} />}
                  </button>
                </div>
                <p style={{ fontSize:11, color:"#aaa", marginTop:2 }}>This updates the password used to log in to the admin portal.</p>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ background:"#730068", padding:20 }}>
              <span style={{ color:"#fff", fontSize:13, fontWeight:700, display:"block", marginBottom:12 }}>Data Overview</span>
              {[
                { label:"Books in Library",   value: getBooks().length },
                { label:"Enrolled Students",  value: getStudents().length },
                { label:"Teaching Staff",     value: getTeachers().length },
                { label:"Pending Approvals",  value: getPending().length },
                { label:"Audit Entries",      value: getAudit().length },
              ].map(s => (
                <div key={s.label} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:12, color:"rgba(255,255,255,0.55)" }}>{s.label}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:"#ff9f08" }}>{s.value}</span>
                </div>
              ))}
            </div>
            <div style={{ background:"#fff", border:"1px solid #d6d6d6", padding:20 }}>
              <span style={{ fontSize:13, fontWeight:700, color:"#e53935", display:"block", marginBottom:12 }}>Danger Zone</span>
              <button type="button" onClick={handleReset} style={{ width:"100%", background:"#fff", border:"1px solid #e53935", color:"#e53935", cursor:"pointer", fontSize:12, fontWeight:700, padding:"9px 0" }}>
                Reset All Data
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginTop:20, display:"flex", alignItems:"center", gap:12 }}>
          <button type="submit" style={{ background:"linear-gradient(90deg,#730068,#5a0050)", color:"#fff", border:"none", cursor:"pointer", fontSize:13, fontWeight:700, padding:"10px 28px", display:"flex", alignItems:"center", gap:6 }}>
            <Save style={{ width:14, height:14 }} /> Save Settings
          </button>
          {saved && (
            <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, fontWeight:600, color:"#3aa04a" }}>
              <CheckCircle style={{ width:14, height:14 }} /> Settings saved!
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

// ─── Main AdminPage ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem]   = useState("Dashboard");
  const [unread, setUnread]           = useState(0);

  const refreshHeader = useCallback(() => {
    setUnread(getNotifs().filter(n => !n.read).length);
  }, []);

  useEffect(() => { refreshHeader(); }, [refreshHeader]);

  const nav = (section: string) => { setActiveItem(section); };

  const renderSection = () => {
    switch (activeItem) {
      case "Dashboard":           return <Dashboard nav={nav} />;
      case "Book Management":     return <BookManagement onAction={refreshHeader} />;
      case "Category Management": return <CategoryManagement onAction={refreshHeader} />;
      case "Student Management":  return <StudentManagement onAction={refreshHeader} />;
      case "Teacher Management":  return <TeacherManagement onAction={refreshHeader} />;
      case "Department Management": return <DepartmentManagement />;
      case "Content Approval":    return <ContentApproval onAction={refreshHeader} />;
      case "Reports & Analytics": return <ReportsAnalytics />;
      case "Notifications":       return <NotificationsPanel onAction={refreshHeader} />;
      case "Audit Logs":          return <AuditLogs />;
      case "Settings":            return <SettingsPanel onAction={refreshHeader} />;
      default:                    return <Dashboard nav={nav} />;
    }
  };

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", background:"#ededed" }}>
      {/* Sidebar */}
      <aside style={{ width:sidebarOpen?240:56, flexShrink:0, background:"#730068", display:"flex", flexDirection:"column", transition:"width 0.25s", overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:16, borderBottom:"1px solid rgba(255,255,255,0.15)", flexShrink:0 }}>
          <div style={{ width:32, height:32, background:"#ff9f08", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <Shield style={{ width:16, height:16, color:"#fff" }} />
          </div>
          {sidebarOpen && (
            <div style={{ overflow:"hidden" }}>
              <div style={{ color:"#fff", fontSize:12, fontWeight:700, whiteSpace:"nowrap" }}>Admin Portal</div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, whiteSpace:"nowrap" }}>National Digital Library</div>
            </div>
          )}
        </div>

        <nav style={{ flex:1, overflowY:"auto", paddingTop:10, paddingBottom:10, paddingLeft:6, paddingRight:6 }}>
          {SIDEBAR_ITEMS.map(item => {
            const Icon     = item.icon;
            const isActive = activeItem===item.label;
            const badge    = item.label==="Notifications" ? unread : item.label==="Content Approval" ? getPending().length : 0;
            return (
              <button key={item.label}
                onClick={() => { setActiveItem(item.label); refreshHeader(); }}
                title={!sidebarOpen ? item.label : undefined}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 10px", marginBottom:2, border:"none", cursor:"pointer", textAlign:"left", overflow:"hidden", background:isActive?"rgba(255,159,8,0.25)":"transparent", color:isActive?"#fff":"rgba(255,255,255,0.55)", transition:"background 0.15s, color 0.15s" }}
                onMouseEnter={e => { if(!isActive)(e.currentTarget as HTMLButtonElement).style.color="rgba(255,255,255,0.85)"; }}
                onMouseLeave={e => { if(!isActive)(e.currentTarget as HTMLButtonElement).style.color="rgba(255,255,255,0.55)"; }}
              >
                <Icon style={{ width:16, height:16, flexShrink:0, color:isActive?"#ff9f08":"inherit" }} />
                {sidebarOpen && <span style={{ fontSize:13, fontWeight:isActive?700:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", flex:1 }}>{item.label}</span>}
                {sidebarOpen && badge>0 && (
                  <span style={{ fontSize:10, fontWeight:700, background:"#e53935", color:"#fff", padding:"1px 5px", borderRadius:8, flexShrink:0 }}>{badge}</span>
                )}
                {sidebarOpen && isActive && <div style={{ width:6, height:6, borderRadius:"50%", background:"#ff9f08", flexShrink:0 }} />}
              </button>
            );
          })}
        </nav>

        <div style={{ borderTop:"1px solid rgba(255,255,255,0.15)", padding:8, flexShrink:0 }}>
          <button onClick={() => router.push("/login")}
            style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 10px", border:"none", cursor:"pointer", background:"transparent", color:"rgba(255,255,255,0.5)", transition:"all 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(239,68,68,0.15)"; (e.currentTarget as HTMLButtonElement).style.color="#fca5a5"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="transparent"; (e.currentTarget as HTMLButtonElement).style.color="rgba(255,255,255,0.5)"; }}
          >
            <LogOut style={{ width:16, height:16, flexShrink:0 }} />
            {sidebarOpen && <span style={{ fontSize:13, fontWeight:500 }}>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {/* Top bar */}
        <header style={{ height:56, background:"#fff", borderBottom:"1px solid #d6d6d6", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, paddingLeft:24, paddingRight:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background:"none", border:"none", cursor:"pointer", color:"#888", display:"flex", padding:4 }}
              onMouseEnter={e => (e.currentTarget.style.color="#333")} onMouseLeave={e => (e.currentTarget.style.color="#888")}>
              {sidebarOpen ? <X style={{ width:18, height:18 }} /> : <Menu style={{ width:18, height:18 }} />}
            </button>
            <h1 style={{ fontSize:14, fontWeight:700, color:"#333" }}>{activeItem}</h1>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button onClick={() => { setActiveItem("Notifications"); refreshHeader(); }}
              style={{ position:"relative", width:36, height:36, background:"#f5f5f5", border:"1px solid #d6d6d6", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#888" }}
              onMouseEnter={e => (e.currentTarget.style.color="#333")} onMouseLeave={e => (e.currentTarget.style.color="#888")}
              aria-label="Notifications">
              <Bell style={{ width:16, height:16 }} />
              {unread>0 && <span style={{ position:"absolute", top:-4, right:-4, width:16, height:16, borderRadius:"50%", background:"#e53935", color:"#fff", fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>{unread}</span>}
            </button>
            <div style={{ display:"flex", alignItems:"center", gap:8, background:"#f5f5f5", border:"1px solid #d6d6d6", padding:"6px 12px" }}>
              <div style={{ width:24, height:24, background:"#730068", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"#fff", fontSize:9, fontWeight:700 }}>SA</span>
              </div>
              <span style={{ fontSize:12, fontWeight:600, color:"#333" }}>Super Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex:1, overflowY:"auto", padding:24 }} id="admin-main">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import {
  BookOpen, Users, FileText, Download, TrendingUp, Bell, Settings,
  BarChart3, Shield, LogOut, Menu, X, Search, ChevronRight, Eye, Edit,
  Trash2, Plus, CheckCircle, Clock, AlertCircle, Home, Layers, GraduationCap,
  Building2, Activity, Lock
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { icon: Home, label: "Dashboard" },
  { icon: BookOpen, label: "Book Management" },
  { icon: Layers, label: "Category Management" },
  { icon: Users, label: "Student Management" },
  { icon: GraduationCap, label: "Teacher Management" },
  { icon: Building2, label: "Department Management" },
  { icon: FileText, label: "Content Approval" },
  { icon: BarChart3, label: "Reports & Analytics" },
  { icon: Bell, label: "Notifications" },
  { icon: Activity, label: "Audit Logs" },
  { icon: Settings, label: "Settings" },
];

const STAT_CARDS = [
  { label: "Total Books", value: "2,547,832", change: "+1,245 this week", icon: BookOpen, color: "#1a6ebb" },
  { label: "Active Members", value: "1,24,890", change: "+892 this month", icon: Users, color: "#3aa04a" },
  { label: "Downloads Today", value: "18,642", change: "+12.4% vs yesterday", icon: Download, color: "#ff9f08" },
  { label: "Pending Approvals", value: "47", change: "Needs attention", icon: AlertCircle, color: "#e53935" },
];

const RECENT_BOOKS = [
  { title: "Advanced Machine Learning", author: "Bishop, C.M.", dept: "CS", status: "approved", date: "Today" },
  { title: "Constitutional Law of India", author: "J.N. Pandey", dept: "Law", status: "pending", date: "Today" },
  { title: "Organic Chemistry Vol. 3", author: "Morrison & Boyd", dept: "Science", status: "approved", date: "Yesterday" },
  { title: "Microeconomics Theory", author: "Mas-Colell et al.", dept: "Commerce", status: "review", date: "2 days ago" },
  { title: "Civil Engineering Handbook", author: "Braja Das", dept: "Engg", status: "approved", date: "3 days ago" },
];

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  approved: { bg: "#3aa04a18", text: "#3aa04a" },
  pending:  { bg: "#ff9f0820", text: "#c47a00" },
  review:   { bg: "#1a6ebb18", text: "#1a6ebb" },
};

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#ededed" }}>
      {/* Sidebar — NIC purple */}
      <aside
        className={`${sidebarOpen ? "w-60" : "w-14"} flex-shrink-0 flex flex-col transition-all duration-300`}
        style={{ background: "#730068" }}
        aria-label="Admin sidebar navigation"
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 p-4 border-b border-white/15 ${!sidebarOpen && "justify-center"}`}>
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: "#ff9f08" }}>
            <Shield className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <div className="text-white text-xs font-bold leading-none">Admin Portal</div>
              <div className="text-white/40 text-xs">National Digital Library</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2" aria-label="Admin navigation">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveItem(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-left ${
                  isActive ? "text-white" : "text-white/55 hover:text-white/85"
                } ${!sidebarOpen && "justify-center"}`}
                style={isActive ? { background: "rgba(255,159,8,0.25)" } : {}}
                aria-current={isActive ? "page" : undefined}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" style={isActive ? { color: "#ff9f08" } : {}} />
                {sidebarOpen && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
                {sidebarOpen && isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#ff9f08" }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className={`p-3 border-t border-white/15 ${!sidebarOpen && "flex justify-center"}`}>
          <button className={`flex items-center gap-3 px-3 py-2.5 text-white/50 hover:bg-red-500/15 hover:text-red-300 transition-all w-full ${!sidebarOpen && "justify-center"}`}>
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-[#d6d6d6] flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#888] hover:text-[#333] transition-colors"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-sm font-bold text-[#333]">{activeItem}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search admin panel"
                className="bg-[#f5f5f5] border border-[#d6d6d6] pl-9 pr-4 py-1.5 text-sm text-[#333] placeholder-[#bbb]/70 focus:outline-none focus:border-[#ff9f08] w-44 transition-colors"
              />
            </div>
            <button aria-label="Notifications" className="relative w-9 h-9 bg-[#f5f5f5] border border-[#d6d6d6] flex items-center justify-center text-[#888] hover:text-[#333]">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">3</span>
            </button>
            <div className="flex items-center gap-2 bg-[#f5f5f5] border border-[#d6d6d6] px-3 py-1.5">
              <div className="w-6 h-6 flex items-center justify-center" style={{ background: "#730068" }}>
                <span className="text-white text-[9px] font-bold">SA</span>
              </div>
              <span className="text-xs font-semibold text-[#333] hidden sm:inline">Super Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6" id="admin-main">
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
            {STAT_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="bg-white border border-[#d6d6d6] p-4"
                  style={{ borderTop: `6px solid ${card.color}` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#888] font-medium">{card.label}</span>
                    <div className="w-9 h-9 flex items-center justify-center" style={{ background: `${card.color}18` }}>
                      <Icon className="w-4 h-4" style={{ color: card.color }} />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-[#333] mb-1 tabular-nums">{card.value}</div>
                  <div className="text-xs font-medium flex items-center gap-1" style={{ color: card.color === "#e53935" ? "#e53935" : "#3aa04a" }}>
                    <TrendingUp className="w-3 h-3" />
                    {card.change}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* Recent Books Table */}
            <div className="xl:col-span-2 bg-white border border-[#d6d6d6] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#e0e0e0]" style={{ borderTop: "4px solid #ff9f08" }}>
                <h2 className="font-bold text-[#333] text-sm">Recently Added Books</h2>
                <button className="flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: "#ff6600" }}>
                  <Plus className="w-3.5 h-3.5" /> Add Book
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" aria-label="Recently added books">
                  <thead>
                    <tr style={{ background: "#f5f5f5" }}>
                      {["Title", "Author", "Dept", "Status", "Date", "Actions"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-[#888] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f0]">
                    {RECENT_BOOKS.map((book, i) => (
                      <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                        <td className="px-4 py-3 font-semibold text-[#333] max-w-[180px] truncate">{book.title}</td>
                        <td className="px-4 py-3 text-[#777] whitespace-nowrap text-xs">{book.author}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-bold px-2 py-0.5" style={{ background: "#730068" + "18", color: "#730068" }}>{book.dept}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="text-xs font-bold px-2 py-0.5 capitalize"
                            style={{
                              background: STATUS_STYLES[book.status]?.bg ?? "#f0f0f0",
                              color: STATUS_STYLES[book.status]?.text ?? "#555",
                            }}
                          >
                            {book.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#999] whitespace-nowrap text-xs">{book.date}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button aria-label="View book" className="w-7 h-7 bg-[#f5f5f5] border border-[#e0e0e0] flex items-center justify-center text-[#888] hover:text-[#1a6ebb] transition-colors">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button aria-label="Edit book" className="w-7 h-7 bg-[#f5f5f5] border border-[#e0e0e0] flex items-center justify-center text-[#888] hover:text-[#ff9f08] transition-colors">
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button aria-label="Delete book" className="w-7 h-7 bg-[#f5f5f5] border border-[#e0e0e0] flex items-center justify-center text-[#888] hover:text-[#e53935] transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side panels */}
            <div className="flex flex-col gap-4">
              {/* System Status */}
              <div className="bg-white border border-[#d6d6d6] p-4" style={{ borderTop: "4px solid #3aa04a" }}>
                <h2 className="font-bold text-[#333] text-sm mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4" style={{ color: "#3aa04a" }} />
                  System Status
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Database", status: "Online", ok: true },
                    { label: "Storage (AWS S3)", status: "Online", ok: true },
                    { label: "Search Engine", status: "Online", ok: true },
                    { label: "Email Service", status: "Degraded", ok: false },
                    { label: "Redis Cache", status: "Online", ok: true },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="text-xs text-[#777]">{s.label}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.ok ? "#3aa04a" : "#fea500" }} />
                        <span className="text-xs font-semibold" style={{ color: s.ok ? "#3aa04a" : "#c47a00" }}>{s.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending actions */}
              <div className="bg-white border border-[#d6d6d6] p-4" style={{ borderTop: "4px solid #fea500" }}>
                <h2 className="font-bold text-[#333] text-sm mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: "#fea500" }} />
                  Pending Actions
                </h2>
                <div className="flex flex-col gap-1.5">
                  {[
                    { label: "Content approvals", count: 47, color: "#e53935" },
                    { label: "New member requests", count: 23, color: "#fea500" },
                    { label: "Resource reports", count: 8, color: "#1a6ebb" },
                    { label: "System alerts", count: 3, color: "#3aa04a" },
                  ].map((p) => (
                    <button key={p.label} className="flex items-center justify-between p-2 hover:bg-[#f5f5f5] transition-colors group w-full text-left">
                      <span className="text-xs text-[#444]">{p.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5" style={{ background: `${p.color}18`, color: p.color }}>{p.count}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#ccc] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Security */}
              <div className="p-4" style={{ background: "#730068" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4" style={{ color: "#ff9f08" }} />
                  <span className="text-white text-sm font-bold">Security Center</span>
                </div>
                <p className="text-white/50 text-xs mb-3">Last security scan: 2 hours ago</p>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: "#3aa04a" }} />
                  <span className="text-xs text-white/70">No threats detected</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

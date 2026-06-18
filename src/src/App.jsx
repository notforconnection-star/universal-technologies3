import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  Menu, X, ChevronRight, ChevronDown, Upload, FileText, CreditCard,
  CheckCircle2, Clock, AlertCircle, User, LogOut, LayoutDashboard,
  Search, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin,
  Shield, Zap, Smartphone, Wallet, Building2, FileCheck2, Contact,
  Vote, Plane, Receipt, FileSignature, Home as HomeIcon, FileSpreadsheet,
  ScrollText, Download, Eye, EyeOff, Bell, Settings, Trash2, Plus,
  ArrowRight, Star, MessageCircle, Globe2, Lock, BadgeCheck, TrendingUp,
  Users, Award, HelpCircle, ChevronLeft, PlayCircle, Filter
} from "lucide-react";

/* ============================================================
   UNIVERSAL TECHNOLOGIES — Service Portal
   Design tokens:
   --ut-navy: #0F1B3D (darkest, header/footer bg)
   --ut-indigo: #1B2A5E (primary brand)
   --ut-indigo-light: #2D407F
   --ut-gold: #D4A537 (accent / CTA)
   --ut-gold-light: #E8C468
   --ut-bg: #F7F8FA (page background)
   --ut-ink: #16213F (headings)
   --ut-slate: #5B6479 (body text)
   --ut-line: #E3E7EF (hairline borders)
   --ut-emerald: #16A34A (success/completed)
   --ut-amber: #D97706 (in progress)
   --ut-rose: #DC2626 (error/pending-attention)
   Type: "Manrope" display, "Inter" body/UI
   ============================================================ */

const TOKENS = `
  :root {
    --ut-navy: #0F1B3D;
    --ut-indigo: #1B2A5E;
    --ut-indigo-light: #2D407F;
    --ut-gold: #D4A537;
    --ut-gold-light: #E8C468;
    --ut-bg: #F7F8FA;
    --ut-card: #FFFFFF;
    --ut-ink: #16213F;
    --ut-slate: #5B6479;
    --ut-slate-light: #8993A8;
    --ut-line: #E3E7EF;
    --ut-emerald: #16A34A;
    --ut-emerald-bg: #ECFDF3;
    --ut-amber: #D97706;
    --ut-amber-bg: #FFFAEB;
    --ut-rose: #DC2626;
    --ut-rose-bg: #FEF3F2;
    --ut-radius: 14px;
    --ut-radius-sm: 9px;
    --ut-shadow: 0 1px 2px rgba(15,27,61,0.04), 0 8px 24px -8px rgba(15,27,61,0.10);
    --ut-shadow-lg: 0 4px 8px rgba(15,27,61,0.04), 0 24px 48px -16px rgba(15,27,61,0.18);
  }
  * { box-sizing: border-box; }
  .ut-root {
    font-family: 'Inter', -apple-system, sans-serif;
    background: var(--ut-bg);
    color: var(--ut-ink);
    min-height: 100vh;
    width: 100%;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }
  .ut-root h1, .ut-root h2, .ut-root h3, .ut-root h4, .ut-display {
    font-family: 'Manrope', 'Inter', sans-serif;
    letter-spacing: -0.02em;
    color: var(--ut-ink);
    margin: 0;
  }
  .ut-root p { margin: 0; }
  .ut-root button { font-family: inherit; cursor: pointer; }
  .ut-root a { text-decoration: none; color: inherit; }
  .ut-root input, .ut-root select, .ut-root textarea { font-family: inherit; }
  .ut-root *:focus-visible {
    outline: 2px solid var(--ut-gold);
    outline-offset: 2px;
    border-radius: 4px;
  }
  .ut-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  @media (max-width: 640px) { .ut-container { padding: 0 18px; } }

  @keyframes ut-fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes ut-fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes ut-scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes ut-pulseDot { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes ut-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes ut-floaty { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
  @keyframes ut-spin { to { transform: rotate(360deg); } }
  @keyframes ut-progressFill { from { width: 0%; } }
  @keyframes ut-ticketMove { 0% { left: 2%; } 50% { left: 48%; } 100% { left: 92%; } }

  .ut-animate-up { animation: ut-fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }
  .ut-animate-in { animation: ut-fadeIn 0.5s ease both; }

  @media (prefers-reduced-motion: reduce) {
    .ut-root *, .ut-root *::before, .ut-root *::after {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
    }
  }

  .ut-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    font-weight: 700; font-size: 14.5px; border-radius: 999px; border: none;
    padding: 13px 24px; transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
    white-space: nowrap;
  }
  .ut-btn:active { transform: scale(0.97); }
  .ut-btn-gold { background: var(--ut-gold); color: var(--ut-navy); box-shadow: 0 1px 0 rgba(0,0,0,0.05); }
  .ut-btn-gold:hover { background: var(--ut-gold-light); box-shadow: 0 8px 20px -6px rgba(212,165,55,0.55); }
  .ut-btn-navy { background: var(--ut-indigo); color: #fff; }
  .ut-btn-navy:hover { background: var(--ut-indigo-light); box-shadow: 0 8px 20px -6px rgba(27,42,94,0.45); }
  .ut-btn-ghost { background: transparent; color: var(--ut-indigo); border: 1.5px solid var(--ut-line); }
  .ut-btn-ghost:hover { border-color: var(--ut-indigo); background: #F2F4F9; }
  .ut-btn-white { background: #fff; color: var(--ut-indigo); }
  .ut-btn-white:hover { box-shadow: 0 8px 20px -6px rgba(0,0,0,0.25); }
  .ut-btn-sm { padding: 9px 16px; font-size: 13px; }
  .ut-btn-block { width: 100%; }
  .ut-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  .ut-card { background: var(--ut-card); border: 1px solid var(--ut-line); border-radius: var(--ut-radius); box-shadow: var(--ut-shadow); }
  .ut-chip { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 999px; font-size: 12.5px; font-weight: 700; }
  .ut-input-wrap { display: flex; flex-direction: column; gap: 7px; }
  .ut-label { font-size: 13px; font-weight: 700; color: var(--ut-ink); }
  .ut-input {
    border: 1.5px solid var(--ut-line); border-radius: 10px; padding: 12px 14px; font-size: 14.5px;
    color: var(--ut-ink); background: #fff; transition: border-color 0.15s ease, box-shadow 0.15s ease; width: 100%;
  }
  .ut-input:focus { border-color: var(--ut-indigo); box-shadow: 0 0 0 4px rgba(27,42,94,0.08); outline: none; }
  .ut-input::placeholder { color: var(--ut-slate-light); }
`;

/* ---------------- Tiny router (no external deps) ---------------- */
const RouterCtx = createContext(null);
function useRouter() { return useContext(RouterCtx); }

/* ---------------- Auth context (demo only) ---------------- */
const AuthCtx = createContext(null);
function useAuth() { return useContext(AuthCtx); }

function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {name, email, phone}
  const login = (email) => setUser({ name: email.split("@")[0].replace(/\W/g," ").trim() || "Customer", email, phone: "+91 98765 43210" });
  const logout = () => setUser(null);
  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>;
}

/* ---------------- Demo data ---------------- */
const SERVICES = [
  { id: "pan-card", name: "PAN Card Services", icon: Contact, category: "Identity", price: 249, time: "5–7 days", desc: "New PAN application, corrections, and reprints handled end-to-end.", docs: ["Aadhaar Card", "Passport-size Photo", "Proof of Date of Birth"] },
  { id: "aadhaar", name: "Aadhaar Services", icon: Users, category: "Identity", price: 199, time: "3–5 days", desc: "Update name, address, mobile, or enrol for a new Aadhaar.", docs: ["Existing Aadhaar (if any)", "Address Proof", "Passport-size Photo"] },
  { id: "voter-id", name: "Voter ID Services", icon: Vote, category: "Identity", price: 179, time: "10–15 days", desc: "New voter registration, correction, or address transfer.", docs: ["Age Proof", "Address Proof", "Passport-size Photo"] },
  { id: "passport", name: "Passport Application", icon: Plane, category: "Travel", price: 499, time: "15–20 days", desc: "Fresh passport, renewal, or appointment assistance.", docs: ["Aadhaar Card", "Birth Certificate", "Address Proof", "Photos"] },
  { id: "itr", name: "Income Tax Return (ITR)", icon: Receipt, category: "Finance", price: 599, time: "2–4 days", desc: "ITR filing for salaried, business, and freelance income.", docs: ["PAN Card", "Form 16 / Income Proof", "Bank Statement"] },
  { id: "gst", name: "GST Registration & Returns", icon: FileSpreadsheet, category: "Finance", price: 899, time: "5–7 days", desc: "New GST registration and monthly/quarterly return filing.", docs: ["PAN Card", "Business Address Proof", "Bank Details"] },
  { id: "affidavit", name: "Affidavit Services", icon: FileSignature, category: "Legal", price: 299, time: "1–2 days", desc: "Notarised affidavits for name change, address, and more.", docs: ["ID Proof", "Supporting Documents"] },
  { id: "rent-agreement", name: "Rent Agreement", icon: HomeIcon, category: "Legal", price: 349, time: "1–2 days", desc: "Legally valid rent agreement drafting and registration support.", docs: ["ID Proof (Owner & Tenant)", "Property Address Proof"] },
  { id: "resume", name: "Resume Making", icon: ScrollText, category: "Other", price: 149, time: "1 day", desc: "Professional resume design tailored to your industry.", docs: ["Work Details / Old Resume (optional)", "Photo (optional)"] },
  { id: "form-filling", name: "Online Form Filling", icon: FileCheck2, category: "Other", price: 99, time: "Same day", desc: "Govt. and private form filling — exams, scholarships, jobs.", docs: ["Relevant ID Proof", "Form-specific documents"] },
  { id: "digital-doc", name: "Digital Documentation", icon: FileText, category: "Other", price: 199, time: "1–2 days", desc: "Scanning, formatting, and digital storage of important papers.", docs: ["Original/Scanned Documents"] },
  { id: "income-cert", name: "Income / Caste Certificate", icon: Building2, category: "Identity", price: 249, time: "7–10 days", desc: "Income, caste, and domicile certificate applications.", docs: ["Aadhaar Card", "Address Proof", "Income Proof"] },
];

const CATEGORIES = ["All", "Identity", "Travel", "Finance", "Legal", "Other"];

const DEMO_ORDERS = [
  { id: "UT-10293", service: "PAN Card Services", date: "2026-06-02", status: "completed", amount: 249, docs: ["aadhaar.pdf", "photo.jpg"] },
  { id: "UT-10311", service: "GST Registration & Returns", date: "2026-06-09", status: "in-progress", amount: 899, docs: ["pan.pdf", "address_proof.pdf"] },
  { id: "UT-10325", service: "Rent Agreement", date: "2026-06-15", status: "pending", amount: 349, docs: ["id_owner.pdf"] },
];

const STATUS_META = {
  pending: { label: "Pending", color: "var(--ut-rose)", bg: "var(--ut-rose-bg)", Icon: Clock },
  "in-progress": { label: "In Progress", color: "var(--ut-amber)", bg: "var(--ut-amber-bg)", Icon: AlertCircle },
  completed: { label: "Completed", color: "var(--ut-emerald)", bg: "var(--ut-emerald-bg)", Icon: CheckCircle2 },
};

/* ============================================================
   HEADER (steady / sticky, always correct active tab)
   ============================================================ */
function Header() {
  const { path, navigate } = useRouter();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [path]);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Pricing", to: "/pricing" },
    { label: "Track Order", to: "/track" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const isActive = (to) => (to === "/" ? path === "/" : path.startsWith(to));

  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.92)" : "#fff",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--ut-line)",
        transition: "box-shadow 0.25s ease, background 0.25s ease",
        boxShadow: scrolled ? "0 6px 24px -12px rgba(15,27,61,0.18)" : "none",
      }}
    >
      <div className="ut-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 10, padding: 0 }} aria-label="Universal Technologies home">
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, var(--ut-indigo), var(--ut-navy))",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            boxShadow: "0 4px 10px -2px rgba(27,42,94,0.4)"
          }}>
            <Shield size={21} color="var(--ut-gold)" strokeWidth={2.2} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.1 }}>
            <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 17, color: "var(--ut-ink)", letterSpacing: "-0.01em" }}>Universal Technologies</span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ut-gold)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Document &amp; Service Portal</span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="ut-desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              style={{
                border: "none", padding: "9px 14px", borderRadius: 999,
                fontSize: 14, fontWeight: 600,
                color: isActive(item.to) ? "var(--ut-indigo)" : "var(--ut-slate)",
                background: isActive(item.to) ? "#EEF1F8" : "transparent",
                transition: "all 0.15s ease",
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="ut-desktop-actions">
          {user ? (
            <>
              <button className="ut-btn ut-btn-ghost ut-btn-sm" onClick={() => navigate("/dashboard")}>
                <LayoutDashboard size={15} /> Dashboard
              </button>
              <button className="ut-btn ut-btn-navy ut-btn-sm" onClick={() => { logout(); navigate("/"); }}>
                <LogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <>
              <button className="ut-btn ut-btn-ghost ut-btn-sm" onClick={() => navigate("/login")}>Log In</button>
              <button className="ut-btn ut-btn-gold ut-btn-sm" onClick={() => navigate("/signup")}>Sign Up</button>
            </>
          )}
        </div>

        <button className="ut-mobile-toggle" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu" style={{ background: "none", border: "none", display: "none", padding: 6 }}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="ut-mobile-panel"
        style={{
          display: mobileOpen ? "block" : "none",
          borderTop: "1px solid var(--ut-line)",
          background: "#fff",
        }}
      >
        <div className="ut-container" style={{ padding: "14px 24px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map((item) => (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              style={{
                background: isActive(item.to) ? "#EEF1F8" : "none", border: "none", textAlign: "left",
                padding: "12px 14px", borderRadius: 10, fontSize: 15.5, fontWeight: 600,
                color: isActive(item.to) ? "var(--ut-indigo)" : "var(--ut-ink)",
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            {user ? (
              <>
                <button className="ut-btn ut-btn-ghost ut-btn-block" onClick={() => navigate("/dashboard")}><LayoutDashboard size={15} /> Dashboard</button>
                <button className="ut-btn ut-btn-navy ut-btn-block" onClick={() => { logout(); navigate("/"); }}><LogOut size={15} /> Logout</button>
              </>
            ) : (
              <>
                <button className="ut-btn ut-btn-ghost ut-btn-block" onClick={() => navigate("/login")}>Log In</button>
                <button className="ut-btn ut-btn-gold ut-btn-block" onClick={() => navigate("/signup")}>Sign Up</button>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .ut-desktop-nav, .ut-desktop-actions { display: none !important; }
          .ut-mobile-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  const { navigate } = useRouter();
  const cols = [
    { title: "Services", links: [["PAN Card", "pan-card"], ["Aadhaar", "aadhaar"], ["Passport", "passport"], ["ITR Filing", "itr"], ["GST Registration", "gst"]] },
    { title: "Company", links: [["About Us", null], ["Contact", null], ["Pricing", null], ["Track Order", null]] },
    { title: "Support", links: [["Help Center", null], ["WhatsApp Support", null], ["Refund Policy", null], ["Terms of Service", null], ["Privacy Policy", null]] },
  ];
  return (
    <footer style={{ background: "var(--ut-navy)", color: "#C7CCDB", marginTop: 0 }}>
      <div className="ut-container" style={{ padding: "64px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40 }} className="ut-footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(212,165,55,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Shield size={18} color="var(--ut-gold)" />
              </div>
              <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 17, color: "#fff" }}>Universal Technologies</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#9AA2B8", maxWidth: 320 }}>
              Your neighbourhood document and government-service centre — now online. Apply, pay, and upload from anywhere; collect your finished documents digitally.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <button key={i} aria-label="Social link" style={{
                  width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s ease"
                }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(212,165,55,0.25)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                >
                  <Icon size={15} color="#fff" />
                </button>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 style={{ color: "#fff", fontSize: 13.5, fontWeight: 700, marginBottom: 16, letterSpacing: "0.03em", textTransform: "uppercase" }}>{col.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {col.links.map(([label, id]) => (
                  <button
                    key={label}
                    onClick={() => id ? navigate(`/service/${id}`) : navigate("/")}
                    style={{ background: "none", border: "none", textAlign: "left", padding: 0, fontSize: 14, color: "#9AA2B8", transition: "color 0.15s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#9AA2B8"}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 48, paddingTop: 28, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 22 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#9AA2B8" }}><MapPin size={15} color="var(--ut-gold)" /> Shop No. 14, Main Market Road, Sector 21, New Delhi – 110021</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#9AA2B8" }}><Phone size={15} color="var(--ut-gold)" /> +91 98765 43210</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#9AA2B8" }}><Mail size={15} color="var(--ut-gold)" /> support@universaltech.in</span>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <span className="ut-chip" style={{ background: "rgba(255,255,255,0.06)", color: "#C7CCDB" }}><Lock size={12} /> SSL Secured</span>
            <span className="ut-chip" style={{ background: "rgba(255,255,255,0.06)", color: "#C7CCDB" }}><Shield size={12} /> Razorpay Verified</span>
          </div>
        </div>
        <p style={{ fontSize: 12.5, color: "#717A93", marginTop: 24, textAlign: "center" }}>© 2026 Universal Technologies. All rights reserved. Made for citizens, by your local service centre.</p>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .ut-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .ut-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

/* ============================================================
   SHARED: Section heading
   ============================================================ */
function Eyebrow({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ut-gold)" }} />
      <span style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ut-indigo)" }}>{children}</span>
    </div>
  );
}

/* ============================================================
   PAGE: HOME
   ============================================================ */
function LiveTrackerHero() {
  const [stage, setStage] = useState(0);
  const stages = [
    { label: "Submitted", icon: FileText },
    { label: "Payment Confirmed", icon: CreditCard },
    { label: "In Progress", icon: Clock },
    { label: "Completed", icon: CheckCircle2 },
  ];
  useEffect(() => {
    const t = setInterval(() => setStage((s) => (s + 1) % stages.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="ut-card" style={{ padding: 26, background: "linear-gradient(180deg, #fff, #FAFBFD)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ut-slate-light)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Order #UT-10342</p>
          <p style={{ fontSize: 16, fontWeight: 800, marginTop: 3 }}>PAN Card Application</p>
        </div>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--ut-emerald)", animation: "ut-pulseDot 1.6s ease infinite" }} />
      </div>

      <div style={{ position: "relative", height: 4, background: "var(--ut-line)", borderRadius: 4, marginBottom: 28 }}>
        <div style={{
          position: "absolute", top: 0, left: 0, height: 4, borderRadius: 4,
          background: "linear-gradient(90deg, var(--ut-gold), var(--ut-indigo))",
          width: `${(stage / (stages.length - 1)) * 100}%`,
          transition: "width 0.8s cubic-bezier(0.65,0,0.35,1)"
        }} />
        {stages.map((_, i) => (
          <div key={i} style={{
            position: "absolute", top: "50%", left: `${(i / (stages.length - 1)) * 100}%`,
            transform: "translate(-50%, -50%)", width: 14, height: 14, borderRadius: "50%",
            background: i <= stage ? "var(--ut-indigo)" : "#fff", border: `2.5px solid ${i <= stage ? "var(--ut-indigo)" : "var(--ut-line)"}`,
            transition: "all 0.4s ease"
          }} />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {stages.map((s, i) => {
          const Icon = s.icon;
          const active = i === stage;
          const done = i < stage;
          return (
            <div key={s.label} style={{ textAlign: "center", opacity: i <= stage ? 1 : 0.4, transition: "opacity 0.4s ease" }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center",
                background: active ? "var(--ut-gold)" : done ? "var(--ut-emerald-bg)" : "#F2F4F9",
                transform: active ? "scale(1.12)" : "scale(1)", transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)"
              }}>
                <Icon size={16} color={active ? "var(--ut-navy)" : done ? "var(--ut-emerald)" : "var(--ut-slate-light)"} />
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: active ? "var(--ut-ink)" : "var(--ut-slate-light)" }}>{s.label}</p>
            </div>
          );
        })}
      </div>
      <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--ut-slate-light)", marginTop: 20 }}>
        This is a live preview of how your order moves — start to finish, fully tracked.
      </p>
    </div>
  );
}

function HomePage() {
  const { navigate } = useRouter();
  const [revealed, setRevealed] = useState(new Set());
  const obsRef = useRef();

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setRevealed((prev) => new Set(prev).add(e.target.dataset.reveal));
        }
      });
    }, { threshold: 0.15 });
    els.forEach((el) => obs.observe(el));
    obsRef.current = obs;
    return () => obs.disconnect();
  }, []);

  const isRevealed = (id) => revealed.has(id);

  const steps = [
    { n: "01", title: "Select a service", desc: "Choose from PAN, Aadhaar, GST, ITR, Passport, and more.", icon: Search },
    { n: "02", title: "Fill the form", desc: "A short, guided form — no jargon, no confusion.", icon: FileText },
    { n: "03", title: "Upload documents", desc: "Drag and drop scans or photos straight from your phone.", icon: Upload },
    { n: "04", title: "Pay securely", desc: "UPI, cards, net banking, or wallets — your choice.", icon: CreditCard },
    { n: "05", title: "We get to work", desc: "Our team verifies and processes your application.", icon: Settings },
    { n: "06", title: "Receive your document", desc: "Delivered via dashboard, WhatsApp, or email.", icon: CheckCircle2 },
  ];

  const features = [
    { icon: Shield, title: "Bank-grade Security", desc: "SSL encryption and secure document storage on every page." },
    { icon: Zap, title: "Fast Turnaround", desc: "Most services completed within 1–7 working days." },
    { icon: MessageCircle, title: "WhatsApp Updates", desc: "Get notified the moment your status changes." },
    { icon: Wallet, title: "Flexible Payments", desc: "UPI, cards, net banking, and wallets, powered by Razorpay." },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{ background: "linear-gradient(160deg, var(--ut-navy) 0%, var(--ut-indigo) 62%, #28407e 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.5,
          backgroundImage: "radial-gradient(circle at 18% 18%, rgba(212,165,55,0.16), transparent 38%), radial-gradient(circle at 85% 75%, rgba(255,255,255,0.08), transparent 40%)"
        }} />
        <div className="ut-container" style={{ position: "relative", padding: "96px 24px 110px", display: "grid", gridTemplateColumns: "1.1fr 0.95fr", gap: 56, alignItems: "center" }}>
          <div className="ut-animate-up">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: "rgba(212,165,55,0.14)", border: "1px solid rgba(212,165,55,0.3)", marginBottom: 24 }}>
              <BadgeCheck size={14} color="var(--ut-gold)" />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ut-gold-light)" }}>Trusted by 12,000+ customers since 2014</span>
            </div>
            <h1 style={{ fontSize: "clamp(34px, 4.4vw, 52px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              Every government document.<br />Done from your phone.
            </h1>
            <p style={{ fontSize: 17, color: "#C7CCDB", lineHeight: 1.65, maxWidth: 480, marginBottom: 32 }}>
              PAN, Aadhaar, Passport, GST, ITR, and more — apply, upload documents, and pay online. We handle the paperwork; you track every step.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="ut-btn ut-btn-gold" onClick={() => navigate("/services")}>
                Explore Services <ArrowRight size={16} />
              </button>
              <button className="ut-btn ut-btn-ghost" style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff" }} onClick={() => navigate("/track")}>
                <PlayCircle size={16} /> Track an Order
              </button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap" }}>
              {[["12,000+", "Documents processed"], ["4.8/5", "Customer rating"], ["1–7 days", "Average turnaround"]].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>{num}</p>
                  <p style={{ fontSize: 12.5, color: "#9AA2B8", marginTop: 2 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="ut-animate-up" style={{ animationDelay: "0.15s" }}>
            <LiveTrackerHero />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section style={{ background: "#fff", borderBottom: "1px solid var(--ut-line)" }}>
        <div className="ut-container" style={{ padding: "22px 24px", display: "flex", flexWrap: "wrap", gap: 28, justifyContent: "center", alignItems: "center" }}>
          {[["Shield","SSL Secured Payments"],["BadgeCheck","Razorpay & Cashfree Ready"],["MessageCircle","WhatsApp Document Delivery"],["Award","12+ Years of Service"]].map(([iconName, label]) => {
            const Icon = { Shield, BadgeCheck, MessageCircle, Award }[iconName];
            return (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <Icon size={17} color="var(--ut-indigo)" />
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ut-slate)" }}>{label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{ padding: "84px 0" }}>
        <div className="ut-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <Eyebrow>What we handle</Eyebrow>
              <h2 style={{ fontSize: "clamp(26px,3vw,36px)", fontWeight: 800 }}>Popular services</h2>
            </div>
            <button className="ut-btn ut-btn-ghost ut-btn-sm" onClick={() => navigate("/services")}>View all services <ChevronRight size={15} /></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }} className="ut-services-grid">
            {SERVICES.slice(0, 8).map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  data-reveal={`svc-${i}`}
                  className="ut-card"
                  style={{
                    padding: 24, cursor: "pointer", transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    opacity: isRevealed(`svc-${i}`) ? 1 : 0,
                    transform: isRevealed(`svc-${i}`) ? "translateY(0)" : "translateY(16px)",
                    transitionDelay: `${(i % 4) * 0.06}s`
                  }}
                  onClick={() => navigate(`/service/${s.id}`)}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "var(--ut-shadow-lg)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--ut-shadow)"; }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: "#EEF1F8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={21} color="var(--ut-indigo)" />
                  </div>
                  <p style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 6 }}>{s.name}</p>
                  <p style={{ fontSize: 13, color: "var(--ut-slate)", lineHeight: 1.55, marginBottom: 14 }}>{s.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ut-indigo)" }}>From ₹{s.price}</span>
                    <ArrowRight size={15} color="var(--ut-slate-light)" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "84px 0", background: "#fff", borderTop: "1px solid var(--ut-line)", borderBottom: "1px solid var(--ut-line)" }}>
        <div className="ut-container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <Eyebrow>The workflow</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3vw,36px)", fontWeight: 800 }}>From request to document, in six steps</h2>
            <p style={{ fontSize: 15.5, color: "var(--ut-slate)", marginTop: 12, maxWidth: 560, marginInline: "auto" }}>A real sequence — each step happens only after the one before it, so you always know exactly where things stand.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="ut-steps-grid">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.n} data-reveal={`step-${i}`} style={{
                  display: "flex", gap: 16, opacity: isRevealed(`step-${i}`) ? 1 : 0,
                  transform: isRevealed(`step-${i}`) ? "translateY(0)" : "translateY(16px)",
                  transition: "all 0.5s ease", transitionDelay: `${i * 0.08}s`
                }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--ut-indigo)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={20} color="var(--ut-gold)" />
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: 11.5, fontWeight: 800, color: "var(--ut-gold)", letterSpacing: "0.05em" }}>STEP {s.n}</p>
                    <p style={{ fontSize: 15.5, fontWeight: 700, margin: "4px 0 6px" }}>{s.title}</p>
                    <p style={{ fontSize: 13.5, color: "var(--ut-slate)", lineHeight: 1.55 }}>{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "84px 0" }}>
        <div className="ut-container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow>Why Universal Technologies</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3vw,36px)", fontWeight: 800 }}>Built for trust, designed for speed</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="ut-features-grid">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} data-reveal={`feat-${i}`} className="ut-card" style={{
                  padding: 26, textAlign: "center", opacity: isRevealed(`feat-${i}`) ? 1 : 0,
                  transform: isRevealed(`feat-${i}`) ? "scale(1)" : "scale(0.94)",
                  transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)", transitionDelay: `${i * 0.07}s`
                }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#EEF1F8,#E3E8F5)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <Icon size={22} color="var(--ut-indigo)" />
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{f.title}</p>
                  <p style={{ fontSize: 13, color: "var(--ut-slate)", lineHeight: 1.55 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "84px 0", background: "var(--ut-indigo)", position: "relative", overflow: "hidden" }}>
        <div className="ut-container" style={{ position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <Eyebrow><span style={{ color: "var(--ut-gold-light)" }}>Customer stories</span></Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3vw,36px)", fontWeight: 800, color: "#fff" }}>Real people, real documents, real fast</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="ut-testimonial-grid">
            {[
              { name: "Priya Sharma", role: "GST Registration", text: "Applied for my shop's GST from home and got updates on WhatsApp the whole way. No queues, no waiting." },
              { name: "Mohammed Iqbal", role: "Passport Renewal", text: "Uploaded my documents in minutes and tracked everything from the dashboard. Genuinely stress-free." },
              { name: "Anjali Verma", role: "ITR Filing", text: "Filed my return in one sitting. Payment was instant and the final document landed in my inbox the same week." },
            ].map((t, i) => (
              <div key={t.name} data-reveal={`test-${i}`} style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: 26,
                opacity: isRevealed(`test-${i}`) ? 1 : 0, transform: isRevealed(`test-${i}`) ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.55s ease", transitionDelay: `${i * 0.1}s`
              }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} color="var(--ut-gold)" fill="var(--ut-gold)" />)}
                </div>
                <p style={{ fontSize: 14, color: "#DCE0EC", lineHeight: 1.65, marginBottom: 18 }}>"{t.text}"</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{t.name}</p>
                <p style={{ fontSize: 12.5, color: "#9AA2B8" }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "90px 0", textAlign: "center" }}>
        <div className="ut-container">
          <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 800, marginBottom: 16 }}>Ready to get your documents sorted?</h2>
          <p style={{ fontSize: 16, color: "var(--ut-slate)", marginBottom: 30, maxWidth: 480, marginInline: "auto" }}>Create your free account and submit your first request in under two minutes.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="ut-btn ut-btn-navy" onClick={() => navigate("/signup")}>Create Free Account <ArrowRight size={16} /></button>
            <button className="ut-btn ut-btn-ghost" onClick={() => navigate("/services")}>Browse Services</button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .ut-services-grid { grid-template-columns: repeat(2,1fr) !important; }
          .ut-steps-grid { grid-template-columns: repeat(2,1fr) !important; }
          .ut-features-grid { grid-template-columns: repeat(2,1fr) !important; }
          .ut-testimonial-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 760px) {
          section .ut-container > div[style*="grid-template-columns: 1.1fr"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .ut-services-grid, .ut-steps-grid, .ut-features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   PAGE: SERVICES (with filter)
   ============================================================ */
function ServicesPage() {
  const { navigate } = useRouter();
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = SERVICES.filter((s) =>
    (cat === "All" || s.category === cat) &&
    (s.name.toLowerCase().includes(query.toLowerCase()) || s.desc.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="ut-animate-in">
      <PageHero
        eyebrow="Our Services"
        title="Every document, one portal"
        subtitle="Pick a service to see what's required, how long it takes, and what it costs — then apply online in minutes."
      />
      <div className="ut-container" style={{ padding: "44px 24px 90px" }}>
        <div style={{ display: "flex", gap: 14, marginBottom: 32, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="ut-btn ut-btn-sm"
                style={{
                  background: cat === c ? "var(--ut-indigo)" : "#fff",
                  color: cat === c ? "#fff" : "var(--ut-slate)",
                  border: cat === c ? "none" : "1.5px solid var(--ut-line)",
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <div style={{ position: "relative", minWidth: 240 }}>
            <Search size={16} color="var(--ut-slate-light)" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input className="ut-input" style={{ paddingLeft: 38 }} placeholder="Search services..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ut-slate)" }}>
            <HelpCircle size={36} color="var(--ut-slate-light)" style={{ marginBottom: 12 }} />
            <p>No services match your search. Try a different keyword or category.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="ut-svc-list-grid">
            {filtered.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.id} className="ut-card ut-animate-up" style={{ padding: 26, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 11, background: "#EEF1F8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={21} color="var(--ut-indigo)" />
                    </div>
                    <span className="ut-chip" style={{ background: "#F2F4F9", color: "var(--ut-indigo)" }}>{s.category}</span>
                  </div>
                  <p style={{ fontSize: 16.5, fontWeight: 700, marginBottom: 8 }}>{s.name}</p>
                  <p style={{ fontSize: 13.5, color: "var(--ut-slate)", lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{s.desc}</p>
                  <div style={{ display: "flex", gap: 16, marginBottom: 18, fontSize: 12.5, color: "var(--ut-slate)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Clock size={13} /> {s.time}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}><CreditCard size={13} /> From ₹{s.price}</span>
                  </div>
                  <button className="ut-btn ut-btn-navy ut-btn-block" onClick={() => navigate(`/service/${s.id}`)}>
                    View &amp; Apply <ArrowRight size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <style>{`@media (max-width: 980px) { .ut-svc-list-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 620px) { .ut-svc-list-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section style={{ background: "linear-gradient(160deg, var(--ut-navy), var(--ut-indigo))", padding: "64px 0 50px" }}>
      <div className="ut-container" style={{ textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ut-gold)" }} />
          <span style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ut-gold-light)" }}>{eyebrow}</span>
        </div>
        <h1 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", marginBottom: 14 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 15.5, color: "#C7CCDB", maxWidth: 560, marginInline: "auto", lineHeight: 1.6 }}>{subtitle}</p>}
      </div>
    </section>
  );
}

/* ============================================================
   PAGE: SERVICE DETAIL + APPLY FORM
   ============================================================ */
function ServiceDetailPage() {
  const { params, navigate } = useRouter();
  const service = SERVICES.find((s) => s.id === params.id) || SERVICES[0];
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1 form, 2 upload, 3 payment, 4 done
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "", notes: "" });
  const [files, setFiles] = useState([]);
  const [payMethod, setPayMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef();

  const Icon = service.icon;

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList).map((f) => ({ name: f.name, size: (f.size / 1024).toFixed(0) + " KB" }));
    setFiles((prev) => [...prev, ...arr]);
  };

  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const goNext = () => {
    if (!user && step === 1) { navigate("/login"); return; }
    setStep((s) => Math.min(s + 1, 4));
  };

  const submitPayment = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setStep(4); }, 1600);
  };

  const stepLabels = ["Details", "Documents", "Payment", "Done"];

  return (
    <div className="ut-animate-in">
      <section style={{ background: "linear-gradient(160deg, var(--ut-navy), var(--ut-indigo))", padding: "48px 0 60px" }}>
        <div className="ut-container">
          <button onClick={() => navigate("/services")} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 6, color: "#C7CCDB", fontSize: 13.5, fontWeight: 600, marginBottom: 22 }}>
            <ChevronLeft size={16} /> Back to Services
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(212,165,55,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={26} color="var(--ut-gold)" />
            </div>
            <div>
              <h1 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, color: "#fff" }}>{service.name}</h1>
              <p style={{ fontSize: 14, color: "#C7CCDB", marginTop: 4 }}>{service.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="ut-container" style={{ padding: "40px 24px 90px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 32 }} id="ut-service-grid">
        <div>
          {/* Stepper */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 36 }}>
            {stepLabels.map((label, i) => {
              const n = i + 1;
              const active = n === step;
              const done = n < step;
              return (
                <React.Fragment key={label}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 70 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      background: done ? "var(--ut-emerald)" : active ? "var(--ut-indigo)" : "#fff",
                      border: active || done ? "none" : "1.5px solid var(--ut-line)",
                      color: done || active ? "#fff" : "var(--ut-slate-light)", fontWeight: 700, fontSize: 13,
                      transition: "all 0.3s ease"
                    }}>
                      {done ? <CheckCircle2 size={16} /> : n}
                    </div>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: active ? "var(--ut-ink)" : "var(--ut-slate-light)" }}>{label}</span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div style={{ flex: 1, height: 2, background: n < step ? "var(--ut-emerald)" : "var(--ut-line)", marginBottom: 20, transition: "background 0.3s ease" }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* STEP 1: form */}
          {step === 1 && (
            <div className="ut-card ut-animate-up" style={{ padding: 30 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Your details</h3>
              <p style={{ fontSize: 13.5, color: "var(--ut-slate)", marginBottom: 24 }}>We'll use this to process your {service.name.toLowerCase()} request.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <div className="ut-input-wrap">
                  <label className="ut-label">Full Name</label>
                  <input className="ut-input" placeholder="As per ID proof" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="ut-input-wrap">
                  <label className="ut-label">Phone Number</label>
                  <input className="ut-input" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="ut-input-wrap" style={{ gridColumn: "1 / -1" }}>
                  <label className="ut-label">Email Address</label>
                  <input className="ut-input" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="ut-input-wrap" style={{ gridColumn: "1 / -1" }}>
                  <label className="ut-label">Additional Notes (optional)</label>
                  <textarea className="ut-input" rows={4} placeholder="Any special instructions for our team..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
              </div>
              {!user && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--ut-amber-bg)", padding: "12px 16px", borderRadius: 10, marginTop: 20 }}>
                  <AlertCircle size={16} color="var(--ut-amber)" />
                  <p style={{ fontSize: 13, color: "#92590B" }}>You'll need to log in or create an account to continue.</p>
                </div>
              )}
              <button className="ut-btn ut-btn-navy ut-btn-block" style={{ marginTop: 24 }} onClick={goNext} disabled={!form.name || !form.phone}>
                Continue to Documents <ArrowRight size={15} />
              </button>
            </div>
          )}

          {/* STEP 2: upload */}
          {step === 2 && (
            <div className="ut-card ut-animate-up" style={{ padding: 30 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Upload documents</h3>
              <p style={{ fontSize: 13.5, color: "var(--ut-slate)", marginBottom: 20 }}>Required: {service.docs.join(", ")}.</p>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
                style={{
                  border: "2px dashed var(--ut-line)", borderRadius: 14, padding: "44px 20px", textAlign: "center",
                  cursor: "pointer", transition: "border-color 0.2s ease, background 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--ut-indigo)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--ut-line)"}
              >
                <input ref={fileInputRef} type="file" multiple hidden onChange={(e) => handleFiles(e.target.files)} />
                <Upload size={30} color="var(--ut-indigo)" style={{ marginBottom: 12 }} />
                <p style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 4 }}>Click to upload or drag and drop</p>
                <p style={{ fontSize: 12.5, color: "var(--ut-slate-light)" }}>PDF, JPG, or PNG — up to 10MB per file</p>
              </div>

              {files.length > 0 && (
                <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {files.map((f, i) => (
                    <div key={i} className="ut-animate-up" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "#F7F8FA", borderRadius: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <FileText size={17} color="var(--ut-indigo)" />
                        <div>
                          <p style={{ fontSize: 13.5, fontWeight: 600 }}>{f.name}</p>
                          <p style={{ fontSize: 11.5, color: "var(--ut-slate-light)" }}>{f.size}</p>
                        </div>
                      </div>
                      <button onClick={() => removeFile(i)} style={{ background: "none", border: "none", padding: 6, color: "var(--ut-rose)" }}><Trash2 size={15} /></button>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button className="ut-btn ut-btn-ghost" onClick={() => setStep(1)}><ChevronLeft size={15} /> Back</button>
                <button className="ut-btn ut-btn-navy" style={{ flex: 1 }} onClick={goNext} disabled={files.length === 0}>
                  Continue to Payment <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: payment */}
          {step === 3 && (
            <div className="ut-card ut-animate-up" style={{ padding: 30 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Payment</h3>
              <p style={{ fontSize: 13.5, color: "var(--ut-slate)", marginBottom: 22 }}>Secure checkout powered by Razorpay.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                {[
                  { id: "upi", label: "UPI", icon: Smartphone },
                  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
                  { id: "netbanking", label: "Net Banking", icon: Building2 },
                  { id: "wallet", label: "Wallet", icon: Wallet },
                ].map((m) => {
                  const MIcon = m.icon;
                  const active = payMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPayMethod(m.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderRadius: 11,
                        border: active ? "2px solid var(--ut-indigo)" : "1.5px solid var(--ut-line)",
                        background: active ? "#EEF1F8" : "#fff", transition: "all 0.18s ease", textAlign: "left"
                      }}
                    >
                      <MIcon size={18} color={active ? "var(--ut-indigo)" : "var(--ut-slate)"} />
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: active ? "var(--ut-indigo)" : "var(--ut-ink)" }}>{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {payMethod === "upi" && (
                <div className="ut-input-wrap" style={{ marginBottom: 8 }}>
                  <label className="ut-label">UPI ID</label>
                  <input className="ut-input" placeholder="yourname@upi" />
                </div>
              )}
              {payMethod === "card" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div className="ut-input-wrap" style={{ gridColumn: "1 / -1" }}><label className="ut-label">Card Number</label><input className="ut-input" placeholder="1234 5678 9012 3456" /></div>
                  <div className="ut-input-wrap"><label className="ut-label">Expiry</label><input className="ut-input" placeholder="MM/YY" /></div>
                  <div className="ut-input-wrap"><label className="ut-label">CVV</label><input className="ut-input" placeholder="•••" /></div>
                </div>
              )}
              {payMethod === "netbanking" && (
                <div className="ut-input-wrap">
                  <label className="ut-label">Select Bank</label>
                  <select className="ut-input"><option>State Bank of India</option><option>HDFC Bank</option><option>ICICI Bank</option><option>Axis Bank</option></select>
                </div>
              )}
              {payMethod === "wallet" && (
                <div className="ut-input-wrap">
                  <label className="ut-label">Select Wallet</label>
                  <select className="ut-input"><option>Paytm</option><option>PhonePe Wallet</option><option>Amazon Pay</option></select>
                </div>
              )}

              <div style={{ borderTop: "1px solid var(--ut-line)", marginTop: 24, paddingTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ut-slate)" }}>Total Amount</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: "var(--ut-indigo)" }}>₹{service.price}</span>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
                <button className="ut-btn ut-btn-ghost" onClick={() => setStep(2)} disabled={processing}><ChevronLeft size={15} /> Back</button>
                <button className="ut-btn ut-btn-gold" style={{ flex: 1 }} onClick={submitPayment} disabled={processing}>
                  {processing ? <><span style={{ width: 14, height: 14, border: "2px solid rgba(15,27,61,0.3)", borderTopColor: "var(--ut-navy)", borderRadius: "50%", display: "inline-block", animation: "ut-spin 0.7s linear infinite" }} /> Processing...</> : <>Pay ₹{service.price} Securely <Lock size={14} /></>}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: done */}
          {step === 4 && (
            <div className="ut-card ut-animate-up" style={{ padding: 44, textAlign: "center" }}>
              <div style={{ width: 70, height: 70, borderRadius: "50%", background: "var(--ut-emerald-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", animation: "ut-scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
                <CheckCircle2 size={34} color="var(--ut-emerald)" />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Request submitted!</h3>
              <p style={{ fontSize: 14.5, color: "var(--ut-slate)", maxWidth: 380, marginInline: "auto", lineHeight: 1.6, marginBottom: 28 }}>
                Your {service.name.toLowerCase()} request is confirmed. We'll notify you on WhatsApp and email as our team works on it — you can also track progress from your dashboard.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="ut-btn ut-btn-navy" onClick={() => navigate("/dashboard")}>Go to Dashboard <ArrowRight size={15} /></button>
                <button className="ut-btn ut-btn-ghost" onClick={() => navigate("/services")}>Browse More Services</button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside>
          <div className="ut-card" style={{ padding: 24, position: "sticky", top: 96 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ut-slate-light)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>Order Summary</p>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13.5, color: "var(--ut-slate)" }}>Service</span>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{service.name}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13.5, color: "var(--ut-slate)" }}>Turnaround</span>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{service.time}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <span style={{ fontSize: 13.5, color: "var(--ut-slate)" }}>Service Fee</span>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>₹{service.price}</span>
            </div>
            <div style={{ borderTop: "1px solid var(--ut-line)", paddingTop: 16, marginBottom: 18 }}>
              <p style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>Documents required:</p>
              {service.docs.map((d) => (
                <div key={d} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <CheckCircle2 size={14} color="var(--ut-emerald)" />
                  <span style={{ fontSize: 12.5, color: "var(--ut-slate)" }}>{d}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F7F8FA", padding: "10px 12px", borderRadius: 9 }}>
              <Shield size={14} color="var(--ut-indigo)" />
              <span style={{ fontSize: 11.5, color: "var(--ut-slate)" }}>Your documents are encrypted and stored securely.</span>
            </div>
          </div>
        </aside>
      </div>
      <style>{`@media (max-width: 880px) { #ut-service-grid { grid-template-columns: 1fr !important; } #ut-service-grid aside > div { position: static !important; } }`}</style>
    </div>
  );
}

/* ============================================================
   PAGE: PRICING
   ============================================================ */
function PricingPage() {
  const { navigate } = useRouter();
  const plans = [
    { name: "Pay Per Service", price: "₹99 – ₹899", desc: "Best for one-off needs.", features: ["No subscription", "All 12 services available", "Standard turnaround", "WhatsApp + Email delivery", "Dashboard tracking"], cta: "Browse Services", highlight: false },
    { name: "Family Plan", price: "₹1,499", per: "/year", desc: "For households with recurring document needs.", features: ["Up to 4 family members", "10% off every service", "Priority processing queue", "Dedicated WhatsApp support", "Free document storage"], cta: "Choose Family Plan", highlight: true },
    { name: "Business", price: "Custom", desc: "For shops, firms, and frequent filers.", features: ["GST & ITR bulk filing", "Account manager", "Fastest turnaround", "Monthly billing", "API/CSV order import"], cta: "Contact Sales", highlight: false },
  ];
  return (
    <div className="ut-animate-in">
      <PageHero eyebrow="Pricing" title="Simple, transparent pricing" subtitle="Pay only for what you need, or save more with a plan built for families and businesses." />
      <div className="ut-container" style={{ padding: "50px 24px 70px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }} className="ut-pricing-grid">
          {plans.map((p) => (
            <div key={p.name} className="ut-card" style={{
              padding: 30, position: "relative", display: "flex", flexDirection: "column",
              border: p.highlight ? "2px solid var(--ut-gold)" : "1px solid var(--ut-line)",
              transform: p.highlight ? "translateY(-8px)" : "none",
              boxShadow: p.highlight ? "var(--ut-shadow-lg)" : "var(--ut-shadow)"
            }}>
              {p.highlight && <span style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "var(--ut-gold)", color: "var(--ut-navy)", fontSize: 11.5, fontWeight: 800, padding: "5px 14px", borderRadius: 999 }}>MOST POPULAR</span>}
              <p style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 6 }}>{p.name}</p>
              <p style={{ fontSize: 13, color: "var(--ut-slate)", marginBottom: 18 }}>{p.desc}</p>
              <div style={{ marginBottom: 22 }}>
                <span style={{ fontSize: 30, fontWeight: 800, color: "var(--ut-indigo)" }}>{p.price}</span>
                {p.per && <span style={{ fontSize: 14, color: "var(--ut-slate-light)" }}>{p.per}</span>}
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, marginBottom: 26 }}>
                {p.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                    <CheckCircle2 size={16} color="var(--ut-emerald)" style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 13.5, color: "var(--ut-ink)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button className={`ut-btn ut-btn-block ${p.highlight ? "ut-btn-gold" : "ut-btn-navy"}`} onClick={() => navigate(p.cta === "Contact Sales" ? "/contact" : "/services")}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 80 }}>
          <h2 style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 800, textAlign: "center", marginBottom: 32 }}>Frequently asked questions</h2>
          <FAQList />
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .ut-pricing-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function FAQList() {
  const faqs = [
    { q: "How do I receive my completed document?", a: "Through your dashboard, WhatsApp, or email — whichever you prefer. You'll get a notification the moment it's ready." },
    { q: "Is my payment secure?", a: "Yes. All payments are processed through Razorpay/Cashfree with SSL encryption — we never store your card details." },
    { q: "What if my documents are rejected?", a: "Our team reviews uploads before processing and will message you directly if anything needs to be re-submitted, at no extra cost." },
    { q: "Can I track my order status?", a: "Yes, every order shows a live status — Pending, In Progress, or Completed — right on your dashboard." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <div style={{ maxWidth: 680, marginInline: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
      {faqs.map((f, i) => (
        <div key={f.q} className="ut-card" style={{ overflow: "hidden" }}>
          <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: "100%", background: "none", border: "none", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
            <span style={{ fontSize: 14.5, fontWeight: 700 }}>{f.q}</span>
            <ChevronDown size={18} color="var(--ut-slate)" style={{ transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.25s ease", flexShrink: 0 }} />
          </button>
          <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
            <p style={{ padding: "0 22px 20px", fontSize: 13.5, color: "var(--ut-slate)", lineHeight: 1.6 }}>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   PAGE: LOGIN / SIGNUP
   ============================================================ */
function AuthLayout({ children, title, subtitle }) {
  return (
    <div style={{ minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px", background: "linear-gradient(160deg, var(--ut-bg), #EEF1F8)" }}>
      <div className="ut-card ut-animate-up" style={{ width: "100%", maxWidth: 440, padding: 36 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, var(--ut-indigo), var(--ut-navy))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Shield size={22} color="var(--ut-gold)" />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>{title}</h2>
          <p style={{ fontSize: 13.5, color: "var(--ut-slate)", marginTop: 6 }}>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function LoginPage() {
  const { navigate } = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please enter both email and password."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { login(email); setLoading(false); navigate("/dashboard"); }, 900);
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to track orders and manage your documents">
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="ut-input-wrap">
          <label className="ut-label">Email Address</label>
          <input className="ut-input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="ut-input-wrap">
          <label className="ut-label">Password</label>
          <div style={{ position: "relative" }}>
            <input className="ut-input" type={showPw ? "text" : "password"} placeholder="••••••••" style={{ paddingRight: 42 }} value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShowPw((s) => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--ut-slate-light)" }}>
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        {error && <p style={{ fontSize: 12.5, color: "var(--ut-rose)" }}>{error}</p>}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" style={{ background: "none", border: "none", fontSize: 12.5, color: "var(--ut-indigo)", fontWeight: 600 }}>Forgot password?</button>
        </div>
        <button className="ut-btn ut-btn-navy ut-btn-block" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--ut-slate)", marginTop: 22 }}>
        Don't have an account? <button onClick={() => navigate("/signup")} style={{ background: "none", border: "none", color: "var(--ut-indigo)", fontWeight: 700 }}>Sign up</button>
      </p>
    </AuthLayout>
  );
}

function SignupPage() {
  const { navigate } = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!agree) return;
    setLoading(true);
    setTimeout(() => { login(form.email || "customer@example.com"); setLoading(false); navigate("/dashboard"); }, 900);
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start submitting service requests in minutes">
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="ut-input-wrap">
          <label className="ut-label">Full Name</label>
          <input className="ut-input" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="ut-input-wrap">
          <label className="ut-label">Email Address</label>
          <input className="ut-input" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="ut-input-wrap">
          <label className="ut-label">Phone Number</label>
          <input className="ut-input" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div className="ut-input-wrap">
          <label className="ut-label">Password</label>
          <input className="ut-input" type="password" placeholder="Create a password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 12.5, color: "var(--ut-slate)", cursor: "pointer" }}>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 2 }} />
          I agree to the Terms of Service and Privacy Policy
        </label>
        <button className="ut-btn ut-btn-gold ut-btn-block" type="submit" disabled={loading || !agree}>
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
      <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--ut-slate)", marginTop: 22 }}>
        Already have an account? <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: "var(--ut-indigo)", fontWeight: 700 }}>Log in</button>
      </p>
    </AuthLayout>
  );
}

/* ============================================================
   PAGE: DASHBOARD
   ============================================================ */
function DashboardPage() {
  const { user } = useAuth();
  const { navigate } = useRouter();
  const [tab, setTab] = useState("orders");

  useEffect(() => { if (!user) navigate("/login"); }, [user]);
  if (!user) return null;

  const tabs = [
    { id: "orders", label: "My Orders", icon: FileText },
    { id: "documents", label: "Documents", icon: Download },
    { id: "payments", label: "Payment History", icon: CreditCard },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="ut-animate-in" style={{ background: "var(--ut-bg)", minHeight: "calc(100vh - 72px)" }}>
      <section style={{ background: "linear-gradient(160deg, var(--ut-navy), var(--ut-indigo))", padding: "40px 0 56px" }}>
        <div className="ut-container" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ width: 58, height: 58, borderRadius: "50%", background: "var(--ut-gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "var(--ut-navy)", textTransform: "uppercase" }}>
            {user.name?.[0] || "U"}
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", textTransform: "capitalize" }}>Welcome, {user.name}</h1>
            <p style={{ fontSize: 13.5, color: "#C7CCDB", marginTop: 3 }}>{user.email}</p>
          </div>
        </div>
      </section>

      <div className="ut-container" style={{ padding: "0 24px 80px", marginTop: -28 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }} className="ut-stats-grid">
          {[
            { label: "Total Orders", value: DEMO_ORDERS.length, icon: FileText, color: "var(--ut-indigo)" },
            { label: "Completed", value: DEMO_ORDERS.filter(o => o.status === "completed").length, icon: CheckCircle2, color: "var(--ut-emerald)" },
            { label: "In Progress", value: DEMO_ORDERS.filter(o => o.status === "in-progress").length, icon: Clock, color: "var(--ut-amber)" },
            { label: "Total Spent", value: `₹${DEMO_ORDERS.reduce((a, o) => a + o.amount, 0)}`, icon: Wallet, color: "var(--ut-gold)" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="ut-card" style={{ padding: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: 12, color: "var(--ut-slate-light)", fontWeight: 600, marginBottom: 8 }}>{s.label}</p>
                    <p style={{ fontSize: 24, fontWeight: 800 }}>{s.value}</p>
                  </div>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={17} color={s.color} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 24, borderBottom: "1px solid var(--ut-line)", overflowX: "auto" }}>
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                display: "flex", alignItems: "center", gap: 7, background: "none", border: "none", padding: "12px 16px",
                fontSize: 13.5, fontWeight: 700, color: active ? "var(--ut-indigo)" : "var(--ut-slate)",
                borderBottom: active ? "2.5px solid var(--ut-indigo)" : "2.5px solid transparent", whiteSpace: "nowrap", transition: "all 0.2s ease"
              }}>
                <Icon size={15} /> {t.label}
              </button>
            );
          })}
        </div>

        {tab === "orders" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {DEMO_ORDERS.map((o) => {
              const meta = STATUS_META[o.status];
              return (
                <div key={o.id} className="ut-card ut-animate-up" style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "#EEF1F8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FileText size={19} color="var(--ut-indigo)" />
                    </div>
                    <div>
                      <p style={{ fontSize: 14.5, fontWeight: 700 }}>{o.service}</p>
                      <p style={{ fontSize: 12, color: "var(--ut-slate-light)" }}>{o.id} • {o.date}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>₹{o.amount}</span>
                    <span className="ut-chip" style={{ background: meta.bg, color: meta.color }}><meta.Icon size={12} /> {meta.label}</span>
                    {o.status === "completed" && <button className="ut-btn ut-btn-sm ut-btn-navy"><Download size={14} /> Download</button>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "documents" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {DEMO_ORDERS.map((o) => (
              <div key={o.id} className="ut-card" style={{ padding: 20 }}>
                <p style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 10 }}>{o.service} <span style={{ color: "var(--ut-slate-light)", fontWeight: 500 }}>({o.id})</span></p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {o.docs.map((d) => (
                    <span key={d} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, background: "#F7F8FA", padding: "8px 12px", borderRadius: 8 }}>
                      <FileText size={13} color="var(--ut-slate)" /> {d}
                    </span>
                  ))}
                  {o.status === "completed" && (
                    <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, background: "var(--ut-emerald-bg)", color: "var(--ut-emerald)", padding: "8px 12px", borderRadius: 8, fontWeight: 600 }}>
                      <Download size={13} /> final_document.pdf
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "payments" && (
          <div className="ut-card" style={{ overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F7F8FA" }}>
                  {["Order ID", "Service", "Date", "Amount", "Status"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "14px 18px", fontSize: 12, fontWeight: 700, color: "var(--ut-slate-light)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO_ORDERS.map((o) => (
                  <tr key={o.id} style={{ borderTop: "1px solid var(--ut-line)" }}>
                    <td style={{ padding: "14px 18px", fontSize: 13.5, fontWeight: 600 }}>{o.id}</td>
                    <td style={{ padding: "14px 18px", fontSize: 13.5 }}>{o.service}</td>
                    <td style={{ padding: "14px 18px", fontSize: 13.5, color: "var(--ut-slate)" }}>{o.date}</td>
                    <td style={{ padding: "14px 18px", fontSize: 13.5, fontWeight: 700 }}>₹{o.amount}</td>
                    <td style={{ padding: "14px 18px" }}>
                      <span className="ut-chip" style={{ background: STATUS_META[o.status].bg, color: STATUS_META[o.status].color, fontSize: 11.5 }}>Paid</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "profile" && (
          <div className="ut-card" style={{ padding: 28, maxWidth: 480 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="ut-input-wrap"><label className="ut-label">Full Name</label><input className="ut-input" defaultValue={user.name} style={{ textTransform: "capitalize" }} /></div>
              <div className="ut-input-wrap"><label className="ut-label">Email Address</label><input className="ut-input" defaultValue={user.email} /></div>
              <div className="ut-input-wrap"><label className="ut-label">Phone Number</label><input className="ut-input" defaultValue={user.phone} /></div>
              <button className="ut-btn ut-btn-navy" style={{ alignSelf: "flex-start" }}>Save Changes</button>
            </div>
          </div>
        )}
      </div>
      <style>{`@media (max-width: 900px) { .ut-stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 540px) { .ut-stats-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

/* ============================================================
   PAGE: TRACK ORDER (public, no login)
   ============================================================ */
function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState(null);
  const [searching, setSearching] = useState(false);

  const search = () => {
    if (!orderId.trim()) return;
    setSearching(true);
    setTimeout(() => {
      const found = DEMO_ORDERS.find((o) => o.id.toLowerCase() === orderId.trim().toLowerCase()) || DEMO_ORDERS[1];
      setResult(found);
      setSearching(false);
    }, 800);
  };

  return (
    <div className="ut-animate-in">
      <PageHero eyebrow="Track Order" title="Where's my document?" subtitle="Enter your order ID to check its current status — no login required." />
      <div className="ut-container" style={{ padding: "44px 24px 90px", maxWidth: 600 }}>
        <div className="ut-card" style={{ padding: 26 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <input className="ut-input" placeholder="e.g. UT-10311" value={orderId} onChange={(e) => setOrderId(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} />
            <button className="ut-btn ut-btn-navy" onClick={search} disabled={searching}>{searching ? "..." : <><Search size={15} /> Track</>}</button>
          </div>

          {result && (
            <div className="ut-animate-up" style={{ marginTop: 26, borderTop: "1px solid var(--ut-line)", paddingTop: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 700 }}>{result.service}</p>
                  <p style={{ fontSize: 12.5, color: "var(--ut-slate-light)" }}>{result.id} • Placed {result.date}</p>
                </div>
                <span className="ut-chip" style={{ background: STATUS_META[result.status].bg, color: STATUS_META[result.status].color }}>
                  {(() => { const SIcon = STATUS_META[result.status].Icon; return <SIcon size={13} />; })()} {STATUS_META[result.status].label}
                </span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {["pending", "in-progress", "completed"].map((st, i) => {
                  const order = ["pending", "in-progress", "completed"];
                  const currentIdx = order.indexOf(result.status);
                  const filled = i <= currentIdx;
                  return <div key={st} style={{ flex: 1, height: 6, borderRadius: 4, background: filled ? "var(--ut-indigo)" : "var(--ut-line)", transition: "background 0.4s ease" }} />;
                })}
              </div>
              <p style={{ fontSize: 12.5, color: "var(--ut-slate)", marginTop: 14 }}>
                {result.status === "completed" && "Your document is ready. Check your dashboard, WhatsApp, or email for the final file."}
                {result.status === "in-progress" && "Our team is currently processing your request. We'll notify you once it's done."}
                {result.status === "pending" && "We've received your order and documents — processing will begin shortly."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE: ABOUT
   ============================================================ */
function AboutPage() {
  const { navigate } = useRouter();
  return (
    <div className="ut-animate-in">
      <PageHero eyebrow="About Us" title="Your local service centre, now digital" subtitle="Twelve years of helping our community navigate government paperwork — built into a portal you can use from anywhere." />
      <div className="ut-container" style={{ padding: "60px 24px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "center" }} id="ut-about-grid">
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>From a single counter to a full digital portal</h2>
          <p style={{ fontSize: 14.5, color: "var(--ut-slate)", lineHeight: 1.75, marginBottom: 16 }}>
            Universal Technologies started as a neighbourhood cyber café helping people fill out forms, print documents, and apply for PAN and Aadhaar cards. Over the years, that same trust has grown into a complete online portal.
          </p>
          <p style={{ fontSize: 14.5, color: "var(--ut-slate)", lineHeight: 1.75 }}>
            Today, the same team that once stood behind the counter now reviews every submission, verifies every document, and processes every order — just without the queue.
          </p>
          <div style={{ display: "flex", gap: 28, marginTop: 28 }}>
            {[["12+", "Years"], ["12,000+", "Customers"], ["12", "Services"]].map(([n, l]) => (
              <div key={l}><p style={{ fontSize: 24, fontWeight: 800, color: "var(--ut-indigo)" }}>{n}</p><p style={{ fontSize: 12.5, color: "var(--ut-slate-light)" }}>{l}</p></div>
            ))}
          </div>
        </div>
        <div className="ut-card" style={{ padding: 30, background: "linear-gradient(160deg, var(--ut-indigo), var(--ut-navy))" }}>
          <Award size={28} color="var(--ut-gold)" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Our commitment</h3>
          {["Every document handled with care and confidentiality", "Transparent pricing — no hidden charges", "Real humans verifying every submission", "Updates you can actually rely on"].map((c) => (
            <div key={c} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
              <CheckCircle2 size={16} color="var(--ut-gold)" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 13.5, color: "#DCE0EC", lineHeight: 1.5 }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "40px 24px 90px" }}>
        <button className="ut-btn ut-btn-navy" onClick={() => navigate("/services")}>Explore Our Services <ArrowRight size={15} /></button>
      </div>
      <style>{`@media (max-width: 800px) { #ut-about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

/* ============================================================
   PAGE: CONTACT
   ============================================================ */
function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="ut-animate-in">
      <PageHero eyebrow="Get in Touch" title="We're here to help" subtitle="Questions about a service or an existing order? Send us a message or visit us in person." />
      <div className="ut-container" style={{ padding: "50px 24px 90px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }} id="ut-contact-grid">
        <div className="ut-card" style={{ padding: 30 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Send an inquiry</h3>
          {sent && (
            <div className="ut-animate-up" style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--ut-emerald-bg)", padding: "12px 16px", borderRadius: 10, marginBottom: 18 }}>
              <CheckCircle2 size={16} color="var(--ut-emerald)" />
              <span style={{ fontSize: 13, color: "#0E6B33", fontWeight: 600 }}>Message sent! We'll get back to you shortly.</span>
            </div>
          )}
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="ut-input-wrap"><label className="ut-label">Name</label><input className="ut-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="ut-input-wrap"><label className="ut-label">Email</label><input className="ut-input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="ut-input-wrap"><label className="ut-label">Message</label><textarea className="ut-input" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
            <button className="ut-btn ut-btn-navy ut-btn-block" type="submit">Send Message</button>
          </form>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="ut-card" style={{ padding: 26 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ut-slate-light)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 18 }}>Contact details</p>
            {[
              [MapPin, "Shop No. 14, Main Market Road, Sector 21, New Delhi – 110021"],
              [Phone, "+91 98765 43210"],
              [Mail, "support@universaltech.in"],
              [Clock, "Mon – Sat, 9:30 AM – 7:30 PM"],
            ].map(([Icon, text], i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "#EEF1F8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={15} color="var(--ut-indigo)" />
                </div>
                <span style={{ fontSize: 13.5, color: "var(--ut-slate)", lineHeight: 1.5, paddingTop: 7 }}>{text}</span>
              </div>
            ))}
            <button className="ut-btn ut-btn-gold ut-btn-block" style={{ marginTop: 6 }}><MessageCircle size={15} /> Chat on WhatsApp</button>
          </div>

          <div className="ut-card" style={{ padding: 0, overflow: "hidden", height: 220, position: "relative" }}>
            <div style={{
              position: "absolute", inset: 0, background: "linear-gradient(135deg, #DCE3F0, #EDEFF6)",
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8
            }}>
              <Globe2 size={26} color="var(--ut-indigo)" />
              <span style={{ fontSize: 12.5, color: "var(--ut-slate)", fontWeight: 600 }}>Google Maps — Sector 21, New Delhi</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 860px) { #ut-contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

/* ============================================================
   404
   ============================================================ */
function NotFoundPage() {
  const { navigate } = useRouter();
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 40 }}>
      <div>
        <p style={{ fontSize: 64, fontWeight: 800, color: "var(--ut-indigo)" }}>404</p>
        <p style={{ fontSize: 16, color: "var(--ut-slate)", marginBottom: 22 }}>This page wandered off. Let's get you back.</p>
        <button className="ut-btn ut-btn-navy" onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
function PageRenderer() {
  const { path } = useRouter();

  if (path === "/") return <HomePage />;
  if (path === "/services") return <ServicesPage />;
  if (path.startsWith("/service/")) return <ServiceDetailPage />;
  if (path === "/pricing") return <PricingPage />;
  if (path === "/login") return <LoginPage />;
  if (path === "/signup") return <SignupPage />;
  if (path === "/dashboard") return <DashboardPage />;
  if (path === "/track") return <TrackOrderPage />;
  if (path === "/about") return <AboutPage />;
  if (path === "/contact") return <ContactPage />;
  return <NotFoundPage />;
}

function AppShell() {
  return (
    <div className="ut-root">
      <style>{TOKENS}</style>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
      <Header />
      <main>
        <PageRenderer />
      </main>
      <Footer />
    </div>
  );
}

// Wrap navigate to parse "/service/:id" into params automatically
function RouterProviderWithParsing({ children }) {
  const [path, setPath] = useState("/");
  const [params, setParams] = useState({});

  const navigate = (to) => {
    let p = {};
    if (to.startsWith("/service/")) {
      p = { id: to.split("/service/")[1] };
    }
    setPath(to);
    setParams(p);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <RouterCtx.Provider value={{ path, params, navigate }}>
      {children}
    </RouterCtx.Provider>
  );
}

export default function App() {
  return (
    <RouterProviderWithParsing>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </RouterProviderWithParsing>
  );
}

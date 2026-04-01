import { useState, useEffect } from "react";
import { useTheme, Fn } from "./theme";
import { navItems } from "./data/constants";
import { iconMap } from "./components/Icons";
import Passcode from "./components/Passcode";
import CommandPalette from "./components/CommandPalette";
import HoldingDrawer from "./components/HoldingDrawer";
import OverviewPg from "./pages/Overview";
import HoldingsPg from "./pages/Holdings";
import AllocPg from "./pages/Allocation";
import ResearchPg from "./pages/Research";
import ThematicMapPg from "./pages/ResearchThematicMap";
import MacroPg from "./pages/Macro";
import ScenariosPg from "./pages/ResearchScenarios";
import ClaudePg from "./pages/Claude";
import SettingsPg from "./pages/Settings";

function useHashNav() {
  const getIdx = () => {
    const h = window.location.hash.replace("#", "");
    const idx = navItems.findIndex(n => n.i === h);
    return idx >= 0 ? idx : 0;
  };
  const [nav, setNav] = useState(getIdx);
  useEffect(() => {
    const handler = () => setNav(getIdx());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const go = i => { window.location.hash = navItems[i].i; setNav(i) };
  return [nav, go];
}

function Dashboard({ dark, setDark }) {
  const T = useTheme(dark);
  const [nav, setNav] = useHashNav();
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("cape_api_key") || "");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [drawerHolding, setDrawerHolding] = useState(null);

  // ⌘K listener
  useEffect(() => {
    const handler = e => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmdOpen(o => !o) } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const sideW = collapsed ? 56 : 180;

  const pages = [
    () => <OverviewPg T={T} onHoldingClick={setDrawerHolding} />,
    () => <HoldingsPg T={T} onHoldingClick={setDrawerHolding} />,
    () => <AllocPg T={T} />,
    () => <ScenariosPg T={T} />,
    () => <ThematicMapPg T={T} />,
    () => <ResearchPg T={T} />,
    () => <MacroPg T={T} />,
    () => <ClaudePg T={T} apiKey={apiKey} />,
    () => <SettingsPg T={T} dark={dark} setDark={setDark} apiKey={apiKey} setApiKey={setApiKey} />,
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: Fn, transition: "background 0.3s", overflow: "hidden" }}>
      {/* Mobile overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} style={{ display: "none", position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", zIndex: 9 }} />}

      {/* Sidebar */}
      <div className="sidebar" style={{
        width: sideW, background: T.sidebar, backdropFilter: T.glassBlur, WebkitBackdropFilter: T.glassBlur,
        borderRight: T.glassBorder, display: "flex", flexDirection: "column", flexShrink: 0,
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)", zIndex: 10, overflow: "hidden",
      }}>
        <div style={{ padding: collapsed ? "28px 12px 32px" : "28px 20px 32px", textAlign: collapsed ? "center" : "left", transition: "padding 0.25s" }}>
          <div style={{ fontFamily: Fn, fontSize: collapsed ? 18 : 22, color: T.text, fontWeight: 300, letterSpacing: "-0.02em", transition: "font-size 0.25s" }}>
            {collapsed ? "C" : "Cape"}
          </div>
          {!collapsed && <div style={{ fontSize: 8, letterSpacing: "0.3em", color: T.textTer, textTransform: "uppercase", marginTop: 2 }}>CAPITAL</div>}
        </div>
        <nav style={{ flex: 1, paddingTop: 4, padding: collapsed ? "4px 6px 0" : "4px 8px 0" }}>
          {navItems.map((it, i) => {
            const Icon = iconMap[it.i];
            const active = nav === i;
            // Badge: 2 = earnings count within 7d on Holdings, 4 = headline count on Markets
            const badge = i === 1 ? 2 : i === 3 ? 4 : 0;
            return (
              <button key={i} onClick={() => { setNav(i); setSidebarOpen(false) }} style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%", padding: collapsed ? "10px 0" : "10px 12px",
                border: "none", borderRadius: T.radiusSm, marginBottom: 2,
                background: active ? T.pillBg : "transparent",
                cursor: "pointer", fontSize: 12, color: active ? T.text : T.textTer,
                fontFamily: Fn, textAlign: "left", fontWeight: active ? 600 : 400,
                transition: "all 0.2s", justifyContent: collapsed ? "center" : "flex-start",
                animation: "slideIn 0.3s ease both", animationDelay: i * 0.04 + "s",
                position: "relative",
              }}>
                {active && <span style={{ position: "absolute", left: collapsed ? "50%" : 0, top: collapsed ? "auto" : "50%", bottom: collapsed ? -2 : "auto", transform: collapsed ? "translateX(-50%)" : "translateY(-50%)", width: collapsed ? 16 : 3, height: collapsed ? 3 : 16, borderRadius: 2, background: T.capRed }} />}
                <span style={{ width: 16, display: "flex", alignItems: "center", justifyContent: "center", opacity: active ? 0.9 : 0.45, flexShrink: 0, position: "relative" }}>
                  {Icon && <Icon />}
                  {badge > 0 && <span style={{ position: "absolute", top: -5, right: -7, width: 14, height: 14, borderRadius: "50%", background: T.capRed, color: "#fff", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: Fn }}>{badge}</span>}
                </span>
                {!collapsed && it.l}
              </button>
            );
          })}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} style={{
          display: "flex", alignItems: "center", justifyContent: "center", margin: collapsed ? "0 auto 12px" : "0 8px 12px",
          padding: "8px", border: "none", borderRadius: T.radiusSm, background: "transparent", cursor: "pointer", color: T.textTer,
          transition: "all 0.2s", width: collapsed ? 36 : "auto", gap: 8, fontSize: 11, fontFamily: Fn,
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {collapsed ? <><line x1="4" y1="4" x2="12" y2="4"/><line x1="4" y1="8" x2="12" y2="8"/><line x1="4" y1="12" x2="12" y2="12"/></> : <polyline points="10,4 6,8 10,12"/>}
          </svg>
          {!collapsed && <span>Collapse</span>}
        </button>

        {!collapsed && <div style={{ padding: "12px 20px", borderTop: "1px solid " + T.border, fontSize: 9, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Confidential</div>}
      </div>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", transition: "background 0.3s" }}>
        <div style={{
          height: 52, background: T.topbar, backdropFilter: T.glassBlur, WebkitBackdropFilter: T.glassBlur,
          borderBottom: T.glassBorder, display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 28px", flexShrink: 0, transition: "background 0.3s", position: "sticky", top: 0, zIndex: 5,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display: "none", background: "none", border: "none", color: T.text, fontSize: 20, cursor: "pointer", padding: 0, lineHeight: 1 }}>
              {sidebarOpen ? "\u2715" : "\u2630"}
            </button>
            <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, fontWeight: 500 }}>{navItems[nav].l}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setCmdOpen(true)} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", border: "1px solid " + T.border,
              borderRadius: T.radiusSm, background: T.bg, cursor: "pointer", color: T.textTer, fontSize: 11, fontFamily: Fn, transition: "all 0.15s",
            }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/></svg>
              <span className="cmd-hint" style={{ opacity: 0.6 }}>&thinsp;&#8984;K</span>
            </button>
            <button onClick={() => { const d = !dark; setDark(d); localStorage.setItem("cape_dark", d ? "1" : "0") }} style={{
              width: 34, height: 34, borderRadius: "50%", border: "none", background: T.pillBg, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: T.textSec,
              transition: "all 0.2s", boxShadow: T.shadow,
            }}>
              {dark ? "\u2600" : "\u263D"}
            </button>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: `linear-gradient(135deg, ${T.purple}, ${T.capRed})`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}>CC</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 32px 28px" }}>
          <div key={nav} style={{ maxWidth: 1140, margin: "0 auto", paddingTop: 28, animation: "fadeIn 0.3s ease" }}>
            {pages[nav]()}
            <div style={{ marginTop: 28, paddingTop: 14, borderTop: "1px solid " + T.border, fontSize: 10, color: T.textTer, fontFamily: Fn, textAlign: "center", opacity: 0.6 }}>
              Cape Capital AG &middot; Utoquai 55, 8008 Z&uuml;rich &middot; Benchmark: MSCI ACWI NTR (NDEEWNR) &middot; All data EUR unless stated
            </div>
          </div>
        </div>
      </div>

      <CommandPalette
        open={cmdOpen}
        onClose={v => v === "open" ? setCmdOpen(true) : setCmdOpen(false)}
        onNavigate={setNav}
        onToggleDark={() => { const d = !dark; setDark(d); localStorage.setItem("cape_dark", d ? "1" : "0") }}
        T={T}
      />

      <HoldingDrawer holding={drawerHolding} onClose={() => setDrawerHolding(null)} T={T} />

      <style>{`
        @media (max-width: 768px) {
          .sidebar { position: fixed !important; left: ${sidebarOpen ? "0" : "-200px"} !important; top: 0; bottom: 0; width: 200px !important; box-shadow: ${sidebarOpen ? T.shadowXl : "none"}; }
          .sidebar-overlay { display: ${sidebarOpen ? "block" : "none"} !important; }
          .hamburger { display: flex !important; }
          .collapse-btn { display: none !important; }
          .cmd-hint { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [fade, setFade] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("cape_dark") === "1");
  const T = useTheme(dark);

  if (!unlocked) return (
    <div style={{ opacity: fade ? 0 : 1, transition: "opacity 0.3s, transform 0.3s", transform: fade ? "scale(0.98)" : "scale(1)" }}>
      <Passcode onUnlock={() => { setFade(true); setTimeout(() => setUnlocked(true), 300) }} T={T} />
    </div>
  );

  return <Dashboard dark={dark} setDark={setDark} />;
}

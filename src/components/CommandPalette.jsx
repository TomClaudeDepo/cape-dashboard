import { useState, useEffect, useRef } from "react";
import { Fn } from "../theme";
import { navItems } from "../data/constants";
import { holdings } from "../data/portfolio";

export default function CommandPalette({ open, onClose, onNavigate, onToggleDark, T }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) { setQuery(""); setSelected(0); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open]);

  // Build results
  const results = [];
  const q = query.toLowerCase().trim();

  // Pages
  navItems.forEach((n, i) => {
    if (!q || n.l.toLowerCase().includes(q)) {
      results.push({ type: "page", label: n.l, sub: "Go to " + n.l, action: () => { onNavigate(i); onClose() } });
    }
  });

  // Holdings
  if (q.length > 0) {
    holdings.forEach(h => {
      if (h.name.toLowerCase().includes(q) || h.t.toLowerCase().includes(q)) {
        results.push({ type: "holding", label: h.name, sub: h.t + " · " + h.gics + " · " + h.wt.toFixed(2) + "%", action: () => { onNavigate(1); onClose() } });
      }
    });
  }

  // Actions
  if (!q || "dark mode".includes(q) || "light mode".includes(q) || "theme".includes(q)) {
    results.push({ type: "action", label: "Toggle Dark Mode", sub: "Switch theme", action: () => { onToggleDark(); onClose() } });
  }

  const clamped = Math.min(selected, results.length - 1);

  useEffect(() => {
    const handler = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); if (open) onClose(); else onClose("open") }
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)) }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
      if (e.key === "Enter" && results[clamped]) { results[clamped].action() }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  if (!open) return null;

  const typeIcons = { page: "\u2192", holding: "\u25CB", action: "\u26A1" };
  const typeColors = { page: T.purple, holding: T.capRed, action: T.orange };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", zIndex: 100 }} />
      <div style={{
        position: "fixed", top: "18%", left: "50%", transform: "translateX(-50%)",
        width: 520, maxWidth: "92vw", background: T.card, borderRadius: T.radiusLg, boxShadow: T.shadowXl,
        zIndex: 101, overflow: "hidden", animation: "scaleIn 0.15s ease",
      }}>
        {/* Input */}
        <div style={{ display: "flex", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid " + T.border, gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke={T.textTer} strokeWidth="1.5" strokeLinecap="round">
            <circle cx="7" cy="7" r="4.5" /><line x1="10.5" y1="10.5" x2="14" y2="14" />
          </svg>
          <input
            ref={inputRef} type="text" value={query} onChange={e => { setQuery(e.target.value); setSelected(0) }}
            placeholder="Search pages, holdings, actions..."
            style={{ flex: 1, border: "none", background: "transparent", fontSize: 15, fontFamily: Fn, color: T.text, outline: "none" }}
          />
          <span style={{ fontSize: 10, color: T.textTer, background: T.pillBg, padding: "3px 8px", borderRadius: 5, fontFamily: Fn, fontWeight: 500 }}>ESC</span>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 340, overflowY: "auto", padding: "6px 0" }}>
          {results.length === 0 && (
            <div style={{ padding: "24px 18px", textAlign: "center", fontSize: 13, color: T.textTer, fontFamily: Fn }}>No results found</div>
          )}
          {results.map((r, i) => (
            <button key={i} onClick={r.action} onMouseEnter={() => setSelected(i)} style={{
              display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 18px",
              border: "none", background: i === clamped ? T.pillBg : "transparent",
              cursor: "pointer", textAlign: "left", fontFamily: Fn, transition: "background 0.1s",
            }}>
              <span style={{ width: 24, height: 24, borderRadius: 6, background: i === clamped ? typeColors[r.type] + "18" : T.pillBg, color: typeColors[r.type], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>
                {typeIcons[r.type]}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: T.text, fontWeight: 500 }}>{r.label}</div>
                <div style={{ fontSize: 11, color: T.textTer, marginTop: 1 }}>{r.sub}</div>
              </div>
              {i === clamped && <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>Enter &crarr;</span>}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: "8px 18px", borderTop: "1px solid " + T.border, display: "flex", gap: 16, fontSize: 10, color: T.textTer, fontFamily: Fn }}>
          <span>&uarr;&darr; Navigate</span>
          <span>&crarr; Select</span>
          <span>ESC Close</span>
        </div>
      </div>
    </>
  );
}

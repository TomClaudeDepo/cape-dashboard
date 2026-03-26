import { useState, useRef, useEffect } from "react";
import { Fs, Fn } from "../theme";
import { CSYS } from "../data/constants";
import { Pill } from "../components/shared";

export default function ClaudePg({ T, apiKey }) {
  const [msgs, setMsgs] = useState([{ role: "assistant", content: "Morning. What do you need on the book?" }]);
  const [input, setInput] = useState("");
  const [ld, setLd] = useState(false);
  const btm = useRef(null);

  useEffect(() => { btm.current?.scrollIntoView({ behavior: "smooth" }) }, [msgs, ld]);

  const send = async () => {
    const t = input.trim();
    if (!t || ld) return;
    setInput("");
    const nm = [...msgs, { role: "user", content: t }];
    setMsgs(nm);
    setLd(true);

    if (!apiKey) {
      setMsgs([...nm, { role: "assistant", content: "No API key configured. Go to Settings to add your Anthropic API key." }]);
      setLd(false);
      return;
    }

    try {
      const am = nm.filter((m, i) => !(i === 0 && m.role === "assistant")).map(m => ({ role: m.role, content: m.content }));
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: CSYS, messages: am }),
      });
      const d = await r.json();
      if (d.error) {
        setMsgs([...nm, { role: "assistant", content: "API error: " + (d.error.message || "Unknown error. Check your API key in Settings.") }]);
      } else {
        setMsgs([...nm, { role: "assistant", content: d.content?.map(b => b.text || "").join("") || "Error \u2014 try again." }]);
      }
    } catch (e) {
      setMsgs([...nm, { role: "assistant", content: "Connection error. Check your API key in Settings." }]);
    }
    setLd(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: 12, background: `linear-gradient(135deg, ${T.purple}, ${T.capRed})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>C</span>
        </div>
        <div>
          <div style={{ fontFamily: Fs, fontSize: 17, fontWeight: 300, color: T.text }}>Claude</div>
          <div style={{ fontSize: 9, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.2em" }}>PORTFOLIO ASSISTANT</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Pill T={T} color={apiKey ? T.green : T.capRed} bg={apiKey ? T.greenBg : T.redBg}>{apiKey ? "Online" : "No API Key"}</Pill>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingRight: 4 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 8, justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "assistant" && <div style={{ width: 24, height: 24, borderRadius: 8, background: T.purple, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}><span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>C</span></div>}
            <div style={{ maxWidth: "78%", padding: "10px 14px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.role === "user" ? `linear-gradient(135deg, ${T.capRed}, #B91C1C)` : T.card, color: m.role === "user" ? "#fff" : T.textSec, fontSize: 13, lineHeight: 1.65, boxShadow: m.role === "assistant" ? T.shadow : "0 2px 8px rgba(155,27,27,0.15)", whiteSpace: "pre-wrap", fontFamily: Fn }}>{m.content}</div>
          </div>
        ))}
        {ld && (
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 8, background: T.purple, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>C</span></div>
            <div style={{ padding: "10px 14px", background: T.card, border: "1px solid " + T.border, borderRadius: "14px 14px 14px 4px", display: "flex", gap: 4, alignItems: "center" }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: T.purple200, animation: "pulse 1.2s ease " + i * 0.2 + "s infinite" }} />)}
              </div>
              <span style={{ fontSize: 11, color: T.textTer, marginLeft: 8, fontFamily: Fn }}>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={btm} />
      </div>

      {msgs.length <= 1 && (
        <div style={{ padding: "8px 0", display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Japan exposure?", "Top P&L contributors?", "Sector vs ACWI?", "Active share breakdown?"].map((s, i) => (
            <button key={i} onClick={() => setInput(s)} style={{ padding: "6px 12px", fontSize: 11, fontFamily: Fn, color: T.purple, background: T.purple100, border: "1px solid " + T.purple200, borderRadius: 14, cursor: "pointer" }}>{s}</button>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, paddingTop: 12 }}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={apiKey ? "Ask about the portfolio..." : "Add API key in Settings first..."} onFocus={e => e.target.style.boxShadow = T.ring} onBlur={e => e.target.style.boxShadow = "none"} style={{ flex: 1, padding: "10px 16px", border: "1px solid " + T.border, borderRadius: 18, fontSize: 13, fontFamily: Fn, color: T.text, background: T.bg, outline: "none", transition: "box-shadow 0.2s" }} />
        <button onClick={send} disabled={ld || !input.trim()} style={{ width: 38, height: 38, borderRadius: 12, border: "none", cursor: ld ? "wait" : "pointer", background: input.trim() ? T.capRed : T.grey200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M14 2L7 9M14 2L9.5 14L7 9M14 2L2 6.5L7 9" stroke={input.trim() ? "#fff" : T.textTer} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      <style>{"@keyframes pulse{0%,80%,100%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1.2)}}"}</style>
    </div>
  );
}

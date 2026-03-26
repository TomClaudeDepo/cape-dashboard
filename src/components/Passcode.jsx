import { useState } from "react";
import { Fn } from "../theme";
import { PASSCODE } from "../data/constants";

export default function Passcode({ onUnlock, T }) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);
  const [pressed, setPressed] = useState(null);

  const hit = d => {
    if (code.length >= 4) return;
    const n = code + d;
    setCode(n);
    setErr(false);
    if (n.length === 4) setTimeout(() => {
      if (n === PASSCODE) onUnlock();
      else { setErr(true); setShake(true); setTimeout(() => { setShake(false); setCode("") }, 500) }
    }, 200);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: Fn,
      background: `radial-gradient(circle at 50% 55%, ${T.pillBg} 0%, ${T.bg} 65%)`,
    }}>
      <div style={{ textAlign: "center", maxWidth: 320, animation: "scaleIn 0.5s ease" }}>
        <div style={{ fontFamily: Fn, fontSize: 36, fontWeight: 300, letterSpacing: "-0.03em", color: T.text }}>Cape</div>
        <div style={{ fontSize: 10, letterSpacing: "0.3em", color: T.textTer, textTransform: "uppercase", marginBottom: 52 }}>CAPITAL</div>
        <div style={{ fontSize: 13, color: T.textSec, marginBottom: 28 }}>Enter passcode</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 32, animation: shake ? "shake 0.4s" : "none" }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              width: 14, height: 14, borderRadius: "50%",
              border: "2px solid " + (err ? T.capRed : code.length > i ? T.text : T.grey200),
              background: code.length > i ? (err ? T.capRed : T.text) : "transparent",
              transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
              transform: code.length === i + 1 && !err ? "scale(1.25)" : "scale(1)",
            }} />
          ))}
        </div>
        {err && <div style={{ fontSize: 12, color: T.capRed, marginBottom: 16, animation: "fadeIn 0.2s ease" }}>Incorrect</div>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, maxWidth: 250, margin: "0 auto" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "\u232B"].map((d, i) => (
            <button
              key={i}
              onMouseDown={() => setPressed(d)}
              onMouseUp={() => setPressed(null)}
              onMouseLeave={() => setPressed(null)}
              onClick={() => d === "\u232B" ? (setCode(""), setErr(false)) : d !== null && hit(String(d))}
              style={{
                width: 66, height: 66, borderRadius: T.radiusLg, border: "none",
                background: d === null ? "transparent" : T.card,
                boxShadow: d === null ? "none" : pressed === d ? "none" : T.shadow,
                fontSize: d === "\u232B" ? 16 : 24, fontFamily: Fn, color: T.text,
                cursor: d === null ? "default" : "pointer", visibility: d === null ? "hidden" : "visible",
                fontWeight: 300, transition: "all 0.15s cubic-bezier(0.4,0,0.2,1)",
                transform: pressed === d ? "scale(0.94)" : "scale(1)",
              }}
            >
              {d}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 44, fontSize: 10, color: T.textTer, opacity: 0.5 }}>1234</div>
      </div>
    </div>
  );
}

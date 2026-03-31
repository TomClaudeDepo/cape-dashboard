import { useState } from "react";
import { Fn } from "../theme";
import { PASSCODE } from "../data/constants";
import Globe from "../components/Globe";

const Serif = "'Playfair Display', Georgia, 'Times New Roman', serif";

/* ── Inline passcode overlay ──────────────────────────────── */
function PasscodeOverlay({ onUnlock, onClose }) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);
  const [pressed, setPressed] = useState(null);

  const hit = (d) => {
    if (code.length >= 4) return;
    const n = code + d;
    setCode(n);
    setErr(false);
    if (n.length === 4)
      setTimeout(() => {
        if (n === PASSCODE) onUnlock();
        else {
          setErr(true);
          setShake(true);
          setTimeout(() => {
            setShake(false);
            setCode("");
          }, 500);
        }
      }, 200);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(18,18,24,0.85)",
          border: "1px solid rgba(155,27,27,0.2)",
          borderRadius: 24,
          padding: "48px 40px 36px",
          textAlign: "center",
          maxWidth: 340,
          animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ fontSize: 11, letterSpacing: "0.25em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 28, fontFamily: Fn }}>
          Enter passcode
        </div>

        {/* dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 32, animation: shake ? "shake 0.4s" : "none" }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 13,
                height: 13,
                borderRadius: "50%",
                border: `2px solid ${err ? "#EF4444" : code.length > i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)"}`,
                background: code.length > i ? (err ? "#EF4444" : "rgba(255,255,255,0.9)") : "transparent",
                transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                transform: code.length === i + 1 && !err ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
        {err && (
          <div style={{ fontSize: 12, color: "#EF4444", marginBottom: 14, fontFamily: Fn, animation: "fadeIn 0.2s" }}>
            Incorrect
          </div>
        )}

        {/* numpad */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, maxWidth: 240, margin: "0 auto" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "\u232B"].map((d, i) => (
            <button
              key={i}
              onMouseDown={() => setPressed(d)}
              onMouseUp={() => setPressed(null)}
              onMouseLeave={() => setPressed(null)}
              onClick={() => (d === "\u232B" ? (setCode(""), setErr(false)) : d !== null && hit(String(d)))}
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.06)",
                background: d === null ? "transparent" : pressed === d ? "rgba(155,27,27,0.3)" : "rgba(255,255,255,0.04)",
                fontSize: d === "\u232B" ? 16 : 22,
                fontFamily: Fn,
                color: "rgba(255,255,255,0.8)",
                cursor: d === null ? "default" : "pointer",
                visibility: d === null ? "hidden" : "visible",
                fontWeight: 300,
                transition: "all 0.15s cubic-bezier(0.4,0,0.2,1)",
                transform: pressed === d ? "scale(0.93)" : "scale(1)",
              }}
            >
              {d}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 28, fontSize: 10, color: "rgba(255,255,255,0.15)", fontFamily: Fn }}>
          1234
        </div>
      </div>
    </div>
  );
}

/* ── Landing page ─────────────────────────────────────────── */
export default function Landing({ onUnlock }) {
  const [showPasscode, setShowPasscode] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleUnlock = () => {
    setExiting(true);
    setTimeout(() => onUnlock(), 600);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#08080D",
        fontFamily: Fn,
        overflow: "hidden",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.05)" : "scale(1)",
        transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Globe background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Globe />
      </div>

      {/* Gradient overlays for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(180deg, rgba(8,8,13,0.3) 0%, rgba(8,8,13,0.0) 30%, rgba(8,8,13,0.0) 55%, rgba(8,8,13,0.85) 85%, rgba(8,8,13,0.95) 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Top edge vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          zIndex: 1,
          background: "linear-gradient(180deg, rgba(8,8,13,0.5) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 36px",
        }}
      >
        <div>
          <div style={{ fontSize: 22, fontWeight: 300, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em", fontFamily: Fn }}>
            Cape
          </div>
          <div style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginTop: 1 }}>
            Capital
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
            Cape Equity Fund
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          padding: "0 36px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Fund name */}
        <h1
          style={{
            fontFamily: Serif,
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.92)",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            textAlign: "center",
            animation: "fadeSlideUp 0.8s ease both",
            animationDelay: "0.2s",
          }}
        >
          Cape Equity Fund
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: Fn,
            fontSize: "clamp(12px, 1.4vw, 15px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.4)",
            margin: "16px 0 0",
            maxWidth: 480,
            textAlign: "center",
            lineHeight: 1.6,
            letterSpacing: "0.01em",
            animation: "fadeSlideUp 0.8s ease both",
            animationDelay: "0.4s",
          }}
        >
          A high-conviction portfolio of quality companies
          <br />
          favourably exposed to structural themes
        </p>

        {/* CTA */}
        <button
          onClick={() => setShowPasscode(true)}
          style={{
            marginTop: 32,
            padding: "14px 44px",
            background: "transparent",
            border: "1px solid rgba(155,27,27,0.5)",
            borderRadius: 40,
            color: "rgba(255,255,255,0.8)",
            fontSize: 12,
            fontFamily: Fn,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            animation: "fadeSlideUp 0.8s ease both",
            animationDelay: "0.6s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(155,27,27,0.2)";
            e.currentTarget.style.borderColor = "rgba(155,27,27,0.8)";
            e.currentTarget.style.color = "rgba(255,255,255,0.95)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(155,27,27,0.5)";
            e.currentTarget.style.color = "rgba(255,255,255,0.8)";
          }}
        >
          Enter Dashboard
        </button>

        {/* Stats strip */}
        <div
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
            justifyContent: "center",
            animation: "fadeSlideUp 0.8s ease both",
            animationDelay: "0.8s",
          }}
        >
          {[
            { label: "NAV", value: "EUR 396M" },
            { label: "Holdings", value: "26" },
            { label: "Active Share", value: "78%" },
            { label: "Inception", value: "Jun 2015" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: 4 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.55)", fontFamily: Fn }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 32,
            fontSize: 9,
            color: "rgba(255,255,255,0.12)",
            letterSpacing: "0.1em",
            textAlign: "center",
          }}
        >
          Cape Capital AG &middot; Utoquai 55, 8008 Z&uuml;rich &middot; Confidential
        </div>
      </div>

      {/* Passcode overlay */}
      {showPasscode && <PasscodeOverlay onUnlock={handleUnlock} onClose={() => setShowPasscode(false)} />}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px) }
          to { opacity: 1; transform: translateY(0) }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.96) }
          to { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0) }
          20% { transform: translateX(-8px) }
          40% { transform: translateX(8px) }
          60% { transform: translateX(-6px) }
          80% { transform: translateX(6px) }
        }
      `}</style>
    </div>
  );
}

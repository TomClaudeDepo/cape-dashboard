import { useState } from "react";
import { Fs, Fn, Fh } from "../theme";
import { Card, Label, Pill } from "../components/shared";

export default function SettingsPg({ T, dark, setDark, apiKey, setApiKey }) {
  const [keyInput, setKeyInput] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setApiKey(keyInput);
    localStorage.setItem("cape_api_key", keyInput);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: Fh, fontSize: 36, fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.02em", color: T.text, margin: 0 }}>Settings</h1>
        <p style={{ fontSize: 12, color: T.textTer, marginTop: 6, fontFamily: Fn }}>Preferences and configuration</p>
      </div>

      <Card T={T} style={{ marginBottom: 20, maxWidth: 600 }}>
        <Label T={T}>Appearance</Label>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, color: T.text, fontFamily: Fn, fontWeight: 500 }}>Dark mode</div>
            <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>Toggle between light and dark themes</div>
          </div>
          <button
            onClick={() => { setDark(!dark); localStorage.setItem("cape_dark", !dark ? "1" : "0") }}
            style={{ width: 48, height: 26, borderRadius: 13, border: "none", background: dark ? T.capRed : T.grey200, cursor: "pointer", position: "relative", transition: "background 0.2s" }}
          >
            <div style={{ width: 20, height: 20, borderRadius: 10, background: "#fff", position: "absolute", top: 3, left: dark ? 25 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
          </button>
        </div>
      </Card>

      <Card T={T} style={{ marginBottom: 20, maxWidth: 600 }}>
        <Label T={T}>Claude API</Label>
        <div style={{ fontSize: 13, color: T.text, fontFamily: Fn, fontWeight: 500, marginBottom: 4 }}>Anthropic API key</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>
          Required for the Claude portfolio assistant. Your key is stored locally in your browser only.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="password"
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            placeholder="sk-ant-..."
            onFocus={e => e.target.style.boxShadow = T.ring}
            onBlur={e => e.target.style.boxShadow = "none"}
            style={{ flex: 1, padding: "10px 14px", border: "1px solid " + T.border, borderRadius: T.radiusSm, fontSize: 13, fontFamily: Fn, color: T.text, background: T.bg, outline: "none", transition: "box-shadow 0.2s" }}
          />
          <button onClick={save} style={{ padding: "10px 20px", background: T.capRed, color: "#fff", border: "none", borderRadius: T.radiusSm, fontSize: 11, fontFamily: Fn, cursor: "pointer", fontWeight: 600, transition: "all 0.15s", boxShadow: saved ? "0 0 0 3px rgba(34,197,94,0.2)" : "none" }}>
            {saved ? "\u2713 Saved" : "Save"}
          </button>
        </div>
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <Pill T={T} color={apiKey ? T.green : T.capRed} bg={apiKey ? T.greenBg : T.redBg}>{apiKey ? "Key configured" : "No key set"}</Pill>
        </div>
      </Card>

      <Card T={T} style={{ maxWidth: 600 }}>
        <Label T={T}>About</Label>
        <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.8 }}>
          <div>Cape Equity Fund Dashboard</div>
          <div>Cape Capital AG &middot; Utoquai 55, 8008 Z&uuml;rich</div>
          <div>Benchmark: MSCI ACWI NTR (NDEEWNR)</div>
          <div style={{ marginTop: 8, color: T.textTer }}>v1.0.0 &middot; Data as of 20 Mar 2026</div>
        </div>
      </Card>
    </div>
  );
}

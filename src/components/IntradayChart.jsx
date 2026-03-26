import { useState, useEffect, useRef } from "react";
import { Fn } from "../theme";
import { fetchChart } from "../api/yahoo";

export default function IntradayChart({ symbol, name, T, height = 120 }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tip, setTip] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetchChart(symbol, "1d", "5m").then(d => { setData(d); setLoading(false) });
  }, [symbol]);

  if (loading) {
    return (
      <div style={{ height, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: Fn, fontSize: 11, color: T.textTer }}>
        <div style={{ display: "flex", gap: 4 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: T.textTer, animation: "pulse 1.2s ease " + i * 0.2 + "s infinite" }} />)}
        </div>
      </div>
    );
  }

  if (!data || data.length < 2) {
    return (
      <div style={{ height, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: Fn, fontSize: 11, color: T.textTer }}>
        No intraday data available
      </div>
    );
  }

  const W = 500, H = height;
  const pad = { t: 10, r: 10, b: 24, l: 40 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const closes = data.map(d => d.close);
  const mn = Math.min(...closes) * 0.999, mx = Math.max(...closes) * 1.001;
  const prevClose = data[0].close;
  const lastClose = data[data.length - 1].close;
  const isUp = lastClose >= prevClose;
  const color = isUp ? T.green : T.capRed;

  const x = i => pad.l + (i / (data.length - 1)) * w;
  const y = v => pad.t + (1 - (v - mn) / (mx - mn || 1)) * h;

  const pathD = data.map((d, i) => (i === 0 ? "M" : "L") + x(i) + "," + y(d.close)).join(" ");
  const fillD = pathD + ` L${x(data.length - 1)},${pad.t + h} L${pad.l},${pad.t + h} Z`;

  // Time labels
  const labels = [];
  const step = Math.max(1, Math.floor(data.length / 5));
  for (let i = 0; i < data.length; i += step) {
    labels.push({ i, label: new Date(data[i].time).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: false }) });
  }

  return (
    <div style={{ position: "relative" }}>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}
        onMouseMove={e => {
          const r = svgRef.current.getBoundingClientRect();
          const mx2 = (e.clientX - r.left) / r.width * W;
          const idx = Math.round(((mx2 - pad.l) / w) * (data.length - 1));
          if (idx >= 0 && idx < data.length) setTip({ idx, cx: x(idx), cy: y(data[idx].close) });
        }}
        onMouseLeave={() => setTip(null)}
      >
        <defs>
          <linearGradient id={`intra-${symbol}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.12" />
            <stop offset="100%" stopColor={color} stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Previous close line */}
        <line x1={pad.l} x2={W - pad.r} y1={y(prevClose)} y2={y(prevClose)} stroke={T.border} strokeWidth="0.5" strokeDasharray="4 2" />

        {/* Grid */}
        {labels.map((l, i) => (
          <text key={i} x={x(l.i)} y={H - 4} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>{l.label}</text>
        ))}

        {/* Fill + line */}
        <path d={fillD} fill={`url(#intra-${symbol})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" />

        {/* Tooltip */}
        {tip && tip.idx >= 0 && tip.idx < data.length && (
          <g>
            <line x1={tip.cx} x2={tip.cx} y1={pad.t} y2={pad.t + h} stroke={T.textTer} strokeWidth="0.5" strokeDasharray="2 2" strokeOpacity="0.4" />
            <circle cx={tip.cx} cy={tip.cy} r="3.5" fill={color} stroke={T.card} strokeWidth="2" />
            <rect x={tip.cx - 50} y={tip.cy - 32} width="100" height="24" rx="6" fill={T.card} stroke={T.border} strokeWidth="0.5" />
            <text x={tip.cx} y={tip.cy - 20} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>
              {new Date(data[tip.idx].time).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}
            </text>
            <text x={tip.cx} y={tip.cy - 10} textAnchor="middle" fontSize="10" fontWeight="600" fill={color} fontFamily={Fn} style={{ fontFeatureSettings: '"tnum"' }}>
              {data[tip.idx].close.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

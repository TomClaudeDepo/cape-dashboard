#!/usr/bin/env python3
"""
Cape Capital Dashboard — NAV Update Script
Usage: python3 scripts/update_nav.py <path_to_ubs_excel>

Reads the UBS NAV report Excel and updates:
  - src/data/constants.js  (NAV, MV, unrealized, cash, Claude prompt)
  - src/data/portfolio.js  (holdings, currency allocation, navData)
  - src/pages/Risk.jsx     (positions, cash breakdown, UCITS limits)
"""

import pandas as pd
import re
import sys
import os

if len(sys.argv) < 2:
    print("Usage: python3 scripts/update_nav.py <path_to_ubs_excel>")
    sys.exit(1)

XLS = sys.argv[1]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

print(f"Reading: {XLS}")
print(f"Project: {ROOT}")

# ─── Name mapping (UBS → Dashboard) ───
NAME_MAP = {
    "NOVARTIS reg": ("NOVARTIS", "NOVN.SW", "Health Care", "Switzerland"),
    "SIEMENS reg": ("SIEMENS", "SIE.DE", "Industrials", "Germany"),
    "AIR LIQUIDE": ("AIR LIQUIDE", "AI.PA", "Materials", "France"),
    "VEOLIA ENVIRONNEMENT": ("VEOLIA", "VIE.PA", "Utilities", "France"),
    "HITACHI": ("HITACHI", "6501.T", "Industrials", "Japan"),
    "ALIBABA GROUP HOLDING LTD": ("ALIBABA", "9988.HK", "Cons. Disc.", "China"),
    "TENCENT HOLDINGS": ("TENCENT", "0700.HK", "Comm. Services", "China"),
    "AKZO NOBEL NV": ("AKZO NOBEL", "AKZA.AS", "Materials", "Netherlands"),
    "VOLVO fria b": ("VOLVO", "VOLV-B.ST", "Industrials", "Sweden"),
    "EPIROC AB a": ("EPIROC", "EPI-A.ST", "Industrials", "Sweden"),
    "ALPHABET c": ("ALPHABET", "GOOGL", "Comm. Services", "USA"),
    "AMAZON.COM": ("AMAZON", "AMZN", "Cons. Disc.", "USA"),
    "BROADCOM INC": ("BROADCOM", "AVGO", "Information Technology", "USA"),
    "CORNING": ("CORNING", "GLW", "Information Technology", "USA"),
    "INTERCONTINENTAL EXCHANGE": ("ICE", "ICE", "Financials", "USA"),
    "JP MORGAN CHASE": ("JP MORGAN", "JPM", "Financials", "USA"),
    "MSCI a": ("MSCI", "MSCI", "Financials", "USA"),
    "MICROSOFT": ("MICROSOFT", "MSFT", "Information Technology", "USA"),
    "NETFLIX": ("NETFLIX", "NFLX", "Comm. Services", "USA"),
    "NVIDIA": ("NVIDIA", "NVDA", "Information Technology", "USA"),
    "PFIZER": ("PFIZER", "PFE", "Health Care", "USA"),
    "ROCKWELL AUTOMATION": ("ROCKWELL", "ROK", "Industrials", "USA"),
    "SAMSUNG ELECTRONICS 144a gdr": ("SAMSUNG", "005930.KS", "Information Technology", "South Korea"),
    "SERVICENOW": ("SERVICENOW", "NOW", "Information Technology", "USA"),
    "TAIWAN SEMICONDUCTOR adr": ("TAIWAN SEMI", "TSM", "Information Technology", "Taiwan"),
    "THERMO FISHER SCIENTIFIC": ("THERMO FISHER", "TMO", "Health Care", "USA"),
}

SHORT_NAME = {v[0]: k for k, v in NAME_MAP.items()}

# ─── Read Excel sheets ───
nav_df = pd.read_excel(XLS, sheet_name='FundInfo_NAV', header=None)
sec = pd.read_excel(XLS, sheet_name='Securities', header=3).dropna(subset=['ISIN'])
alloc = pd.read_excel(XLS, sheet_name='Allocation', header=3)
liq = pd.read_excel(XLS, sheet_name='Liquidity_at_sight', header=3)
fwd = pd.read_excel(XLS, sheet_name='Forwards', header=3)

# ─── Extract key figures ───
TNA = float(nav_df.iloc[21, 10])  # TNA curr (fund ccy)
NAV_DATE_RAW = str(nav_df.iloc[5, 1])[:10]  # e.g. "2026-03-25"
NAV_SHARE_A = float(nav_df.iloc[13, 13])  # NAV/share A class curr
BENCH_CURR = float(nav_df.iloc[13, 21])  # Benchmark curr
CYTD = float(nav_df.iloc[13, 26])  # CYTD performance %

MV_SEC = sec['Market value'].sum()
UR_PRICE = sec['Ureal. gain/loss - price'].sum()
UR_FX = sec['Ureal. gain/ loss - FX'].sum()
UR_TOTAL = sec['Unreal. gain / loss'].sum()

# Ancillary cash = account 144110 only (highlighted rows)
cash_144110 = liq[liq['Account'] == 144110]
CASH_ANCILLARY = cash_144110['Market value'].sum()

# Asset type breakdown
liq_at_sight_pct = alloc.iloc[18].iloc[6] if pd.notna(alloc.iloc[18].iloc[6]) else 2.0
fwd_pct = alloc.iloc[17].iloc[6] if pd.notna(alloc.iloc[17].iloc[6]) else -0.7
cur_assets_pct = alloc.iloc[19].iloc[6] if pd.notna(alloc.iloc[19].iloc[6]) else 0.04
cur_liab_pct = alloc.iloc[20].iloc[6] if pd.notna(alloc.iloc[20].iloc[6]) else -0.07

# Date formatting
from datetime import datetime
dt = datetime.strptime(NAV_DATE_RAW, "%Y-%m-%d")
NAV_DATE_SHORT = dt.strftime("%d %b %Y")  # "25 Mar 2026"
NAV_DATE_ISO = dt.strftime("%Y-%m-%d")

print(f"\n{'='*50}")
print(f"NAV Date:       {NAV_DATE_SHORT}")
print(f"TNA:            EUR {TNA/1e6:.2f}M")
print(f"Securities MV:  EUR {MV_SEC/1e6:.2f}M ({MV_SEC/TNA*100:.1f}%)")
print(f"Ancillary Cash: EUR {CASH_ANCILLARY/1e6:.2f}M ({CASH_ANCILLARY/TNA*100:.1f}%)")
print(f"Unreal Total:   EUR {UR_TOTAL/1e6:.2f}M")
print(f"  Price:        EUR {UR_PRICE/1e6:.2f}M")
print(f"  FX:           EUR {UR_FX/1e6:.2f}M")
print(f"NAV/share A:    {NAV_SHARE_A}")
print(f"Holdings:       {len(sec)}")
print(f"{'='*50}\n")

# ─── Sector/Region/Currency summaries for Claude prompt ───
gics_map = {v[0]: v[2] for v in NAME_MAP.values()}
region_map_prompt = {"USA": "USA", "Switzerland": "EU", "France": "EU", "Netherlands": "EU",
                     "Germany": "EU", "Sweden": "EU", "Japan": "JP", "Taiwan": "Asia",
                     "South Korea": "Asia", "China": "China"}

sector_wts, region_wts = {}, {}
for _, r in sec.iterrows():
    nm = NAME_MAP.get(r['Position description'])
    if nm:
        gics = nm[2]
        co = nm[3]
        sector_wts[gics] = sector_wts.get(gics, 0) + r['%age to TNA']
        reg = region_map_prompt.get(co, "Other")
        region_wts[reg] = region_wts.get(reg, 0) + r['%age to TNA']

top3 = sec.nlargest(3, '%age to TNA')
top3_str = ", ".join(f"{NAME_MAP.get(r['Position description'], ('?',))[0]} {r['%age to TNA']:.1f}%" for _, r in top3.iterrows())

sector_str = ", ".join(f"{k} {v:.1f}%" for k, v in sorted(sector_wts.items(), key=lambda x: -x[1])[:5])
region_str = ", ".join(f"{k} {v:.1f}%" for k, v in sorted(region_wts.items(), key=lambda x: -x[1]))

# Top ccy
ccy_data = []
for i in range(10):
    row = alloc.iloc[i]
    if pd.notna(row['Currency']) and abs(row['Weight (%age)']) > 0.5:
        ccy_data.append((row['Currency'], row['Weight (%age)']))
ccy_str = ", ".join(f"{c} {w:.0f}%" for c, w in sorted(ccy_data, key=lambda x: -x[1])[:4])

# ═══════════════════════════════════════════════════
# 1. UPDATE constants.js
# ═══════════════════════════════════════════════════

csys = (
    f'You are Claude, Cape Capital\'s internal PM assistant. Swiss WM, Zurich, EUR {TNA/1e6:.0f}M concentrated equity, {len(sec)} holdings. '
    f'Help 2-person PM team. Data ({NAV_DATE_SHORT}): NAV EUR {TNA/1e6:.1f}M, Secs EUR {MV_SEC/1e6:.1f}M ({MV_SEC/TNA*100:.0f}%), '
    f'Ancillary Cash EUR {CASH_ANCILLARY/1e6:.1f}M ({CASH_ANCILLARY/TNA*100:.1f}%), Unreal P&L EUR {UR_TOTAL/1e6:+.1f}M ({UR_TOTAL/MV_SEC*100:+.1f}%). '
    f'Top wt: {top3_str}. Sectors: {sector_str}. Geo: {region_str}. CCY: {ccy_str}. '
    f'Bench: MSCI ACWI NTR. Active Share 78%. Be concise. Use % for weights/returns. EUR for absolute values.'
)

constants = f'''export const PASSCODE = "1234";
export const NAV = {TNA};
export const MV = {MV_SEC};
export const UR = {UR_TOTAL};
export const URP = {UR_PRICE};
export const URF = {UR_FX};
export const CASH = {CASH_ANCILLARY};
export const UR_PCT = (UR / MV * 100);
export const URP_PCT = (URP / MV * 100);
export const URF_PCT = (URF / MV * 100);
export const CASH_PCT = (CASH / NAV * 100);
export const ACWI_CONSTITUENTS = 2263;
export const activeShare = 78.0;
export const benchmarkOverlapWt = 21.0;

export const CSYS = "{csys}";

export const navItems = [
  {{ l: "Overview", i: "overview", hash: "#overview" }},
  {{ l: "Holdings", i: "holdings", hash: "#holdings" }},
  {{ l: "Allocation", i: "allocation", hash: "#allocation" }},
  {{ l: "Attribution", i: "attribution", hash: "#attribution" }},
  {{ l: "Markets", i: "markets", hash: "#markets" }},
  {{ l: "Research", i: "research", hash: "#research" }},
  {{ l: "Macro", i: "macro", hash: "#macro" }},
  {{ l: "Risk", i: "risk", hash: "#risk" }},
  {{ l: "Watchlist", i: "watchlist", hash: "#watchlist" }},
  {{ l: "Claude", i: "claude", hash: "#claude" }},
  {{ l: "Settings", i: "settings", hash: "#settings" }},
];
'''

with open(os.path.join(ROOT, 'src/data/constants.js'), 'w') as f:
    f.write(constants)
print("✓ constants.js")

# ═══════════════════════════════════════════════════
# 2. UPDATE portfolio.js (holdings + ccyAll + navData)
# ═══════════════════════════════════════════════════

with open(os.path.join(ROOT, 'src/data/portfolio.js'), 'r') as f:
    pf = f.read()

# Holdings
h_lines = []
for _, r in sec.iterrows():
    desc = r['Position description']
    if desc in NAME_MAP:
        name, ticker, gics, co = NAME_MAP[desc]
        h_lines.append(
            f'  {{name:"{name}",t:"{ticker}",ccy:"{r["Currency"]}",mv:{r["Market value"]:.2f},'
            f'wt:{r["%age to TNA"]:.2f},ugl:{r["Unreal. gain / loss"]:.2f},'
            f'up:{r["Unreal. gain / loss in %"]:.2f},gics:"{gics}",co:"{co}"}}'
        )

new_h = "export const holdings = [\n" + ",\n".join(h_lines) + ",\n].sort((a, b) => b.mv - a.mv);"
pf = re.sub(r'export const holdings = \[.*?\]\.sort\(\(a, b\) => b\.mv - a\.mv\);', new_h, pf, flags=re.DOTALL)

# Currency allocation
ccy_items = []
for i in range(10):
    row = alloc.iloc[i]
    c = row['Currency']
    w = row['Weight (%age)']
    if pd.notna(c) and c != 'Total net asset value' and abs(w) > 0.005:
        ccy_items.append(f'{{name:"{c}",wt:{w:.2f}}}')
pf = re.sub(r'export const ccyAll = \[.*?\];', f'export const ccyAll = [{",".join(ccy_items)}];', pf)

# Add navData point (avoid duplicates)
nav_entry = f'["{NAV_DATE_ISO}",{NAV_SHARE_A},{BENCH_CURR}]'
if NAV_DATE_ISO not in pf:
    pf = re.sub(
        r'(].map\(\[d, f, b\]\))',
        f'  {nav_entry},\n\\1',
        pf
    )

with open(os.path.join(ROOT, 'src/data/portfolio.js'), 'w') as f:
    f.write(pf)
print("✓ portfolio.js")

# ═══════════════════════════════════════════════════
# 3. UPDATE Risk.jsx
# ═══════════════════════════════════════════════════

with open(os.path.join(ROOT, 'src/pages/Risk.jsx'), 'r') as f:
    risk = f.read()

# NAV date & fund NAV
risk = re.sub(r'const NAV_DATE = ".*?"', f'const NAV_DATE = "{NAV_DATE_SHORT}"', risk)
risk = re.sub(r'const FUND_NAV = [\d.]+', f'const FUND_NAV = {TNA}', risk)

# Positions array
pos_lines = []
for _, r in sec.iterrows():
    nm = NAME_MAP.get(r['Position description'], (r['Position description'],))[0]
    pos_lines.append(f'  {{ name: "{nm}", pct: {r["%age to TNA"]:.2f} }}')
pos_lines.append(f'  {{ type: "Cash & Liquidity", pct: {liq_at_sight_pct:.2f} }}, {{ type: "Current Assets", pct: {cur_assets_pct:.2f} }},')
pos_lines.append(f'  {{ type: "Forwards", pct: {fwd_pct:.2f} }}, {{ type: "Current Liabilities", pct: {cur_liab_pct:.2f} }},')
risk = re.sub(r'const positions = \[.*?\];', f'const positions = [\n{chr(44)+chr(10).join(pos_lines)}\n];', risk, flags=re.DOTALL)

# Cash breakdown (144110 only)
cb_lines = []
for _, r in cash_144110.iterrows():
    cb_lines.append(
        f'  {{ ccy: "{r["Currency"]}", type: "Cash Account", mvLocal: {r["Market value (pos. ccy)"]:.2f}, '
        f'fx: {r["Exchange rate"]:.6f}, mvEur: {r["Market value"]:.2f}, pctNav: {r["%age to TNA"]:.2f} }}'
    )
risk = re.sub(r'const cashBreakdown = \[.*?\];', f'const cashBreakdown = [\n{chr(44)+chr(10).join(cb_lines)},\n];', risk, flags=re.DOTALL)

# Collateral
collat = liq[liq['Account'] == 144212]
if len(collat) > 0:
    c = collat.iloc[0]
    risk = re.sub(r'const cashCollateral = \{.*?\};',
        f'const cashCollateral = {{ desc: "UBS AG London Branch", ccy: "EUR", mvEur: {c["Market value"]:.2f}, pctNav: {c["%age to TNA"]:.2f} }};', risk)

# Receivables
rec = liq[liq['Account'] == 156100]
rl = [f'  {{ desc: "Rec. Sales of Invest.", ccy: "{r["Currency"]}", mvEur: {r["Market value"]:.2f}, pctNav: {r["%age to TNA"]:.2f} }}' for _, r in rec.iterrows()]
risk = re.sub(r'const cashReceivables = \[.*?\];', f'const cashReceivables = [\n{chr(44)+chr(10).join(rl)},\n];', risk, flags=re.DOTALL)

# Spot receivable
spot = liq[liq['Account'] == 156360]
if len(spot) > 0:
    risk = re.sub(r'const cashSpotRec = \{.*?\};',
        f'const cashSpotRec = {{ desc: "Cash Rec. from Spot", ccy: "Mixed", mvEur: {spot["Market value"].sum():.2f}, pctNav: {spot["%age to TNA"].sum():.2f} }};', risk)

# Payables
pay_lines = []
for acct in [265000, 265059, 266300, 266360]:
    for _, r in liq[liq['Account'] == acct].iterrows():
        desc = str(r['Position description']).strip() if pd.notna(r['Position description']) else "Payable"
        pay_lines.append(f'  {{ desc: "{desc}", ccy: "{r["Currency"]}", mvEur: {r["Market value"]:.2f}, pctNav: {r["%age to TNA"]:.2f} }}')
risk = re.sub(r'const cashPayables = \[.*?\];', f'const cashPayables = [\n{chr(44)+chr(10).join(pay_lines)},\n];', risk, flags=re.DOTALL)

# UCITS liquidity limit
risk = re.sub(r'(\{ id: "liquidity".*?current: )[\d.]+', f'\\g<1>{liq_at_sight_pct:.2f}', risk)

with open(os.path.join(ROOT, 'src/pages/Risk.jsx'), 'w') as f:
    f.write(risk)
print("✓ Risk.jsx")

print(f"\n{'='*50}")
print("All files updated. Run: npx vite build && git push")
print(f"{'='*50}")

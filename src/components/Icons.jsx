const s = { width: 16, height: 16, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };

export const IconOverview = () => <svg {...s} viewBox="0 0 16 16"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>;
export const IconHoldings = () => <svg {...s} viewBox="0 0 16 16"><path d="M2 4h12M2 8h12M2 12h12"/><circle cx="5" cy="4" r="0.5" fill="currentColor"/><circle cx="5" cy="8" r="0.5" fill="currentColor"/><circle cx="5" cy="12" r="0.5" fill="currentColor"/></svg>;
export const IconAllocation = () => <svg {...s} viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5"/><path d="M8 2.5V8l3.9 3.9"/></svg>;
export const IconMarkets = () => <svg {...s} viewBox="0 0 16 16"><polyline points="2,12 5,7 8,9 11,4 14,6"/><path d="M11,4 L14,4 L14,6" fill="none"/></svg>;
export const IconWatchlist = () => <svg {...s} viewBox="0 0 16 16"><path d="M8 2l1.8 3.6L14 6.2l-3 2.9.7 4.1L8 11.4 4.3 13.2l.7-4.1-3-2.9 4.2-.6z"/></svg>;
export const IconClaude = () => <svg {...s} viewBox="0 0 16 16"><path d="M2 13V3a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 3z"/></svg>;
export const IconAttribution = () => <svg {...s} viewBox="0 0 16 16"><path d="M2 14V6l3-4 3 5 3-3 3 4v6"/><line x1="2" y1="14" x2="14" y2="14"/></svg>;
export const IconResearch = () => <svg {...s} viewBox="0 0 16 16"><path d="M4 2h6l3 3v9a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M10 2v3h3"/><path d="M5 8h6M5 10.5h4"/></svg>;
export const IconThematic = () => <svg {...s} viewBox="0 0 16 16"><circle cx="5" cy="5" r="2.5"/><circle cx="11" cy="5" r="2.5"/><circle cx="8" cy="11" r="2.5"/><path d="M6.8 6.2L7 9M9.2 6.2L9 9M5.8 7.3h4.4" strokeWidth="1" opacity="0.5"/></svg>;
export const IconMacro = () => <svg {...s} viewBox="0 0 16 16"><path d="M2 14V8l3-2 3 3 3-5 3 4"/><circle cx="14" cy="8" r="1.5" fill="currentColor" stroke="none"/><path d="M2 3v11h12" strokeWidth="1"/></svg>;
export const IconRisk = () => <svg {...s} viewBox="0 0 16 16"><path d="M8 1.5L1.5 13h13L8 1.5z"/><line x1="8" y1="6" x2="8" y2="9.5"/><circle cx="8" cy="11.5" r="0.7" fill="currentColor" stroke="none"/></svg>;
export const IconScenarios = () => <svg {...s} viewBox="0 0 16 16"><path d="M3 8h2l1.5-4 2 8L11 4l1.5 4h1.5"/><circle cx="2" cy="8" r="0.8" fill="currentColor" stroke="none"/><circle cx="14" cy="8" r="0.8" fill="currentColor" stroke="none"/></svg>;
export const IconSettings = () => <svg {...s} viewBox="0 0 16 16"><circle cx="8" cy="8" r="2"/><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4"/></svg>;

export const iconMap = { overview: IconOverview, holdings: IconHoldings, allocation: IconAllocation, markets: IconMarkets, research: IconResearch, thematic: IconThematic, macro: IconMacro, risk: IconRisk, scenarios: IconScenarios, watchlist: IconWatchlist, claude: IconClaude, settings: IconSettings };

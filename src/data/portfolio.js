import { MV } from './constants';

export const holdings = [
  {name:"NOVARTIS",t:"NOVN.SW",ccy:"CHF",mv:16407972.09,wt:4.32,ugl:2964757.13,up:22.05,gics:"Health Care",co:"Switzerland"},
  {name:"SIEMENS",t:"SIE.DE",ccy:"EUR",mv:8216000.00,wt:2.16,ugl:-170405.08,up:-2.03,gics:"Industrials",co:"Germany"},
  {name:"AIR LIQUIDE",t:"AI.PA",ccy:"EUR",mv:15292322.38,wt:4.02,ugl:1287242.01,up:9.19,gics:"Materials",co:"France"},
  {name:"VEOLIA",t:"VIE.PA",ccy:"EUR",mv:8751216.00,wt:2.30,ugl:45032.52,up:0.52,gics:"Utilities",co:"France"},
  {name:"HITACHI",t:"6501.T",ccy:"JPY",mv:18606342.79,wt:4.90,ugl:8331210.04,up:81.08,gics:"Industrials",co:"Japan"},
  {name:"ALIBABA",t:"9988.HK",ccy:"HKD",mv:15010529.13,wt:3.95,ugl:-150364.42,up:-0.99,gics:"Cons. Disc.",co:"China"},
  {name:"TENCENT",t:"0700.HK",ccy:"HKD",mv:15196402.73,wt:4.00,ugl:1532638.80,up:11.22,gics:"Comm. Services",co:"China"},
  {name:"AKZO NOBEL",t:"AKZA.AS",ccy:"EUR",mv:5873824.00,wt:1.55,ugl:-1063477.19,up:-15.33,gics:"Materials",co:"Netherlands"},
  {name:"VOLVO",t:"VOLV-B.ST",ccy:"SEK",mv:12029942.44,wt:3.17,ugl:-1110890.99,up:-8.45,gics:"Industrials",co:"Sweden"},
  {name:"EPIROC",t:"EPI-A.ST",ccy:"SEK",mv:15034784.32,wt:3.96,ugl:79141.63,up:0.53,gics:"Industrials",co:"Sweden"},
  {name:"ALPHABET",t:"GOOGL",ccy:"USD",mv:14627182.42,wt:3.85,ugl:2257810.91,up:18.25,gics:"Comm. Services",co:"USA"},
  {name:"AMAZON",t:"AMZN",ccy:"USD",mv:15160416.03,wt:3.99,ugl:-420738.79,up:-2.70,gics:"Cons. Disc.",co:"USA"},
  {name:"BROADCOM",t:"AVGO",ccy:"USD",mv:7293345.25,wt:1.92,ugl:-999726.64,up:-12.05,gics:"Information Technology",co:"USA"},
  {name:"CORNING",t:"GLW",ccy:"USD",mv:10494335.18,wt:2.76,ugl:6357589.02,up:153.69,gics:"Information Technology",co:"USA"},
  {name:"ICE",t:"ICE",ccy:"USD",mv:18396699.66,wt:4.84,ugl:619347.76,up:3.48,gics:"Financials",co:"USA"},
  {name:"JP MORGAN",t:"JPM",ccy:"USD",mv:16644309.01,wt:4.38,ugl:1278034.32,up:8.32,gics:"Financials",co:"USA"},
  {name:"MSCI",t:"MSCI",ccy:"USD",mv:18231114.21,wt:4.80,ugl:-841901.47,up:-4.41,gics:"Financials",co:"USA"},
  {name:"MICROSOFT",t:"MSFT",ccy:"USD",mv:17238094.81,wt:4.54,ugl:-1188673.04,up:-6.45,gics:"Information Technology",co:"USA"},
  {name:"NETFLIX",t:"NFLX",ccy:"USD",mv:18755362.61,wt:4.94,ugl:2909866.41,up:18.36,gics:"Comm. Services",co:"USA"},
  {name:"NVIDIA",t:"NVDA",ccy:"USD",mv:17589513.76,wt:4.63,ugl:691771.35,up:4.09,gics:"Information Technology",co:"USA"},
  {name:"PFIZER",t:"PFE",ccy:"USD",mv:19267397.85,wt:5.07,ugl:1542804.15,up:8.70,gics:"Health Care",co:"USA"},
  {name:"ROCKWELL",t:"ROK",ccy:"USD",mv:12766490.78,wt:3.36,ugl:83273.07,up:0.66,gics:"Industrials",co:"USA"},
  {name:"SAMSUNG",t:"005930.KS",ccy:"USD",mv:15233526.67,wt:4.01,ugl:1537705.66,up:11.23,gics:"Information Technology",co:"South Korea"},
  {name:"SERVICENOW",t:"NOW",ccy:"USD",mv:7534805.29,wt:1.98,ugl:-1256843.73,up:-14.30,gics:"Information Technology",co:"USA"},
  {name:"TAIWAN SEMI",t:"TSM",ccy:"USD",mv:17915354.76,wt:4.71,ugl:8900916.09,up:98.74,gics:"Information Technology",co:"Taiwan"},
  {name:"THERMO FISHER",t:"TMO",ccy:"USD",mv:17656193.36,wt:4.65,ugl:-1767296.13,up:-9.10,gics:"Health Care",co:"USA"},
].sort((a, b) => b.mv - a.mv);

export const VD = {"AIR LIQUIDE":{mc:96.9,fs:5.0,fe:10.6,en:12.1,e1:12.3,e2:11.4,pn:23.0,p1:23.5,p2:21.4,bn:3.3,sn:3.4},"AKZO NOBEL":{mc:8.2,fs:0.0,fe:1.8,en:7.5,e1:7.7,e2:7.2,pn:11.4,p1:11.6,p2:10.5,bn:1.7,sn:0.8},"ALIBABA":{mc:261.3,fs:14.1,fe:37.7,en:11.7,e1:16.4,e2:11.6,pn:16.7,p1:24.2,p2:16.6,bn:1.7,sn:1.8},"ALPHABET":{mc:2925.3,fs:17.6,fe:12.7,en:15.9,e1:16.5,e2:13.9,pn:25.3,p1:26.3,p2:22.4,bn:6.5,sn:7.5},"AMAZON":{mc:1909.6,fs:13.6,fe:16.7,en:10.5,e1:11.0,e2:8.9,pn:25.3,p1:26.5,p2:21.8,bn:4.1,sn:3.6},"BROADCOM":{mc:1273.4,fs:59.2,fe:50.7,en:18.3,e1:22.2,e2:14.3,pn:22.6,p1:27.7,p2:17.5,bn:11.3,sn:11.8},"CORNING":{mc:92.6,fs:18.8,fe:24.4,en:21.2,e1:22.0,e2:18.7,pn:38.2,p1:40.3,p2:32.1,bn:7.8,sn:5.5},"EPIROC":{mc:23.6,fs:6.4,fe:11.3,en:16.8,e1:17.2,e2:15.6,pn:26.7,p1:27.5,p2:24.1,bn:5.4,sn:3.9},"HITACHI":{mc:122.0,fs:8.5,fe:16.3,en:12.2,e1:13.6,e2:12.1,pn:23.4,p1:27.3,p2:23.3,bn:2.3,sn:1.5},"ICE":{mc:77.9,fs:-3.2,fe:11.1,en:15.0,e1:15.2,e2:14.3,pn:20.1,p1:20.6,p2:18.5,bn:3.0,sn:8.3},"JP MORGAN":{mc:669.4,fs:-14.0,fe:8.3,en:null,e1:null,e2:null,pn:13.1,p1:13.3,p2:12.3,bn:2.1,sn:3.9},"MICROSOFT":{mc:2456.1,fs:17.7,fe:17.2,en:13.0,e1:14.6,e2:12.5,pn:20.9,p1:23.2,p2:20.1,bn:5.3,sn:7.6},"MSCI":{mc:35.2,fs:10.3,fe:12.9,en:22.1,e1:22.6,e2:20.6,pn:27.6,p1:28.4,p2:25.1,bn:null,sn:11.6},"NETFLIX":{mc:335.8,fs:13.6,fe:22.2,en:23.1,e1:24.1,e2:20.2,pn:27.8,p1:29.1,p2:24.0,bn:10.8,sn:7.4},"NOVARTIS":{mc:268.1,fs:3.4,fe:6.0,en:13.4,e1:13.6,e2:12.6,pn:16.3,p1:16.6,p2:15.1,bn:5.8,sn:5.3},"NVIDIA":{mc:3635.0,fs:50.7,fe:46.9,en:16.6,e1:17.2,e2:13.5,pn:20.0,p1:20.9,p2:15.5,bn:12.3,sn:11.0},"PFIZER":{mc:132.8,fs:-3.8,fe:-7.0,en:8.4,e1:8.3,e2:8.7,pn:9.2,p1:9.1,p2:9.6,bn:1.7,sn:2.5},"ROCKWELL":{mc:34.6,fs:6.3,fe:13.1,en:20.4,e1:21.4,e2:19.3,pn:27.6,p1:29.3,p2:25.9,bn:9.1,sn:4.4},"SAMSUNG":{mc:747.0,fs:35.2,fe:72.8,en:4.4,e1:4.6,e2:3.9,pn:7.0,p1:7.4,p2:5.8,bn:2.0,sn:7.0},"SERVICENOW":{mc:100.0,fs:22.0,fe:20.3,en:18.3,e1:19.1,e2:15.7,pn:25.2,p1:26.3,p2:21.9,bn:6.8,sn:7.0},"SIEMENS":{mc:159.3,fs:7.0,fe:14.3,en:13.0,e1:13.7,e2:12.3,pn:17.4,p1:18.6,p2:16.1,bn:2.4,sn:1.9},"TAIWAN SEMI":{mc:1290.7,fs:29.5,fe:26.6,en:12.1,e1:12.7,e2:10.3,pn:22.1,p1:23.2,p2:18.9,bn:7.0,sn:9.0},"TENCENT":{mc:512.5,fs:14.1,fe:10.9,en:11.6,e1:11.9,e2:10.5,pn:14.3,p1:14.7,p2:13.1,bn:2.8,sn:4.8},"THERMO FISHER":{mc:152.6,fs:5.9,fe:8.7,en:17.3,e1:17.6,e2:16.3,pn:18.9,p1:19.3,p2:17.7,bn:3.0,sn:3.7},"VEOLIA":{mc:23.1,fs:5.1,fe:8.0,en:6.7,e1:6.8,e2:6.4,pn:12.8,p1:13.1,p2:11.9,bn:1.8,sn:0.5},"VOLVO":{mc:54.2,fs:4.8,fe:17.6,en:9.7,e1:10.0,e2:8.9,pn:13.3,p1:13.8,p2:11.9,bn:3.0,sn:1.2}};
export const VM = {mc:156.0,fs:9.4,fe:13.7,en:13.0,e1:14.6,e2:12.5,pn:20.5,p1:23.2,p2:18.1,bn:3.4,sn:4.2};
export const VW = {mc:763.5,fs:13.4,fe:19.6,en:13.5,e1:14.3,e2:12.3,pn:20.2,p1:21.5,p2:18.3,bn:4.8,sn:5.7};

export const FD = {"AIR LIQUIDE":{ev:106.6,s3:-3.5,e3:8.3,em:30.2,nm:13.1,nd:1.2,fc:37.9,dy:1.9,roe:13.3,roc:13.3,roi:9.5},"AKZO NOBEL":{ev:11.1,s3:-2.2,e3:22.5,em:7.2,nm:6.3,nd:4.0,fc:12.7,dy:3.3,roe:13.8,roc:13.8,roi:7.7},"ALIBABA":{ev:246.9,s3:4.6,e3:37.5,em:11.9,nm:9.1,nd:-1.0,fc:null,dy:0.7,roe:13.0,roc:13.0,roi:10.9},"ALPHABET":{ev:2874.3,s3:12.8,e3:33.3,em:38.2,nm:32.8,nd:-0.4,fc:63.6,dy:0.3,roe:35.7,roc:35.7,roi:32.0},"AMAZON":{ev:1949.3,s3:11.7,e3:null,em:21.0,nm:10.8,nd:0.3,fc:37.8,dy:0.0,roe:22.3,roc:22.3,roi:15.8},"BROADCOM":{ev:1317.0,s3:25.7,e3:19.9,em:54.4,nm:36.6,nd:1.3,fc:44.6,dy:0.8,roe:31.0,roc:14.2,roi:16.5},"CORNING":{ev:99.3,s3:3.4,e3:6.1,em:23.5,nm:10.2,nd:2.1,fc:25.4,dy:0.7,roe:14.2,roc:14.2,roi:8.3},"EPIROC":{ev:24.7,s3:7.7,e3:0.8,em:25.1,nm:13.9,nd:0.7,fc:22.5,dy:1.4,roe:20.2,roc:20.2,roi:14.2},"HITACHI":{ev:121.6,s3:-2.3,e3:null,em:15.4,nm:8.0,nd:0.0,fc:21.3,dy:0.9,roe:10.7,roc:10.7,roi:9.3},"ICE":{ev:93.3,s3:10.0,e3:30.8,em:54.1,nm:27.1,nd:2.6,fc:44.6,dy:1.2,roe:11.7,roc:11.7,roi:7.1},"JP MORGAN":{ev:1461.4,s3:21.0,e3:18.3,em:null,nm:20.3,nd:null,fc:36.1,dy:1.9,roe:16.1,roc:16.7,roi:7.4},"MICROSOFT":{ev:2484.9,s3:14.4,e3:21.1,em:58.9,nm:39.0,nd:0.2,fc:79.8,dy:0.9,roe:33.3,roc:33.3,roi:25.6},"MSCI":{ev:40.1,s3:11.7,e3:13.5,em:61.6,nm:38.4,nd:2.9,fc:54.2,dy:1.3,roe:null,roc:null,roi:32.7},"NETFLIX":{ev:342.5,s3:12.7,e3:36.4,em:66.6,nm:24.3,nd:0.3,fc:23.9,dy:0.0,roe:42.8,roc:42.8,roi:26.8},"NOVARTIS":{ev:288.4,s3:-2.1,e3:25.2,em:40.9,nm:25.6,nd:1.0,fc:42.3,dy:2.7,roe:30.4,roc:30.4,roi:19.2},"NVIDIA":{ev:3592.0,s3:null,e3:null,em:61.7,nm:55.6,nd:-0.4,fc:56.4,dy:0.0,roe:101.5,roc:101.5,roi:93.6},"PFIZER":{ev:178.7,s3:-14.6,e3:-37.2,em:37.9,nm:12.4,nd:2.2,fc:22.9,dy:6.2,roe:8.9,roc:8.9,roi:5.2},"ROCKWELL":{ev:37.4,s3:2.8,e3:-1.8,em:20.7,nm:11.5,nd:1.8,fc:18.6,dy:1.3,roe:24.2,roc:24.2,roi:13.3},"SAMSUNG":{ev:687.4,s3:0.2,e3:-9.3,em:27.1,nm:13.3,nd:-1.1,fc:41.2,dy:0.6,roe:11.1,roc:11.1,roi:11.0},"SERVICENOW":{ev:96.7,s3:22.4,e3:73.6,em:20.3,nm:13.2,nd:-1.4,fc:47.9,dy:0.0,roe:15.5,roc:15.5,roi:12.9},"SIEMENS":{ev:200.5,s3:2.7,e3:31.2,em:16.1,nm:10.0,nd:3.2,fc:16.3,dy:2.2,roe:13.3,roc:13.3,roi:7.6},"TAIWAN SEMI":{ev:1236.5,s3:17.2,e3:17.4,em:68.9,nm:45.1,nd:-0.7,fc:95.4,dy:0.6,roe:36.4,roc:36.4,roi:30.0},"TENCENT":{ev:509.2,s3:8.1,e3:5.1,em:41.3,nm:29.9,nd:-0.1,fc:null,dy:0.9,roe:21.0,roc:21.0,roi:16.2},"THERMO FISHER":{ev:178.8,s3:-0.3,e3:0.2,em:25.1,nm:15.0,nd:2.6,fc:21.0,dy:0.3,roe:13.0,roc:13.0,roi:7.9},"VEOLIA":{ev:48.4,s3:1.2,e3:18.4,em:14.8,nm:3.0,nd:3.9,fc:17.1,dy:3.9,roe:16.1,roc:16.1,roi:4.2},"VOLVO":{ev:70.3,s3:0.4,e3:1.7,em:13.9,nm:7.2,nd:2.7,fc:15.0,dy:2.3,roe:18.5,roc:18.5,roi:10.3}};
export const FM = {ev:189.7,s3:4.6,e3:18.3,em:27.1,nm:13.6,nd:1.0,fc:37.0,dy:0.9,roe:16.1,roc:16.7,roi:12.0};
export const FW = {ev:800.6,s3:6.4,e3:12.0,em:36.2,nm:22.5,nd:0.9,fc:37.5,dy:1.3,roe:23.6,roc:23.7,roi:19.3};

export const navData = [
  // Quarterly history (2015–2025 Q3)
  ["2015-06-01",100,100],["2015-09-30",86.11,86.37],["2015-12-31",92.57,93.21],
  ["2016-03-31",88.69,89.07],["2016-06-30",91.03,92.27],["2016-09-30",95.31,96.05],["2016-12-30",103.58,103.55],
  ["2017-03-31",110.30,109.17],["2017-06-30",110.47,106.75],["2017-09-29",113.72,108.33],["2017-12-29",116.53,112.76],
  ["2018-03-29",114.28,108.96],["2018-06-29",115.08,115.47],["2018-09-28",120.64,121.04],["2018-12-31",109.00,107.29],
  ["2019-03-29",122.84,119.87],["2019-06-28",129.06,125.18],["2019-09-30",134.98,130.73],["2019-12-31",145.55,138.33],
  ["2020-03-31",124.38,111.28],["2020-06-30",141.36,129.61],["2020-09-30",143.83,134.23],["2020-12-31",159.98,147.54],
  ["2021-03-31",179.09,160.62],["2021-06-30",189.34,170.95],["2021-09-30",191.43,173.08],["2021-12-31",202.87,188.17],
  ["2022-03-31",194.01,182.01],["2022-06-30",173.19,163.37],["2022-09-30",169.83,162.46],["2022-12-30",179.31,163.68],
  ["2023-03-31",190.23,172.53],["2023-06-30",192.45,182.43],["2023-09-29",178.37,181.59],["2023-12-29",183.33,193.25],
  ["2024-03-28",207.86,213.75],["2024-06-28",217.37,221.69],["2024-09-30",217.90,226.97],["2024-12-31",231.46,242.21],
  ["2025-03-31",218.10,229.11],["2025-06-30",222.29,235.13],["2025-09-30",238.89,252.81],
  // Weekly from Q4 2025 onward (more granular for YTD)
  ["2025-10-10",240.12,254.30],["2025-10-17",241.88,255.02],["2025-10-24",239.55,253.71],["2025-10-31",242.31,256.18],
  ["2025-11-07",243.90,257.44],["2025-11-14",244.52,258.10],["2025-11-21",243.18,257.82],["2025-11-28",245.10,259.35],
  ["2025-12-05",244.22,259.90],["2025-12-12",243.05,260.15],["2025-12-19",242.50,260.80],["2025-12-26",241.70,261.02],
  ["2025-12-31",241.95,261.25],
  ["2026-01-03",241.50,261.10],["2026-01-10",240.88,260.45],["2026-01-17",239.22,259.80],["2026-01-24",237.95,259.15],
  ["2026-01-31",238.60,259.90],["2026-02-07",239.15,260.22],["2026-02-14",237.80,259.55],["2026-02-21",236.45,258.90],
  ["2026-02-28",235.90,258.40],["2026-03-07",234.80,257.95],["2026-03-14",234.10,257.80],["2026-03-20",233.22,257.65],
  ["2026-03-25",236.73,258.40],
  ["2026-03-30",230.08,258.28],
].map(([d, f, b]) => ({ date: new Date(d), nav: f, bench: b }));

export const acwiHoldingWts = {"NVIDIA":4.6544,"TAIWAN SEMI":1.5734,"SAMSUNG":0.6966,"MSCI":0.0464,"PFIZER":0.1708,"ICE":0.0993,"MICROSOFT":2.9877,"NOVARTIS":0.3087,"HITACHI":0.1569,"NETFLIX":0.4320,"THERMO FISHER":0.1982,"EPIROC":0.0183,"JP MORGAN":0.8630,"AMAZON":2.1909,"ALIBABA":0.3013,"TENCENT":0.4617,"ALPHABET":3.5547,"AIR LIQUIDE":0.1234,"VOLVO":0.0527,"ROCKWELL":0.0454,"VEOLIA":0.0270,"CORNING":0.1119,"BROADCOM":1.5513,"SERVICENOW":0.1283,"AKZO NOBEL":0.0110,"SIEMENS":0.1969};

export const earCal = [
  {n:"JP MORGAN",d:"14 Apr",ty:"E",dt:"Q1 \u2014 est. $4.82"},
  {n:"NETFLIX",d:"15 Apr",ty:"E",dt:"Q1 \u2014 est. $6.45"},
  {n:"TSMC",d:"17 Apr",ty:"E",dt:"Q1 \u2014 est. $1.98"},
  {n:"NOVARTIS",d:"25 Mar",ty:"D",dt:"CHF 3.50/sh"},
  {n:"ALPHABET",d:"28 Apr",ty:"E",dt:"Q1 \u2014 est. $2.12"},
  {n:"MICROSOFT",d:"29 Apr",ty:"E",dt:"Q3FY26 \u2014 est. $3.25"},
];

// Allocation data
const gicsOrder = ["Information Technology","Financials","Health Care","Industrials","Comm. Services","Cons. Disc.","Materials","Utilities"];
export const portfolioGics = (() => {
  const m = {};
  holdings.forEach(h => { m[h.gics] = (m[h.gics] || 0) + h.mv });
  return gicsOrder.filter(s => m[s]).map(s => ({ name: s, wt: (m[s] / MV) * 100 }));
})();

export const acwiGics = [{name:"Information Technology",wt:26.68},{name:"Financials",wt:17.29},{name:"Industrials",wt:11.10},{name:"Cons. Disc.",wt:9.99},{name:"Comm. Services",wt:8.96},{name:"Health Care",wt:8.88},{name:"Consumer Staples",wt:5.19},{name:"Materials",wt:3.90},{name:"Energy",wt:3.69},{name:"Utilities",wt:2.57},{name:"Real Estate",wt:1.77}];

const regionMap = {"USA":"North America","Switzerland":"Europe","France":"Europe","Netherlands":"Europe","Germany":"Europe","Sweden":"Europe","Japan":"Japan","Taiwan":"Asia Pac ex Japan","South Korea":"Asia Pac ex Japan","China":"Asia Pac ex Japan"};
export const portfolioCo = (() => {
  const m = {};
  holdings.forEach(h => { const r = regionMap[h.co] || "Other"; m[r] = (m[r] || 0) + h.mv });
  return Object.entries(m).map(([n, v]) => ({ name: n, wt: (v / MV) * 100 })).sort((a, b) => b.wt - a.wt);
})();

export const acwiCo = [{name:"North America",wt:65.9},{name:"Europe",wt:15.4},{name:"Asia Pac ex Japan",wt:11.7},{name:"Japan",wt:5.0},{name:"Other",wt:2.0}];

// Updated from NAV report 30 Mar 2026 — Allocation sheet, by currency (net incl. FX forwards)
export const ccyAll = [{name:"CHF",wt:9.73},{name:"EUR",wt:4.14},{name:"GBP",wt:0.01},{name:"HKD",wt:7.95},{name:"JPY",wt:5.48},{name:"SEK",wt:7.38},{name:"USD",wt:65.31}];
export const acwiCcy = [{name:"USD",wt:63.0},{name:"EUR",wt:8.1},{name:"JPY",wt:5.0},{name:"HKD",wt:3.1},{name:"CHF",wt:1.9},{name:"SEK",wt:0.7},{name:"KRW",wt:1.6},{name:"TWD",wt:2.3},{name:"GBP",wt:3.3},{name:"Other",wt:11.0}];

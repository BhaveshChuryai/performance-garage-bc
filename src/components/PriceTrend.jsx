const TREND_DATA = {
  1:  [2850,2870,2890,2910,2900,2920,2900],
  2:  [380,375,370,385,393,390,393],
  3:  [460,470,475,480,490,488,490],
  4:  [1100,1120,1130,1150,1148,1150,1150],
  5:  [215,218,220,222,225,228,230],
  6:  [2700,2720,2740,2760,2780,2790,2800],
  7:  [2900,2920,2950,2980,2990,3000,3000],
  8:  [2500,2520,2540,2560,2580,2590,2600],
  9:  [195,198,200,203,205,208,210],
  10: [100,103,105,107,108,109,110],
  11: [130,133,135,137,139,140,142],
  12: [175,178,180,182,183,184,185],
  13: [310,318,322,325,328,330,335],
  14: [470,478,483,488,493,497,500],
  15: [2050,2080,2100,2120,2150,2170,2200],
};

const INSIGHTS = {
  1: { label:"🔥 High Demand", sub:"Listed as one of top 3 hypercars globally", trend:"+2.1%", color:"#c9a84c" },
  2: { label:"📉 Price Stabilised", sub:"Market value steady after initial surge", trend:"+3.4%", color:"#4caf50" },
  3: { label:"⚡ Selling Fast", sub:"Only 4 units available in Europe", trend:"+6.5%", color:"#c9a84c" },
  4: { label:"🔥 High Demand", sub:"Hybrid collectors driving prices up", trend:"+4.5%", color:"#c9a84c" },
  5: { label:"✅ Best Value", sub:"Highest retained value in its class", trend:"+7.0%", color:"#4caf50" },
  6: { label:"📈 Record Holder", sub:"Speed record attempts driving demand", trend:"+3.7%", color:"#c9a84c" },
  7: { label:"🔥 Exclusive", sub:"Only 150 road-legal units worldwide", trend:"+3.4%", color:"#c9a84c" },
  8: { label:"🎨 Collector's Pick", sub:"Appreciating asset with artisan provenance", trend:"+4.0%", color:"#4caf50" },
  9: { label:"⚡ Track Ready", sub:"Nismo edition in limited production", trend:"+7.7%", color:"#c9a84c" },
  10:{ label:"✅ Best Value", sub:"Most affordable mid-engine supercar", trend:"+9.1%", color:"#4caf50" },
  11:{ label:"🔥 Limited Units", sub:"Only 1000 built — all pre-allocated", trend:"+8.5%", color:"#c9a84c" },
  12:{ label:"📈 Appreciating", sub:"NA V10 models increasing in collector value", trend:"+5.7%", color:"#4caf50" },
  13:{ label:"⚡ Track Monster", sub:"Fastest AMG ever tested at Nürburgring", trend:"+7.9%", color:"#c9a84c" },
  14:{ label:"🏁 Le Mans Legacy", sub:"Race pedigree commanding premium pricing", trend:"+6.4%", color:"#4caf50" },
  15:{ label:"🔋 Future Classic", sub:"EV record holder — demand growing fast", trend:"+6.8%", color:"#00F5FF" },
};

export default function PriceTrend({ carId }) {
  const data = TREND_DATA[carId] || TREND_DATA[1];
  const insight = INSIGHTS[carId] || INSIGHTS[1];
  const months = ["Aug","Sep","Oct","Nov","Dec","Jan","Feb"];
  const min = Math.min(...data) * 0.995;
  const max = Math.max(...data) * 1.005;
  const H = 80, W = 260;
  const pts = data.map((v,i) => {
    const x = (i / (data.length-1)) * W;
    const y = H - ((v - min) / (max - min)) * H;
    return `${x},${y}`;
  }).join(" ");
  const lastPt = pts.split(" ").pop();
  const [lx, ly] = lastPt.split(",");

  return (
    <div className="price-trend-card">
      <div className="pt-header">
        <div className="pt-title">Market Insight</div>
        <div className="pt-badge" style={{color: insight.color}}>{insight.label}</div>
      </div>
      <div className="pt-sub">{insight.sub}</div>
      <div className="pt-chart">
        <svg width="100%" viewBox={`0 0 ${W} ${H+20}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polyline points={`${pts} ${W},${H} 0,${H}`} fill="url(#trendGrad)" stroke="none"/>
          <polyline points={pts} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx={lx} cy={ly} r="3" fill="var(--gold)"/>
        </svg>
        <div className="pt-months">
          {months.map(m => <span key={m}>{m}</span>)}
        </div>
      </div>
      <div className="pt-footer">
        <span className="pt-trend" style={{color:insight.color}}>↑ {insight.trend} (6 months)</span>
        <span className="pt-note">📍 Available near Pune</span>
      </div>
    </div>
  );
}

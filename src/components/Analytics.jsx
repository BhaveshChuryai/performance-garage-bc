import { useEffect, useRef } from "react";

export default function Analytics({ cars }) {
  const avgSpeed = Math.round(cars.reduce((s, c) => s + c.speed, 0) / cars.length);
  const top7speed = [...cars].sort((a, b) => b.speed - a.speed).slice(0, 7);
  const top7hp    = [...cars].sort((a, b) => b.hp    - a.hp   ).slice(0, 7);
  const maxSpd = Math.max(...top7speed.map(c => c.speed));
  const maxHp  = Math.max(...top7hp.map(c => c.hp));

  const colors = ["var(--cyan)","var(--purple)","var(--orange)",
    "rgba(0,245,255,0.6)","rgba(123,97,255,0.6)","rgba(255,107,0,0.6)","rgba(0,245,255,0.4)"];

  const sectionRef = useRef(null);
  const barsRef    = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        barsRef.current?.querySelectorAll(".bar-fill").forEach(b => {
          b.style.width = b.dataset.w + "%";
        });
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pg-section analytics-section" id="analytics" ref={sectionRef}>
      <div className="section-tag">Intelligence</div>
      <div className="section-title">ANALYTICS CENTER</div>
      <div className="section-sub">Real-time performance metrics across the entire garage.</div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Machines</div>
          <div className="stat-value">15</div>
          <div className="stat-sub">Across 4 categories</div>
          <div className="stat-icon">🏎</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Top Speed</div>
          <div className="stat-value">{avgSpeed}</div>
          <div className="stat-sub">km/h across fleet</div>
          <div className="stat-icon">⚡</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Fastest Machine</div>
          <div className="stat-value" style={{ fontSize:"20px", color:"var(--orange)" }}>Koenigsegg</div>
          <div className="stat-sub">Jesko — 531 km/h est.</div>
          <div className="stat-icon">🏆</div>
        </div>
      </div>

      {/* Charts */}
      <div className="chart-grid" ref={barsRef}>
        <div className="chart-card">
          <div className="chart-title">Top Speed Comparison (km/h)</div>
          {top7speed.map((c, i) => (
            <div key={c.id} className="bar-row">
              <div className="bar-label">{c.brand} {c.name}</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width:"0%", background: colors[i] }} data-w={(c.speed / maxSpd * 100).toFixed(1)} />
              </div>
              <div className="bar-val">{c.speed}</div>
            </div>
          ))}
        </div>
        <div className="chart-card">
          <div className="chart-title">Horsepower Comparison</div>
          {top7hp.map((c, i) => (
            <div key={c.id} className="bar-row">
              <div className="bar-label">{c.brand} {c.name}</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width:"0%", background: colors[i] }} data-w={(c.hp / maxHp * 100).toFixed(1)} />
              </div>
              <div className="bar-val">{c.hp}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

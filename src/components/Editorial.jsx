const ARTICLES = [
  { id:1, grad:"linear-gradient(135deg,#111,#1a1a2e)", title:"BUGATTI CHIRON — THE 1500HP STANDARD",      date:"27.03.2026", desc:"How Bugatti redefined the limits of automotive engineering with a quad-turbo W16 that makes 1600 Nm of torque at just 2000 RPM.", label:"CHIRON" },
  { id:2, grad:"linear-gradient(135deg,#0a0a1a,#001a3a)", title:"RIMAC NEVERA — THE ELECTRIC REVOLUTION",  date:"20.03.2026", desc:"1914HP, 1.85s to 100 km/h. The Croatian electric hypercar that silenced every ICE purist on the planet.", label:"NEVERA" },
  { id:3, grad:"linear-gradient(135deg,#1a0a00,#3d1c00)", title:"KOENIGSEGG JESKO — ABSOLUTE RECORD",      date:"15.03.2026", desc:"The Jesko Absolut claims a theoretical top speed of 531 km/h. Koenigsegg built the aerodynamics before the dyno sheet.", label:"JESKO" },
  { id:4, grad:"linear-gradient(135deg,#001a0a,#003d1c)", title:"FERRARI SF90 — HYBRID DOMINANCE",         date:"10.03.2026", desc:"Ferrari's most powerful road car ever. 986HP hybrid system that blends Italian emotion with electric precision.", label:"SF90" },
];

export default function Editorial() {
  return (
    <section className="editorial-section" id="editorial">
      <div className="editorial-inner">
        <div className="ed-tag">Latest</div>
        <div className="ed-title">FROM THE GARAGE</div>
        <div className="editorial-grid">
          {ARTICLES.map(a => (
            <div key={a.id} className="editorial-item">
              <div className="ed-img" style={{ background: a.grad }}>
                <span className="ed-watermark">{a.label}</span>
              </div>
              <div className="ed-body">
                <div className="ed-date">{a.date}</div>
                <div className="ed-article-title">{a.title}</div>
                <div className="ed-desc">{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

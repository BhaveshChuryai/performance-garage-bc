import { motion } from "framer-motion";
import Breadcrumbs from "./Breadcrumbs";

export const ARTICLES = [
  {
    id: 1,
    slug: "ferrari-sf90-hybrid-dominance",
    title: "Ferrari SF90: Hybrid dominance tuned for the road",
    short: "Ferrari blends instant electric torque with classic mid-engine theatre to create a road car that still feels like an event at idle.",
    date: "March 27, 2026",
    image: "/cars/ferrari-sf90.jpg",
    category: "Road Test",
    content: [
      "The SF90 Stradale is not simply fast. It feels layered. The electric motors sharpen initial response, while the V8 keeps the rear of the car alive with the kind of soundtrack buyers still expect from Maranello.",
      "In a premium showroom context, that duality matters. The SF90 looks futuristic, but it still communicates heritage through stance, cabin focus, and the way the body catches light. That makes it a natural centerpiece for a digital showroom experience.",
      "What stands out most is how complete the package feels. The performance numbers are staggering, yet the car's appeal is not only numerical. It is the feeling of a complex machine delivering speed with ceremony.",
    ],
  },
  {
    id: 2,
    slug: "bmw-m4-csl-track-character",
    title: "BMW M4 CSL: A sharper kind of grand tourer",
    short: "Less insulation, more intent. BMW's M4 CSL strips back the platform and turns every surface into part of the performance story.",
    date: "March 22, 2026",
    image: "/cars/bmw-m4.jpg",
    category: "Track Focus",
    content: [
      "The M4 CSL works because it knows what to remove. Rear seats, extra comfort, and excess weight disappear so the steering, braking, and body control can speak more clearly.",
      "Visually, the CSL suits a luxury black-and-gold interface extremely well. It has enough visual aggression to feel special, but enough restraint to remain elegant when framed like a premium product.",
      "For buyers who want engineering clarity rather than raw spectacle, the M4 CSL tells a different story from a hypercar. It is about precision, discipline, and the way small reductions change the whole car.",
    ],
  },
  {
    id: 3,
    slug: "koenigsegg-jesko-airflow-records",
    title: "Koenigsegg Jesko: Designed around airflow and ambition",
    short: "The Jesko looks extreme because every surface is negotiating stability, power, and a speed target few companies would even announce.",
    date: "March 18, 2026",
    image: "/cars/koenigsegg-jesko.jpg",
    category: "Engineering",
    content: [
      "Koenigsegg rarely builds around convention. With the Jesko, the company turned transmission packaging, aero management, and cooling into design signatures rather than hidden systems.",
      "That approach translates well into editorial cards because the shape carries tension even in still imagery. It reads as a machine under pressure, which is exactly what an automotive news section should communicate.",
      "For enthusiasts, the appeal is obvious. The Jesko is what happens when a boutique manufacturer chases top-end numbers without letting the object lose its sense of theatre.",
    ],
  },
  {
    id: 4,
    slug: "bugatti-chiron-luxury-speed-standard",
    title: "Bugatti Chiron: The luxury benchmark at impossible speed",
    short: "The Chiron remains the reference point for combining huge numbers with an atmosphere of calm, craft, and near-private-jet polish.",
    date: "March 12, 2026",
    image: "/cars/bugatti-chiron.jpg",
    category: "Luxury",
    content: [
      "Most hypercars ask the owner to tolerate some chaos. The Chiron does the opposite. It wraps enormous pace in refinement, turning very high speed into something eerily composed.",
      "That contrast is why it fits the Performance Garage brand so well. It is not only a performance object, but a luxury statement, and the interface around it should feel equally deliberate.",
      "A premium automotive platform works best when the content supports the product story. The Chiron's story is still one of engineering abundance executed with absolute discipline.",
    ],
  },
];

export default function Editorial({ articles, onOpenArticle }) {
  return (
    <section className="editorial-section premium-editorial" id="editorial">
      <div className="editorial-inner">
        <div className="ed-tag">Latest News</div>
        <div className="ed-title">From The Garage Journal</div>
        <div className="editorial-grid">
          {articles.map((article, index) => (
            <motion.button
              key={article.id}
              className="editorial-item editorial-card-button"
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              onClick={() => onOpenArticle(article)}
            >
              <div className="ed-img editorial-photo" style={{ backgroundImage: `url(${article.image})` }}>
                <div className="editorial-photo-overlay" />
                <span className="ed-watermark">{article.category}</span>
                <div className="editorial-copy">
                  <div className="ed-date">{article.date}</div>
                  <div className="ed-article-title">{article.title}</div>
                  <div className="ed-desc">{article.short}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArticleDetail({ article, featuredCars, onBack, onOpenCar }) {
  const features = [featuredCars.ferrari, featuredCars.bmw].filter(Boolean);

  return (
    <div className="article-page">
      <nav className="pg-nav scrolled">
        <div className="pg-logo">PERFORMANCE<span> GARAGE</span></div>
        <button className="detail-back" onClick={onBack}>Back to News</button>
      </nav>

      <header className="article-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0.82)), url(${article.image})` }}>
        <div className="article-hero-inner">
          <Breadcrumbs items={[{ label: "Home" }, { label: "News" }, { label: article.title, active: true }]} />
          <div className="article-meta-row">
            <span>{article.category}</span>
            <span>{article.date}</span>
          </div>
          <h1>{article.title}</h1>
          <p>{article.short}</p>
        </div>
      </header>

      <main className="article-body-wrap">
        <article className="article-body">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <aside className="article-side-panel">
          <div className="article-side-tag">Featured Cars</div>
          {features.map((car) => (
            <button key={car.id} className="article-car-link" onClick={() => onOpenCar(car)}>
              <img src={`/cars/${car.img}`} alt={car.name} />
              <div>
                <strong>{car.brand} {car.name}</strong>
                <span>{car.hp} HP · {car.engine}</span>
              </div>
            </button>
          ))}
        </aside>
      </main>
    </div>
  );
}

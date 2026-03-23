import { useState } from "react";
import Item from "./components/Item";
import "./index.css";

const CARS = [
  {
    id: 1,
    title: "BMW M4",
    cat: "supercar",
    hp: 503,
    zero: "3.8s",
    top: "290 km/h",
    engine: "3.0L Twin-Turbo I6",
    torque: "650 Nm",
    price: "€82,900",
    badge: "New",
    grad: "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
  },
  {
    id: 2,
    title: "Toyota Supra",
    cat: "sport",
    hp: 382,
    zero: "4.1s",
    top: "250 km/h",
    engine: "3.0L Turbo I6",
    torque: "500 Nm",
    price: "€54,300",
    badge: null,
    grad: "linear-gradient(135deg,#1a0a00 0%,#3d1c00 50%,#7a2d00 100%)",
  },
  {
    id: 3,
    title: "Bugatti Chiron",
    cat: "hypercar",
    hp: 1500,
    zero: "2.4s",
    top: "420 km/h",
    engine: "8.0L Quad-Turbo W16",
    torque: "1600 Nm",
    price: "€2,900,000",
    badge: "Exclusive",
    grad: "linear-gradient(135deg,#0a0a1a 0%,#1a0a3a 50%,#2d0060 100%)",
  },
  {
    id: 4,
    title: "Lamborghini Aventador",
    cat: "supercar",
    hp: 730,
    zero: "2.9s",
    top: "350 km/h",
    engine: "6.5L NA V12",
    torque: "690 Nm",
    price: "€393,000",
    badge: "Limited",
    grad: "linear-gradient(135deg,#1a1200 0%,#3d2d00 50%,#7a5a00 100%)",
  },
];

function App() {
  const [wish, setWish] = useState([]);
  const [cart, setCart] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const toggleWish = (id) => {
    if (wish.includes(id)) {
      setWish(wish.filter((x) => x !== id));
      showToast("Removed from wishlist");
    } else {
      setWish([...wish, id]);
      showToast("Saved to wishlist ♥");
    }
  };

  const toggleCart = (id) => {
    if (cart.includes(id)) {
      setCart(cart.filter((x) => x !== id));
      showToast("Removed from cart");
    } else {
      setCart([...cart, id]);
      showToast("Added to cart ✓");
    }
  };

  const toggleCompare = (car) => {
    if (compareList.find((c) => c.id === car.id)) {
      setCompareList(compareList.filter((c) => c.id !== car.id));
    } else if (compareList.length < 2) {
      setCompareList([...compareList, car]);
    } else {
      showToast("Max 2 cars — remove one first");
    }
  };

  const clearCompare = () => setCompareList([]);

  const filtered = CARS.filter((c) => {
    const matchCat = activeFilter === "all" || c.cat === activeFilter;
    const matchQ = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  const [a, b] = compareList;
  const hpWinner = compareList.length === 2 ? (a.hp > b.hp ? a : b) : null;
  const zWinner =
    compareList.length === 2
      ? parseFloat(a.zero) < parseFloat(b.zero)
        ? a
        : b
      : null;

  return (
    <div>
      {/* NAV */}
      <nav className="navbar">
        <div className="logo">BC&nbsp;Garage</div>
        <div className="nav-links">
          <span>Fleet</span>
          <span>Performance</span>
          <span>Luxury</span>
          <span>Compare</span>
        </div>
        <div className="cart-btn">
          <span>Cart</span>
          <div className="cart-count">{cart.length}</div>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/car.mp4" type="video/mp4" />
        </video>
        <div className="hero-fallback" />
        <div className="hero-vignette" />
        <div className="hero-accent" />
        <div className="hero-content">
          <div className="hero-eyebrow">Bhavesh Churyai Garage</div>
          <div className="hero-title">
            ENGINEERED FOR<br />
            <span className="hero-title-gold">DOMINANCE</span>
          </div>
          <div className="hero-sub">Performance Without Compromise</div>
          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() =>
                document
                  .getElementById("fleet")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Fleet
            </button>
            <button className="btn-ghost">Watch Reel</button>
          </div>
        </div>
        <div className="hero-stat-row">
          <div className="hero-stat">
            <div className="hero-stat-num">4</div>
            <div className="hero-stat-label">Vehicles</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">1500</div>
            <div className="hero-stat-label">Max HP</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">2.4s</div>
            <div className="hero-stat-label">0–100</div>
          </div>
        </div>
      </div>

      {/* FLEET SECTION */}
      <div className="section" id="fleet">
        <div className="section-eyebrow">Our Collection</div>
        <div className="section-title">THE FLEET</div>

        {/* CONTROLS */}
        <div className="controls">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search vehicles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {["all", "hypercar", "supercar", "sport"].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div className="empty">No vehicles found</div>
        ) : (
          <div className="cars-grid">
            {filtered.map((car) => (
              <Item
                key={car.id}
                car={car}
                inWish={wish.includes(car.id)}
                inCart={cart.includes(car.id)}
                inCompare={!!compareList.find((c) => c.id === car.id)}
                onWish={toggleWish}
                onCart={toggleCart}
                onCompare={toggleCompare}
              />
            ))}
          </div>
        )}
      </div>

      {/* COMPARE BAR */}
      {compareList.length > 0 && (
        <div className="compare-bar">
          <span className="compare-bar-label">Compare</span>
          <div className="compare-names">
            {compareList.map((c) => (
              <div key={c.id} className="compare-pill">
                {c.title}
              </div>
            ))}
          </div>
          <button
            className="compare-go"
            disabled={compareList.length !== 2}
            onClick={() => setModalOpen(true)}
          >
            Compare Now
          </button>
          <button className="compare-reset" onClick={clearCompare}>
            Clear
          </button>
        </div>
      )}

      {/* COMPARE MODAL */}
      {modalOpen && compareList.length === 2 && (
        <div className="modal-bg" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-x" onClick={() => setModalOpen(false)}>
              ✕
            </button>
            <div className="modal-ey">Head to Head</div>
            <div className="modal-h">PERFORMANCE DUEL</div>
            <div className="compare-cols">
              {[a, b].map((car) => (
                <div key={car.id} className="cmp-col">
                  <div
                    className="cmp-visual"
                    style={{ background: car.grad }}
                  >
                    <div className="cmp-vis-name">{car.title}</div>
                  </div>
                  <div className="cmp-name">{car.title}</div>
                  <div className="cmp-sub">
                    {car.cat} · {car.price}
                  </div>
                  <div className="cmp-row">
                    <span className="cmp-lbl">Horsepower</span>
                    <span className={`cmp-val ${hpWinner?.id === car.id ? "win" : ""}`}>
                      {car.hp} HP {hpWinner?.id === car.id ? "★" : ""}
                    </span>
                  </div>
                  <div className="cmp-row">
                    <span className="cmp-lbl">0–100 km/h</span>
                    <span className={`cmp-val ${zWinner?.id === car.id ? "win" : ""}`}>
                      {car.zero} {zWinner?.id === car.id ? "★" : ""}
                    </span>
                  </div>
                  <div className="cmp-row">
                    <span className="cmp-lbl">Top Speed</span>
                    <span className="cmp-val">{car.top}</span>
                  </div>
                  <div className="cmp-row">
                    <span className="cmp-lbl">Engine</span>
                    <span className="cmp-val" style={{ fontSize: "11px" }}>
                      {car.engine}
                    </span>
                  </div>
                  <div className="cmp-row">
                    <span className="cmp-lbl">Torque</span>
                    <span className="cmp-val">{car.torque}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="verdict">
              <div className="verdict-star">★</div>
              <div>
                <div className="verdict-title">Verdict</div>
                <div className="verdict-text">
                  The <strong className="verdict-winner">{hpWinner?.title}</strong> dominates
                  with {Math.abs(a.hp - b.hp)} HP more and{" "}
                  {parseFloat(hpWinner?.zero) < parseFloat(hpWinner?.id === a.id ? b.zero : a.zero)
                    ? "faster"
                    : "comparable"}{" "}
                  acceleration. The{" "}
                  {hpWinner?.id === a.id ? b.title : a.title} remains a
                  formidable machine — choose it for character and value.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      <div className={`toast ${toastVisible ? "show" : ""}`}>{toast}</div>
    </div>
  );
}
<video autoPlay muted loop playsInline className="hero-video">
  <source src="/car.mp4" type="video/mp4" />
</video>
export default App;

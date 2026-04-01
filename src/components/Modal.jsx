import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Gallery({ gallery, name }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = gallery[activeIndex];

  return (
    <div className="modal-gallery">
      <div className="modal-gallery-main">
        <img src={active.src} alt={active.alt || name} style={{ objectPosition: active.focus }} />
      </div>
      <div className="modal-gallery-thumbs">
        {gallery.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            className={`modal-thumb ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={image.src} alt={image.alt || name} style={{ objectPosition: image.focus }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function Modal({ car, onClose, onCheckout, onViewDetails, onWish, onCart, onCompare, inWish, inCart, inCompare }) {
  return (
    <AnimatePresence>
      <motion.div className="modal-bg" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div
          className="modal-box premium-modal-box"
          onClick={(event) => event.stopPropagation()}
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.96 }}
          transition={{ duration: 0.3 }}
        >
          <button className="modal-x" onClick={onClose}>x</button>
          <div className="premium-modal-layout">
            <Gallery gallery={car.gallery} name={car.name} />
            <div className="modal-body premium-modal-body">
              <div className="modal-brand">{car.brand}</div>
              <div className="modal-name">{car.name}</div>
              <div className="modal-engine">{car.engine}</div>
              <div className="modal-desc">{car.desc}</div>
              <div className="modal-stats-grid">
                {[["Horsepower", `${car.hp} HP`], ["Top Speed", `${car.speed} km/h`], ["0-100", car.zero], ["Torque", car.torque], ["Price", car.price]].map(([label, value]) => (
                  <div key={label} className="modal-stat-cell">
                    <div className="modal-stat-v">{value}</div>
                    <div className="modal-stat-k">{label}</div>
                  </div>
                ))}
              </div>
              <div className="modal-tags">
                {car.tags.map((tag) => <span key={tag} className="modal-tag">{tag}</span>)}
              </div>
              <div className="modal-footer-actions premium-modal-actions">
                <button className="btn-gold" onClick={onViewDetails}>View Details</button>
                <button className="btn-gold-outline" onClick={onCheckout}>Buy Now</button>
              </div>
              <div className="quick-actions-row">
                <button className={`action-btn ${inWish ? "wish-on" : ""}`} onClick={() => onWish(car.id)}>{inWish ? "Saved" : "Save"}</button>
                <button className={`action-btn ${inCart ? "cart-on" : ""}`} onClick={() => onCart(car.id)}>{inCart ? "In Cart" : "Add to Cart"}</button>
                <button className={`action-btn ${inCompare ? "cmp-on" : ""}`} onClick={() => onCompare(car)}>{inCompare ? "Added" : "Compare"}</button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function CompareBar({ compareList, onOpen, onClear }) {
  return (
    <div className="compare-bar">
      <span className="compare-bar-label">Compare</span>
      <div className="compare-pills">
        {compareList.map((car) => <div key={car.id} className="compare-pill">{car.brand} {car.name}</div>)}
      </div>
      <button className="compare-go" disabled={compareList.length !== 2} onClick={onOpen}>
        Compare Now
      </button>
      <button className="compare-reset" onClick={onClear}>Clear</button>
    </div>
  );
}

function getPriceNumber(price) {
  return parseFloat(String(price).replace(/[^0-9.]/g, "").replace(",", "")) || 0;
}

export function CompareModal({ cars, onClose }) {
  const [a, b] = cars;
  const hpWin = a.hp > b.hp ? a.id : b.id;
  const spdWin = a.speed > b.speed ? a.id : b.id;
  const accWin = parseFloat(a.zero) < parseFloat(b.zero) ? a.id : b.id;
  const performanceScoreA = a.hp + a.speed - parseFloat(a.zero) * 100;
  const performanceScoreB = b.hp + b.speed - parseFloat(b.zero) * 100;
  const bestPerformance = performanceScoreA >= performanceScoreB ? a : b;
  const valueScoreA = performanceScoreA / Math.max(getPriceNumber(a.price), 1);
  const valueScoreB = performanceScoreB / Math.max(getPriceNumber(b.price), 1);
  const bestValue = valueScoreA >= valueScoreB ? a : b;

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box cmp-modal-box premium-compare-box" onClick={(event) => event.stopPropagation()}>
        <button className="modal-x" onClick={onClose}>x</button>
        <div className="modal-body">
          <div className="modal-brand" style={{ color: "var(--gold)" }}>Head to Head</div>
          <div className="modal-name">Performance Duel</div>
          <div className="cmp-cols">
            {[a, b].map((car) => (
              <div key={car.id} className="cmp-col">
                <div className="cmp-vis">
                  <img src={`/cars/${car.img}`} alt={car.name} className="cmp-vis-img" />
                  <div className="cmp-vis-overlay" />
                  <div className="cmp-vis-name">{car.name}</div>
                </div>
                <div className="cmp-car-name">{car.brand} {car.name}</div>
                <div className="cmp-price">{car.cat} · {car.price}</div>
                {[
                  ["Horsepower", `${car.hp} HP`, hpWin === car.id],
                  ["Top Speed", `${car.speed} km/h`, spdWin === car.id],
                  ["Acceleration", car.zero, accWin === car.id],
                  ["Engine", car.engine, false],
                  ["Torque", car.torque, false],
                ].map(([label, value, win]) => (
                  <div key={label} className={`cmp-row ${win ? "win-row" : ""}`}>
                    <span className="cmp-lbl">{label}</span>
                    <span className={`cmp-val ${win ? "win" : ""}`}>{win ? "🏆 " : ""}{value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="compare-verdict-grid">
            <div className="compare-verdict-card">
              <div className="compare-verdict-label">Best Performance Car</div>
              <div className="compare-verdict-value">🏆 {bestPerformance.brand} {bestPerformance.name}</div>
              <div className="compare-verdict-sub">Wins the overall pace battle with the strongest combined horsepower, top-speed, and acceleration score.</div>
            </div>
            <div className="compare-verdict-card">
              <div className="compare-verdict-label">Best Value for Money</div>
              <div className="compare-verdict-value">🏆 {bestValue.brand} {bestValue.name}</div>
              <div className="compare-verdict-sub">Balances performance against listed price more efficiently than its rival in this comparison.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Toast({ message, visible }) {
  return <div className={`pg-toast ${visible ? "show" : ""}`}>{message}</div>;
}

export default Modal;

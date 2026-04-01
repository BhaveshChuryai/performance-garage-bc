import { useState } from "react";
import { motion } from "framer-motion";

export default function Item({ car, inWish, inCart, inCompare, onWish, onCart, onCompare, onCardClick, onQuickView }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.article
      className="car-card premium-card"
      layout
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      onClick={() => onCardClick(car)}
    >
      <div className="card-glow" />

      <div className="car-visual premium-card-visual">
        {!imgErr ? (
          <img src={`/cars/${car.img}`} alt={car.name} className="car-visual-img" onError={() => setImgErr(true)} />
        ) : (
          <div className="car-visual-bg" style={{ background: car.grad, position: "absolute", inset: 0 }} />
        )}
        <div className="car-visual-imgoverlay premium-car-overlay" />
        <div className="car-num">{String(car.id).padStart(2, "0")}</div>
        {car.badge && <div className="car-badge">{car.badge}</div>}
        <div className="near-tag">Near Pune</div>
        <div className="car-brand-watermark">{car.brand.split(" ")[0]}</div>
      </div>

      <div className="car-body">
        <div className="car-brand-tag">{car.brand}</div>
        <div className="car-name">{car.name}</div>
        <div className="car-desc">{car.desc.substring(0, 96)}...</div>
        <div className="car-specs-grid">
          <div className="spec-cell"><div className="spec-v">{car.hp}</div><div className="spec-k">HP</div></div>
          <div className="spec-cell"><div className="spec-v">{car.speed}</div><div className="spec-k">Top km/h</div></div>
          <div className="spec-cell"><div className="spec-v">{car.zero}</div><div className="spec-k">0-100</div></div>
          <div className="spec-cell"><div className="spec-v" style={{ fontSize: "11px", textTransform: "uppercase" }}>{car.cat}</div><div className="spec-k">Class</div></div>
        </div>
        <div className="fleet-card-footer">
          <div className="card-actions" onClick={(event) => event.stopPropagation()}>
            <button className={`action-btn ${inWish ? "wish-on" : ""}`} onClick={() => onWish(car.id)}>{inWish ? "Saved" : "Save"}</button>
            <button className={`action-btn ${inCart ? "cart-on" : ""}`} onClick={() => onCart(car.id)}>{inCart ? "In Cart" : "Add"}</button>
            <button className={`action-btn ${inCompare ? "cmp-on" : ""}`} onClick={() => onCompare(car)}>Compare</button>
          </div>
          <div className="card-detail-row" onClick={(event) => event.stopPropagation()}>
            <button className="btn-ghost fleet-secondary-btn" onClick={() => onQuickView(car)}>Quick View</button>
            <button className="btn-gold fleet-primary-btn" onClick={() => onCardClick(car)}>View Details</button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

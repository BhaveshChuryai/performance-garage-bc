import { useState } from "react";

export default function Item({ car, inWish, inCart, inCompare, onWish, onCart, onCompare, onCardClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`car-card ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onCardClick(car)}
    >
      <div className="card-glow" style={hovered ? {opacity:1} : {}} />

      {/* Visual — real image if available, gradient fallback */}
      <div className="car-visual">
        {!imgError ? (
          <>
            <img
              src={`/cars/${car.img}`}
              alt={car.name}
              className="car-visual-img"
              onError={() => setImgError(true)}
            />
            <div className="car-visual-imgoverlay" style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.85) 100%)',zIndex:1}} />
          </>
        ) : (
          <div className="car-visual-bg" style={{ background: car.grad, position:'absolute', inset:0 }} />
        )}
        <div className="car-num" style={{position:'absolute',top:12,left:16,zIndex:2,fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:2,color:'rgba(255,255,255,0.3)',fontWeight:600}}>{String(car.id).padStart(2,"0")}</div>
        {car.badge && <div className="car-badge" style={{position:'absolute',top:12,right:12,zIndex:2}}>{car.badge}</div>}
        <div className="car-brand-watermark" style={{position:'relative',zIndex:2}}>{car.brand.split(" ")[0]}</div>
      </div>

      {/* Body */}
      <div className="car-body">
        <div className="car-brand-tag">{car.brand}</div>
        <div className="car-name">{car.name}</div>
        <div className="car-desc">{car.desc.substring(0, 80)}…</div>

        <div className="car-specs-grid">
          <div className="spec-cell"><div className="spec-v">{car.hp}</div><div className="spec-k">HP</div></div>
          <div className="spec-cell"><div className="spec-v">{car.speed}</div><div className="spec-k">Top km/h</div></div>
          <div className="spec-cell"><div className="spec-v">{car.zero}</div><div className="spec-k">0–100</div></div>
          <div className="spec-cell"><div className="spec-v" style={{fontSize:"11px",textTransform:"uppercase"}}>{car.cat}</div><div className="spec-k">Class</div></div>
        </div>

        <div className="card-actions" onClick={e => e.stopPropagation()}>
          <button className={`action-btn ${inWish?"wish-on":""}`} onClick={() => onWish(car.id)}>{inWish?"♥ Saved":"♡ Save"}</button>
          <button className={`action-btn ${inCart?"cart-on":""}`} onClick={() => onCart(car.id)}>{inCart?"✓ Cart":"+ Cart"}</button>
          <button className={`action-btn ${inCompare?"cmp-on":""}`} onClick={() => onCompare(car)}>{inCompare?"⚖ Added":"⚖ Compare"}</button>
        </div>
      </div>
    </div>
  );
}

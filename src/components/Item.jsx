import { useState } from "react";

export default function Item({ car, inWish, inCart, inCompare, onWish, onCart, onCompare, onCardClick }) {
  const [imgErr, setImgErr] = useState(false);
  const [ripple, setRipple] = useState(false);

  const handleClick = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 400);
    onCardClick(car);
  };

  return (
    <div className={`car-card ${ripple?"ripple":""}`} onClick={handleClick}>
      <div className="card-glow" />

      <div className="car-visual">
        {!imgErr
          ? <img src={`/cars/${car.img}`} alt={car.name} className="car-visual-img" onError={() => setImgErr(true)}/>
          : <div className="car-visual-bg" style={{background:car.grad,position:"absolute",inset:0}}/>
        }
        <div className="car-visual-imgoverlay"/>
        <div className="car-num">{String(car.id).padStart(2,"0")}</div>
        {car.badge && <div className="car-badge">{car.badge}</div>}
        <div className="near-tag">📍 Near Pune</div>
        <div className="car-brand-watermark">{car.brand.split(" ")[0]}</div>
      </div>

      <div className="car-body">
        <div className="car-brand-tag">{car.brand}</div>
        <div className="car-name">{car.name}</div>
        <div className="car-desc">{car.desc.substring(0,80)}…</div>
        <div className="car-specs-grid">
          <div className="spec-cell"><div className="spec-v">{car.hp}</div><div className="spec-k">HP</div></div>
          <div className="spec-cell"><div className="spec-v">{car.speed}</div><div className="spec-k">Top km/h</div></div>
          <div className="spec-cell"><div className="spec-v">{car.zero}</div><div className="spec-k">0–100</div></div>
          <div className="spec-cell"><div className="spec-v" style={{fontSize:"11px",textTransform:"uppercase"}}>{car.cat}</div><div className="spec-k">Class</div></div>
        </div>
        <div className="card-actions" onClick={e => e.stopPropagation()}>
          <button className={`action-btn ${inWish?"wish-on":""}`} onClick={()=>onWish(car.id)}>{inWish?"♥":"♡"}</button>
          <button className={`action-btn ${inCart?"cart-on":""}`} onClick={()=>onCart(car.id)}>{inCart?"✓":"+Cart"}</button>
          <button className={`action-btn ${inCompare?"cmp-on":""}`} onClick={()=>onCompare(car)}>⚖</button>
        </div>
      </div>
    </div>
  );
}

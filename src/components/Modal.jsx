import { useState } from "react";

/* ── Car Detail Modal ── */
export function Modal({ car, onClose, onCheckout }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose}>✕</button>
        <div className="modal-hero-vis">
          {!imgErr
            ? <img src={`/cars/${car.img}`} alt={car.name} className="modal-hero-img" onError={() => setImgErr(true)} />
            : <div style={{position:"absolute",inset:0,background:car.grad}} />
          }
          <div className="modal-hero-overlay" />
          <div className="modal-hero-name">{car.name}</div>
        </div>
        <div className="modal-body">
          <div className="modal-brand">{car.brand}</div>
          <div className="modal-name">{car.name}</div>
          <div className="modal-engine">{car.engine}</div>
          <div className="modal-desc">{car.desc}</div>
          <div className="modal-stats-grid">
            {[["HP",car.hp],["Top Speed",car.speed+" km/h"],["0–100",car.zero],["Torque",car.torque],["Price",car.price]].map(([k,v]) => (
              <div key={k} className="modal-stat-cell">
                <div className="modal-stat-v">{v}</div>
                <div className="modal-stat-k">{k}</div>
              </div>
            ))}
          </div>
          <div className="modal-tags">
            {car.tags.map(t => <span key={t} className="modal-tag">{t}</span>)}
          </div>
          <div className="modal-footer-actions">
            <button className="btn-gold" onClick={() => { onCheckout && onCheckout(); onClose(); }}>⚡ Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── CompareBar ── */
export function CompareBar({ compareList, onOpen, onClear }) {
  return (
    <div className="compare-bar">
      <span className="compare-bar-label">Compare</span>
      <div className="compare-pills">
        {compareList.map(c => <div key={c.id} className="compare-pill">{c.brand} {c.name}</div>)}
      </div>
      <button className="compare-go" disabled={compareList.length !== 2} onClick={onOpen}>
        Compare Now
      </button>
      <button className="compare-reset" onClick={onClear}>Clear</button>
    </div>
  );
}

/* ── CompareModal ── */
export function CompareModal({ cars, onClose }) {
  const [a, b] = cars;
  const hpWin  = a.hp    > b.hp    ? a.id : b.id;
  const spdWin = a.speed > b.speed ? a.id : b.id;
  const zWin   = parseFloat(a.zero) < parseFloat(b.zero) ? a.id : b.id;
  const winner = a.hp > b.hp ? a : b;
  const loser  = a.hp > b.hp ? b : a;

  const CarImg = ({ car }) => {
    const [err, setErr] = useState(false);
    return (
      <div className="cmp-vis" style={err ? { background: car.grad } : {}}>
        {!err && <img src={`/cars/${car.img}`} alt={car.name} className="cmp-vis-img" onError={() => setErr(true)} />}
        <div className="cmp-vis-overlay" />
        <div className="cmp-vis-name">{car.name}</div>
      </div>
    );
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box cmp-modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose}>✕</button>
        <div className="modal-body">
          <div className="modal-brand" style={{color:"var(--gold)"}}>Head to Head</div>
          <div className="modal-name">PERFORMANCE DUEL</div>
          <div className="cmp-cols">
            {[a,b].map(car => (
              <div key={car.id} className="cmp-col">
                <CarImg car={car} />
                <div className="cmp-car-name">{car.brand} {car.name}</div>
                <div className="cmp-price">{car.cat} · {car.price}</div>
                {[
                  ["Horsepower", `${car.hp} HP`,      hpWin  === car.id],
                  ["0–100 km/h", car.zero,             zWin   === car.id],
                  ["Top Speed",  `${car.speed} km/h`,  spdWin === car.id],
                  ["Engine",     car.engine,           false],
                  ["Torque",     car.torque,           false],
                ].map(([k,v,win]) => (
                  <div key={k} className="cmp-row">
                    <span className="cmp-lbl">{k}</span>
                    <span className={`cmp-val ${win?"win":""}`}>{v} {win?"★":""}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="verdict-box">
            <span className="verdict-star">★</span>
            <div>
              <div className="verdict-title">Verdict</div>
              <div className="verdict-text">
                The <strong style={{color:"var(--gold)"}}>{winner.brand} {winner.name}</strong> dominates with {Math.abs(a.hp-b.hp)} HP more.
                The {loser.brand} {loser.name} remains a formidable machine — choose it for its character and engineering story.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Toast ── */
export function Toast({ message, visible }) {
  return <div className={`pg-toast ${visible?"show":""}`}>{message}</div>;
}

export default Modal;

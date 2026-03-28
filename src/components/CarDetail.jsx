import { useState } from "react";
import { Toast } from "./Modal";

export default function CarDetail({ car, inWish, inCart, inCompare, onWish, onCart, onCompare, onBack, onCheckout, relatedCars, onRelatedClick, toastMsg, toastVisible }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="detail-page">
      {/* NAV BAR */}
      <nav className="pg-nav">
        <div className="pg-logo">PERFORMANCE<span> GARAGE</span></div>
        <button className="detail-back" onClick={onBack}>← Back to Fleet</button>
      </nav>

      {/* HERO IMAGE */}
      <div className="detail-hero" style={{ background: car.grad }}>
        {!imgErr ? (
          <img src={`/cars/${car.img}`} alt={car.name} className="detail-hero-img" onError={() => setImgErr(true)} />
        ) : (
          <div className="detail-hero-fallback" style={{ background: car.grad }} />
        )}
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <div className="detail-eyebrow">{car.brand} · {car.cat.toUpperCase()}</div>
          <div className="detail-big-name">{car.name}</div>
          <div className="detail-price-tag">{car.price}</div>
          <div className="detail-hero-actions">
            <button className="btn-gold" onClick={() => { onCart(car.id); }}>
              {inCart ? "✓ In Cart" : "+ Add to Cart"}
            </button>
            <button className="btn-gold-outline" onClick={onCheckout}>Buy Now</button>
            <button className={`btn-icon ${inWish ? "active-wish" : ""}`} onClick={() => onWish(car.id)}>
              {inWish ? "♥" : "♡"}
            </button>
            <button className={`btn-icon ${inCompare ? "active-cmp" : ""}`} onClick={() => onCompare(car)}>
              ⚖
            </button>
          </div>
        </div>
      </div>

      {/* SPECS STRIP */}
      <div className="detail-specs-strip">
        {[["Horsepower", car.hp + " HP"],["Top Speed", car.speed + " km/h"],["0–100 km/h", car.zero],["Torque", car.torque],["Engine", car.engine]].map(([k,v]) => (
          <div key={k} className="detail-spec-item">
            <div className="detail-spec-val">{v}</div>
            <div className="detail-spec-key">{k}</div>
          </div>
        ))}
      </div>

      {/* BODY */}
      <div className="detail-body">
        <div className="detail-left">
          <div className="detail-section-tag">About</div>
          <div className="detail-section-title">{car.brand} {car.name}</div>
          <div className="detail-desc">{car.desc}</div>
          <div className="detail-tags">
            {car.tags.map(t => <span key={t} className="detail-tag">{t}</span>)}
          </div>

          <div className="detail-section-tag" style={{marginTop:40}}>Specifications</div>
          <div className="detail-full-specs">
            {[["Brand",car.brand],["Model",car.name],["Category",car.cat],["Engine",car.engine],["Horsepower",car.hp+" HP"],["Torque",car.torque],["0–100 km/h",car.zero],["Top Speed",car.speed+" km/h"],["Price",car.price]].map(([k,v])=>(
              <div key={k} className="detail-spec-row">
                <span className="dsr-key">{k}</span>
                <span className="dsr-val">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-right">
          <div className="detail-cta-card">
            <div className="detail-cta-price">{car.price}</div>
            <div className="detail-cta-name">{car.brand} {car.name}</div>
            <button className="btn-gold full-w" onClick={() => onCart(car.id)}>
              {inCart ? "✓ Already in Cart" : "+ Add to Cart"}
            </button>
            <button className="btn-gold-outline full-w" onClick={onCheckout}>
              ⚡ Buy Now
            </button>
            <button className={`btn-outline-muted full-w ${inWish?"active-wish":""}`} onClick={() => onWish(car.id)}>
              {inWish ? "♥ Saved to Wishlist" : "♡ Add to Wishlist"}
            </button>
            <button className={`btn-outline-muted full-w ${inCompare?"active-cmp":""}`} onClick={() => onCompare(car)}>
              {inCompare ? "⚖ Added to Compare" : "⚖ Add to Compare"}
            </button>
            <div className="detail-cta-note">Free worldwide delivery · Bespoke configuration available</div>
          </div>
        </div>
      </div>

      {/* RELATED CARS */}
      {relatedCars.length > 0 && (
        <div className="detail-related">
          <div className="detail-section-tag">More Like This</div>
          <div className="detail-section-title" style={{marginBottom:28}}>Related Machines</div>
          <div className="related-grid">
            {relatedCars.map(rc => {
              const [rErr, setRErr] = useState(false);
              return (
                <div key={rc.id} className="related-card" onClick={() => onRelatedClick(rc)}>
                  <div className="related-img-wrap">
                    {!rErr
                      ? <img src={`/cars/${rc.img}`} alt={rc.name} onError={() => setRErr(true)} />
                      : <div style={{width:"100%",height:"100%",background:rc.grad}} />
                    }
                    <div className="related-img-overlay" />
                  </div>
                  <div className="related-body">
                    <div className="related-brand">{rc.brand}</div>
                    <div className="related-name">{rc.name}</div>
                    <div className="related-hp">{rc.hp} HP · {rc.price}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <footer className="pg-footer">
        <div className="footer-logo">Performance Garage</div>
        <div className="footer-text">Built by Bhavesh Churyai · Lab Experiment 4</div>
      </footer>

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}

import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";

function SavedCard({ car, onCardClick, onRemove, onCart, inCart }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="saved-card" onClick={() => onCardClick(car)}>
      <div className="saved-card-img">
        {!imgErr ? (
          <img src={`/cars/${car.img}`} alt={car.name} onError={() => setImgErr(true)} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: car.grad }} />
        )}
        <div className="saved-card-overlay" />
      </div>
      <div className="saved-card-body">
        <div className="saved-card-brand">{car.brand}</div>
        <div className="saved-card-name">{car.name}</div>
        <div className="saved-card-price">{car.price}</div>
        <div className="saved-card-specs">{car.hp} HP · {car.zero} · {car.speed} km/h</div>
        <div className="saved-card-actions" onClick={(event) => event.stopPropagation()}>
          <button
            className={`btn-gold ${inCart ? "" : "outline"}`}
            style={inCart ? { background: "#4caf50", color: "#fff" } : {}}
            onClick={() => onCart(car.id)}
          >
            {inCart ? "In Cart" : "Add to Cart"}
          </button>
          <button className="saved-remove-btn" onClick={() => onRemove(car.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SavedPage({ savedIds, cars, onBack, onCardClick, onRemove, onCart, cart }) {
  const savedCars = cars.filter((car) => savedIds.includes(car.id));

  return (
    <div className="saved-page">
      <nav className="pg-nav scrolled">
        <div className="pg-logo">PERFORMANCE<span> GARAGE</span></div>
        <button className="detail-back" onClick={onBack}>Back to Garage</button>
      </nav>
      <div className="saved-hero">
        <Breadcrumbs items={[{ label: "Home" }, { label: "Saved Cars", active: true }]} />
        <div className="section-tag" style={{ marginBottom: 8 }}>Wishlist</div>
        <div className="section-title">Saved Cars</div>
        <div className="section-sub">{savedCars.length} vehicle{savedCars.length !== 1 ? "s" : ""} saved to your garage</div>
      </div>
      {savedCars.length === 0 ? (
        <div className="saved-empty">
          <div className="saved-empty-icon">Saved List Empty</div>
          <div className="saved-empty-title">No saved vehicles</div>
          <div className="saved-empty-sub">Browse the fleet and save cars you love</div>
          <button className="btn-gold" onClick={onBack} style={{ marginTop: 24 }}>Browse Fleet</button>
        </div>
      ) : (
        <div className="saved-grid">
          {savedCars.map((car) => (
            <SavedCard
              key={car.id}
              car={car}
              onCardClick={onCardClick}
              onRemove={onRemove}
              onCart={onCart}
              inCart={cart.includes(car.id)}
            />
          ))}
        </div>
      )}
      <footer className="pg-footer" style={{ marginTop: 80 }}>
        <div className="footer-logo">Performance Garage</div>
        <div className="footer-text">Wishlist and curated garage management.</div>
      </footer>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Toast } from "./Modal";
import PriceTrend from "./PriceTrend";
import FakeNotification from "./FakeNotification";
import Breadcrumbs from "./Breadcrumbs";

function RelatedCard({ car, onClick, onQuickView }) {
  return (
    <motion.div className="related-card" whileHover={{ y: -6 }} onClick={() => onClick(car)}>
      <div className="related-img-wrap">
        <img src={`/cars/${car.img}`} alt={car.name} />
        <div className="related-img-overlay" />
      </div>
      <div className="related-body">
        <div className="related-brand">{car.brand}</div>
        <div className="related-name">{car.name}</div>
        <div className="related-hp">{car.hp} HP · {car.price}</div>
        <button
          className="btn-ghost fleet-secondary-btn related-quick-btn"
          onClick={(event) => {
            event.stopPropagation();
            onQuickView(car);
          }}
        >
          Quick View
        </button>
      </div>
    </motion.div>
  );
}

export default function CarDetail({
  car,
  inWish,
  inCart,
  inCompare,
  onWish,
  onCart,
  onCompare,
  onBack,
  onCheckout,
  relatedCars,
  onRelatedClick,
  onQuickView,
  toastMsg,
  toastVisible,
  recentlyViewed,
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setActiveTab("overview");
  }, [car.id]);

  const smartRecs = relatedCars.filter((entry) => entry.cat === car.cat || entry.brand === car.brand).slice(0, 3);

  return (
    <div className="detail-page page-loaded">
      <nav className="pg-nav scrolled">
        <div className="pg-logo">PERFORMANCE<span> GARAGE</span></div>
        <button className="detail-back" onClick={onBack}>Back to Fleet</button>
      </nav>

      <FakeNotification />

      <section className="detail-hero premium-detail-hero">
        <div className="detail-media-column">
          <div className="detail-hero-media">
            <img
              src={car.gallery[activeImage].src}
              alt={car.gallery[activeImage].alt}
              className="detail-hero-img"
              style={{ objectPosition: car.gallery[activeImage].focus }}
            />
            <div className="detail-hero-overlay" />
          </div>
          <div className="detail-gallery-row">
            {car.gallery.map((image, index) => (
              <button key={`${image.src}-${index}`} className={`detail-thumb ${index === activeImage ? "active" : ""}`} onClick={() => setActiveImage(index)}>
                <img src={image.src} alt={image.alt} style={{ objectPosition: image.focus }} />
              </button>
            ))}
          </div>
        </div>

        <motion.div className="detail-hero-content premium-detail-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <Breadcrumbs items={[{ label: "Home" }, { label: "Fleet" }, { label: `${car.brand} ${car.name}`, active: true }]} />
          <div className="detail-eyebrow">{car.brand} · {car.cat.toUpperCase()} · {car.badge || "Performance Series"}</div>
          <div className="detail-big-name">{car.name}</div>
          <div className="detail-price-tag">{car.price}</div>
          <p className="detail-hero-summary">{car.desc}</p>
          <div className="detail-hero-actions">
            <button className={`btn-gold ${inCart ? "cart-active" : ""}`} onClick={() => onCart(car.id)}>
              {inCart ? "In Cart" : "Add to Cart"}
            </button>
            <button className="btn-gold-outline" onClick={onCheckout}>Buy Now</button>
            <button className={`btn-icon ${inWish ? "active-wish" : ""}`} onClick={() => onWish(car.id)} title="Save to Wishlist">
              {inWish ? "♥" : "♡"}
            </button>
            <button className={`btn-icon ${inCompare ? "active-cmp" : ""}`} onClick={() => onCompare(car)} title="Add to Compare">
              C
            </button>
          </div>
        </motion.div>
      </section>

      <div className="detail-specs-strip premium-specs-strip">
        {[["Horsepower", `${car.hp} HP`], ["Top Speed", `${car.speed} km/h`], ["0-100 km/h", car.zero], ["Torque", car.torque], ["Engine", car.engine]].map(([label, value]) => (
          <div key={label} className="detail-spec-item">
            <div className="detail-spec-val">{value}</div>
            <div className="detail-spec-key">{label}</div>
          </div>
        ))}
      </div>

      <div className="detail-tabs">
        {["overview", "specs", "insights"].map((tab) => (
          <button key={tab} className={`detail-tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="detail-body">
        <div className="detail-left">
          {activeTab === "overview" && (
            <div className="tab-panel fade-in">
              <div className="detail-section-tag">Overview</div>
              <div className="detail-section-title">{car.brand} {car.name}</div>
              <div className="detail-desc">{car.desc}</div>
              <div className="detail-tags">{car.tags.map((tag) => <span key={tag} className="detail-tag">{tag}</span>)}</div>

              {recentlyViewed?.length > 1 && (
                <div style={{ marginTop: 32 }}>
                  <div className="detail-section-tag">Recently Viewed</div>
                  <div className="rv-strip">
                    {recentlyViewed.filter((entry) => entry.id !== car.id).slice(0, 4).map((entry) => (
                      <div key={entry.id} className="rv-item" onClick={() => onRelatedClick(entry)}>
                        <div className="rv-img"><img src={`/cars/${entry.img}`} alt={entry.name} /></div>
                        <div className="rv-name">{entry.name}</div>
                        <div className="rv-price">{entry.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "specs" && (
            <div className="tab-panel fade-in">
              <div className="detail-section-tag">Full Specifications</div>
              <div className="detail-full-specs">
                {[["Brand", car.brand], ["Model", car.name], ["Category", car.cat], ["Engine", car.engine], ["Horsepower", `${car.hp} HP`], ["Torque", car.torque], ["0-100 km/h", car.zero], ["Top Speed", `${car.speed} km/h`], ["Price", car.price], ["Availability", "Available near Pune"]].map(([label, value]) => (
                  <div key={label} className="detail-spec-row">
                    <span className="dsr-key">{label}</span>
                    <span className="dsr-val">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "insights" && (
            <div className="tab-panel fade-in">
              <div className="detail-section-tag">Market Data</div>
              <PriceTrend carId={car.id} />
            </div>
          )}
        </div>

        <div className="detail-right">
          <div className="detail-cta-card premium-cta-card">
            <div className="detail-cta-price">{car.price}</div>
            <div className="detail-cta-name">{car.brand} {car.name}</div>
            <div className="detail-near-tag">Near Pune · Concierge response within minutes</div>
            <button className={`btn-gold full-w ${inCart ? "cart-active" : ""}`} onClick={() => onCart(car.id)}>
              {inCart ? "Already in Cart" : "Add to Cart"}
            </button>
            <button className="btn-gold full-w" onClick={onCheckout}>Buy Now</button>
            <button className={`btn-outline-muted full-w ${inWish ? "active-wish" : ""}`} onClick={() => onWish(car.id)}>
              {inWish ? "Saved to Wishlist" : "Save to Wishlist"}
            </button>
            <button className={`btn-outline-muted full-w ${inCompare ? "active-cmp" : ""}`} onClick={() => onCompare(car)}>
              {inCompare ? "Added to Compare" : "Add to Compare"}
            </button>
          </div>

          {activeTab !== "insights" && <PriceTrend carId={car.id} />}
        </div>
      </div>

      {smartRecs.length > 0 && (
        <div className="detail-related">
          <div className="detail-section-tag">You May Also Like</div>
          <div className="detail-section-title" style={{ marginBottom: 8 }}>Related Machines</div>
          <div className="detail-section-sub">Hover for lift, open the full page, or trigger quick view from the card.</div>
          <div className="related-grid">
            {smartRecs.map((entry) => (
              <RelatedCard key={entry.id} car={entry} onClick={onRelatedClick} onQuickView={onQuickView} />
            ))}
          </div>
        </div>
      )}

      <footer className="pg-footer">
        <div className="footer-logo">Performance Garage</div>
        <div className="footer-text">Detailed specs, curated editorial, and immersive browse flow.</div>
      </footer>
      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}

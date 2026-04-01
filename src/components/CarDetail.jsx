import { useState, useEffect } from "react";
import { Toast } from "./Modal";
import PriceTrend from "./PriceTrend";
import FakeNotification from "./FakeNotification";

export default function CarDetail({ car, inWish, inCart, inCompare, onWish, onCart, onCompare, onBack, onCheckout, relatedCars, onRelatedClick, toastMsg, toastVisible, recentlyViewed }) {
  const [imgErr, setImgErr] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    window.scrollTo(0,0);
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, [car.id]);

  // Smart recommendations: same brand OR ±40% price range
  const getPrice = (p) => parseFloat(p.replace(/[^0-9.]/g,"").replace(",",""));
  const carPrice = getPrice(car.price);
  const smartRecs = relatedCars.filter(rc => {
    const rp = getPrice(rc.price);
    return rc.brand === car.brand || (rp >= carPrice * 0.6 && rp <= carPrice * 1.4);
  }).slice(0,3);

  return (
    <div className={`detail-page ${loaded ? "page-loaded" : "page-loading"}`}>
      <nav className="pg-nav scrolled">
        <div className="pg-logo">PERFORMANCE<span> GARAGE</span></div>
        <button className="detail-back" onClick={onBack}>← Back to Fleet</button>
      </nav>

      <FakeNotification />

      {/* HERO */}
      <div className="detail-hero" style={imgErr ? {background:car.grad} : {}}>
        {!imgErr && (
          <img src={`/cars/${car.img}`} alt={car.name}
            className="detail-hero-img"
            onError={() => setImgErr(true)}
            onLoad={() => setLoaded(true)}
          />
        )}
        <div className="detail-hero-overlay" />
        {/* Location tag */}
        <div className="detail-location-tag">📍 Available near Pune</div>
        <div className="detail-hero-content">
          <div className="detail-eyebrow">{car.brand} · {car.cat.toUpperCase()} · {car.badge || "Performance"}</div>
          <div className="detail-big-name">{car.name}</div>
          <div className="detail-price-tag">{car.price}</div>
          <div className="detail-hero-actions">
            <button className={`btn-gold ${inCart?"cart-active":""}`} onClick={() => onCart(car.id)}>
              {inCart ? "✓ In Cart" : "+ Add to Cart"}
            </button>
            <button className="btn-gold-outline" onClick={onCheckout}>⚡ Buy Now</button>
            <button className={`btn-icon ${inWish?"active-wish":""}`} onClick={() => onWish(car.id)} title="Save to Wishlist">
              {inWish ? "♥" : "♡"}
            </button>
            <button className={`btn-icon ${inCompare?"active-cmp":""}`} onClick={() => onCompare(car)} title="Add to Compare">⚖</button>
          </div>
        </div>
      </div>

      {/* SPECS STRIP */}
      <div className="detail-specs-strip">
        {[["Horsepower",car.hp+" HP"],["Top Speed",car.speed+" km/h"],["0–100 km/h",car.zero],["Torque",car.torque],["Engine",car.engine]].map(([k,v])=>(
          <div key={k} className="detail-spec-item">
            <div className="detail-spec-val">{v}</div>
            <div className="detail-spec-key">{k}</div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="detail-tabs">
        {["overview","specs","insights"].map(t=>(
          <button key={t} className={`detail-tab ${activeTab===t?"active":""}`} onClick={()=>setActiveTab(t)}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      {/* BODY */}
      <div className="detail-body">
        <div className="detail-left">

          {activeTab==="overview" && (
            <div className="tab-panel fade-in">
              <div className="detail-section-tag">About</div>
              <div className="detail-section-title">{car.brand} {car.name}</div>
              <div className="detail-desc">{car.desc}</div>
              <div className="detail-tags">{car.tags.map(t=><span key={t} className="detail-tag">{t}</span>)}</div>

              {/* Recently Viewed */}
              {recentlyViewed?.length > 1 && (
                <div style={{marginTop:32}}>
                  <div className="detail-section-tag">Recently Viewed</div>
                  <div className="rv-strip">
                    {recentlyViewed.filter(c=>c.id!==car.id).slice(0,4).map(rc=>{
                      const [re,setRe] = useState(false);
                      return (
                        <div key={rc.id} className="rv-item" onClick={()=>onRelatedClick(rc)}>
                          <div className="rv-img">
                            {!re?<img src={`/cars/${rc.img}`} alt={rc.name} onError={()=>setRe(true)}/>
                              :<div style={{width:"100%",height:"100%",background:rc.grad}}/>}
                          </div>
                          <div className="rv-name">{rc.name}</div>
                          <div className="rv-price">{rc.price}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab==="specs" && (
            <div className="tab-panel fade-in">
              <div className="detail-section-tag">Full Specifications</div>
              <div className="detail-full-specs">
                {[["Brand",car.brand],["Model",car.name],["Category",car.cat],["Engine",car.engine],["Horsepower",car.hp+" HP"],["Torque",car.torque],["0–100 km/h",car.zero],["Top Speed",car.speed+" km/h"],["Price",car.price],["Availability","Available near Pune"]].map(([k,v])=>(
                  <div key={k} className="detail-spec-row">
                    <span className="dsr-key">{k}</span>
                    <span className="dsr-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab==="insights" && (
            <div className="tab-panel fade-in">
              <div className="detail-section-tag">Market Data</div>
              <PriceTrend carId={car.id} />
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="detail-right">
          <div className="detail-cta-card">
            <div className="detail-cta-price">{car.price}</div>
            <div className="detail-cta-name">{car.brand} {car.name}</div>
            <div className="detail-near-tag">📍 Near Pune · Immediate enquiry</div>
            <button className={`btn-gold full-w ${inCart?"":"outline"}`}
              style={inCart?{background:"#4caf50",color:"#fff",marginBottom:10}:{marginBottom:10}}
              onClick={() => onCart(car.id)}>
              {inCart ? "✓ Already in Cart" : "+ Add to Cart"}
            </button>
            <button className="btn-gold full-w" style={{marginBottom:10}} onClick={onCheckout}>⚡ Buy Now</button>
            <button className={`btn-outline-muted full-w ${inWish?"active-wish":""}`} onClick={() => onWish(car.id)}>
              {inWish ? "♥ Saved to Wishlist" : "♡ Save to Wishlist"}
            </button>
            <button className={`btn-outline-muted full-w ${inCompare?"active-cmp":""}`} onClick={() => onCompare(car)}>
              {inCompare ? "⚖ Added to Compare" : "⚖ Add to Compare"}
            </button>
            <div className="detail-cta-note">Free worldwide delivery · Bespoke configuration available</div>
          </div>

          {/* Market Insight on sidebar too */}
          {activeTab !== "insights" && <PriceTrend carId={car.id} />}
        </div>
      </div>

      {/* SMART RECOMMENDATIONS */}
      {smartRecs.length > 0 && (
        <div className="detail-related">
          <div className="detail-section-tag">You May Also Like</div>
          <div className="detail-section-title" style={{marginBottom:8}}>Smart Recommendations</div>
          <div className="detail-section-sub">Based on brand similarity and price range</div>
          <div className="related-grid">
            {smartRecs.map(rc => {
              const [rErr, setRErr] = useState(false);
              return (
                <div key={rc.id} className="related-card" onClick={() => onRelatedClick(rc)}>
                  <div className="related-img-wrap">
                    {!rErr
                      ? <img src={`/cars/${rc.img}`} alt={rc.name} onError={() => setRErr(true)} />
                      : <div style={{width:"100%",height:"100%",background:rc.grad}}/>
                    }
                    <div className="related-img-overlay"/>
                    {rc.cat === car.cat && <div className="related-match-badge">Same Class</div>}
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

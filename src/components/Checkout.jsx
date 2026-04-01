import { useState } from "react";
import { Toast } from "./Modal";
import Breadcrumbs from "./Breadcrumbs";

function CartImage({ car }) {
  const [imgErr, setImgErr] = useState(false);
  return !imgErr ? (
    <img src={`/cars/${car.img}`} alt={car.name} onError={() => setImgErr(true)} />
  ) : (
    <div style={{ width: "100%", height: "100%", background: car.grad, borderRadius: 4 }} />
  );
}

export default function Checkout({ cartItems, onRemove, onBack, showToast, toastMsg, toastVisible }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", address: "" });
  const [ordered, setOrdered] = useState(false);

  const total = cartItems.reduce((sum, car) => {
    const numeric = parseFloat(car.price.replace(/[^0-9.]/g, "").replace(",", ""));
    return sum + (Number.isNaN(numeric) ? 0 : numeric);
  }, 0);

  const fmt = (value) => `EUR ${value.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

  const handleOrder = () => {
    if (!form.name || !form.email || !form.country) {
      showToast("Please fill all required fields");
      return;
    }
    setOrdered(true);
    setStep(3);
  };

  if (ordered) {
    return (
      <div className="checkout-page">
        <nav className="pg-nav">
          <div className="pg-logo">PERFORMANCE<span> GARAGE</span></div>
          <button className="detail-back" onClick={onBack}>Back to Garage</button>
        </nav>
        <div className="checkout-success">
          <Breadcrumbs items={[{ label: "Home" }, { label: "Checkout" }, { label: "Confirmed", active: true }]} />
          <div className="success-icon">✓</div>
          <div className="success-title">Order Confirmed</div>
          <div className="success-sub">Thank you, {form.name}. Your enquiry has been received.</div>
          <div className="success-note">A Performance Garage advisor will contact you at {form.email} within 24 hours to finalise your bespoke configuration.</div>
          <button className="btn-gold" onClick={onBack} style={{ marginTop: 32 }}>Return to Garage</button>
        </div>
        <Toast message={toastMsg} visible={toastVisible} />
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <nav className="pg-nav">
        <div className="pg-logo">PERFORMANCE<span> GARAGE</span></div>
        <button className="detail-back" onClick={onBack}>Continue Shopping</button>
      </nav>

      <div className="checkout-breadcrumb-wrap">
        <Breadcrumbs items={[{ label: "Home" }, { label: "Checkout" }, { label: step === 1 ? "Cart" : step === 2 ? "Details" : "Confirm", active: true }]} />
      </div>

      <div className="checkout-steps">
        {["Cart", "Your Details", "Confirm"].map((label, index) => (
          <div key={label} className={`checkout-step ${step === index + 1 ? "active" : ""} ${step > index + 1 ? "done" : ""}`}>
            <div className="step-num">{step > index + 1 ? "✓" : index + 1}</div>
            <div className="step-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="checkout-body">
        {step === 1 && (
          <div className="checkout-main">
            <div className="checkout-section-title">Your Cart ({cartItems.length})</div>
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">Garage Empty</div>
                <div>No cars are in your enquiry list yet</div>
                <button className="btn-gold" onClick={onBack} style={{ marginTop: 20 }}>Browse Fleet</button>
              </div>
            ) : (
              <>
                {cartItems.map((car) => (
                  <div key={car.id} className="cart-item">
                    <div className="cart-item-img">
                      <CartImage car={car} />
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-brand">{car.brand}</div>
                      <div className="cart-item-name">{car.name}</div>
                      <div className="cart-item-specs">{car.hp} HP · {car.zero} · {car.engine}</div>
                    </div>
                    <div className="cart-item-right">
                      <div className="cart-item-price">{car.price}</div>
                      <button className="cart-remove" onClick={() => onRemove(car.id)}>Remove</button>
                    </div>
                  </div>
                ))}
                <div className="cart-total-row">
                  <span className="cart-total-label">Total Enquiry Value</span>
                  <span className="cart-total-val">{fmt(total)}</span>
                </div>
                <button className="btn-gold" style={{ marginTop: 24, padding: "14px 48px" }} onClick={() => setStep(2)}>
                  Proceed to Details
                </button>
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="checkout-main">
            <div className="checkout-section-title">Your Details</div>
            <div className="checkout-form">
              {[["Full Name", "name", "text", true], ["Email Address", "email", "email", true], ["Phone Number", "phone", "tel", false], ["Country", "country", "text", true], ["Delivery Address", "address", "text", false]].map(([label, field, type, required]) => (
                <div key={field} className="form-group">
                  <label className="form-label">{label}{required && <span className="req">*</span>}</label>
                  <input
                    className="form-input"
                    type={type}
                    value={form[field]}
                    placeholder={label}
                    onChange={(event) => setForm((previous) => ({ ...previous, [field]: event.target.value }))}
                  />
                </div>
              ))}
              <div className="form-note">All enquiries are handled by a dedicated Performance Garage advisor. No payment is taken at this stage.</div>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button className="btn-gold-outline" onClick={() => setStep(1)}>Back</button>
                <button className="btn-gold" onClick={() => setStep(3)}>Review Order</button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="checkout-main">
            <div className="checkout-section-title">Confirm Order</div>
            <div className="confirm-summary">
              <div className="confirm-section">
                <div className="confirm-label">Vehicles ({cartItems.length})</div>
                {cartItems.map((car) => (
                  <div key={car.id} className="confirm-car-row">
                    <span>{car.brand} {car.name}</span>
                    <span className="confirm-price">{car.price}</span>
                  </div>
                ))}
                <div className="confirm-total">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>
              <div className="confirm-section">
                <div className="confirm-label">Contact Details</div>
                <div className="confirm-detail">{form.name} · {form.email}</div>
                {form.phone && <div className="confirm-detail">{form.phone}</div>}
                <div className="confirm-detail">{form.country}{form.address ? ` · ${form.address}` : ""}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <button className="btn-gold-outline" onClick={() => setStep(2)}>Edit Details</button>
              <button className="btn-gold" onClick={handleOrder}>Place Enquiry</button>
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="checkout-sidebar">
            <div className="sidebar-title">Order Summary</div>
            {cartItems.map((car) => (
              <div key={car.id} className="sidebar-item">
                <span className="sidebar-car">{car.brand} {car.name}</span>
                <span className="sidebar-price">{car.price}</span>
              </div>
            ))}
            <div className="sidebar-total">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>
          </div>
        )}
      </div>

      <footer className="pg-footer" style={{ marginTop: 80 }}>
        <div className="footer-logo">Performance Garage</div>
        <div className="footer-text">Built for immersive luxury car discovery.</div>
      </footer>
      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}

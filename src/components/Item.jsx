function Item({ car, inWish, inCart, inCompare, onWish, onCart, onCompare }) {
  return (
    <div className="car-card">
      {/* GRADIENT VISUAL */}
      <div className="card-visual">
        <div className="card-gradient" style={{ background: car.grad }} />
        <div className="card-model-name">{car.title}</div>
        {car.badge && <div className="card-badge">{car.badge}</div>}
      </div>

      {/* BODY */}
      <div className="card-body">
        <div className="card-category">{car.cat}</div>
        <div className="card-title">{car.title}</div>

        {/* SPECS ROW */}
        <div className="card-specs">
          <div className="spec-item">
            <div className="spec-val">{car.hp}</div>
            <div className="spec-label">HP</div>
          </div>
          <div className="spec-item">
            <div className="spec-val">{car.zero}</div>
            <div className="spec-label">0–100</div>
          </div>
          <div className="spec-item">
            <div className="spec-val">{car.top.split(" ")[0]}</div>
            <div className="spec-label">Top km/h</div>
          </div>
        </div>

        <div className="card-price">
          {car.price} &nbsp;·&nbsp; {car.engine}
        </div>

        {/* ACTION BUTTONS — each has its own state */}
        <div className="card-actions">
          <button
            className={`action-btn ${inWish ? "wish-on" : ""}`}
            onClick={() => onWish(car.id)}
          >
            {inWish ? "♥ Saved" : "♡ Save"}
          </button>
          <button
            className={`action-btn ${inCart ? "cart-on" : ""}`}
            onClick={() => onCart(car.id)}
          >
            {inCart ? "✓ Cart" : "+ Cart"}
          </button>
          <button
            className={`action-btn ${inCompare ? "cmp-on" : ""}`}
            onClick={() => onCompare(car)}
          >
            {inCompare ? "⚖ Added" : "⚖ Compare"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;



export default function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="pg-nav">
      <div className="pg-logo">PERFORMANCE<span> GARAGE</span></div>
      <div className="pg-nav-links">
        <a href="#fleet">Fleet</a>
        <a href="#analytics">Analytics</a>
        <a href="#editorial">News</a>
      </div>
      <div className="pg-nav-right">
        <div className="pg-nav-badge">15 Machines</div>
        <div className="cart-btn" onClick={onCartClick} style={{cursor:"pointer"}}>
          <span>Cart</span>
          <div className="cart-count">{cartCount}</div>
        </div>
      </div>
    </nav>
  );
}

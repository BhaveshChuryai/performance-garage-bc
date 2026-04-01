import { useState, useEffect } from "react";

export default function Navbar({ cartCount, onCartClick, onSavedClick, savedCount, page, onHome }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`pg-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="pg-logo" onClick={onHome} style={{cursor:"pointer"}}>
        PERFORMANCE<span> GARAGE</span>
      </div>

      {/* Desktop links */}
      <div className="pg-nav-links desktop-only">
        <a href="#fleet" onClick={onHome}>Fleet</a>
        <a href="#analytics">Analytics</a>
        <a href="#editorial">News</a>
        <span className="nav-link-btn" onClick={onSavedClick}>
          Saved {savedCount > 0 && <span className="nav-saved-count">{savedCount}</span>}
        </span>
      </div>

      <div className="pg-nav-right">
        <div className="pg-nav-badge desktop-only">15 Machines</div>
        <div className="cart-btn" onClick={onCartClick}>
          <span>Cart</span>
          <div className="cart-count">{cartCount}</div>
        </div>
        {/* Mobile hamburger */}
        <button className="hamburger mobile-only" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          <a href="#fleet" onClick={() => { setMenuOpen(false); onHome?.(); }}>Fleet</a>
          <a href="#analytics" onClick={() => setMenuOpen(false)}>Analytics</a>
          <a href="#editorial" onClick={() => setMenuOpen(false)}>News</a>
          <span onClick={() => { setMenuOpen(false); onSavedClick?.(); }}>Saved ({savedCount})</span>
          <span onClick={() => { setMenuOpen(false); onCartClick?.(); }}>Cart ({cartCount})</span>
        </div>
      )}
    </nav>
  );
}

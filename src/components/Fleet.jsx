import Item from "./Item";

const FILTERS = ["all","hypercar","supercar","sport","electric"];

export default function Fleet({ cars, wish, cart, compareList, search, setSearch, activeFilter, setFilter, onWish, onCart, onCompare, onCardClick }) {
  return (
    <section className="pg-section" id="fleet">
      <div className="section-tag">Collection</div>
      <div className="section-title">THE FLEET</div>
      <div className="section-sub">Fifteen of the world's most formidable machines. Each one a testament to engineering without compromise.</div>

      {/* Controls */}
      <div className="controls-row">
        <div className="search-box">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search machines…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-pill ${activeFilter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {cars.length === 0
        ? <div className="pg-empty">No vehicles found</div>
        : <div className="cars-grid">
            {cars.map(car => (
              <Item
                key={car.id}
                car={car}
                inWish={wish.includes(car.id)}
                inCart={cart.includes(car.id)}
                inCompare={!!compareList.find(c => c.id === car.id)}
                onWish={onWish}
                onCart={onCart}
                onCompare={onCompare}
                onCardClick={onCardClick}
              />
            ))}
          </div>
      }
    </section>
  );
}

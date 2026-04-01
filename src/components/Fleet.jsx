import { useState } from "react";
import Item from "./Item";
import { SkeletonGrid } from "./SkeletonCard";

const FILTERS = ["all","hypercar","supercar","sport","electric"];

export default function Fleet({ cars, wish, cart, compareList, search, setSearch, activeFilter, setFilter, onWish, onCart, onCompare, onCardClick, loading }) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <section className="pg-section" id="fleet">
      <div className="section-tag reveal">Collection</div>
      <div className="section-title reveal">THE FLEET</div>
      <div className="section-sub reveal">Fifteen of the world's most formidable machines.</div>

      <div className="controls-row reveal">
        <div className="search-box">
          <span className="search-icon">⌕</span>
          <input type="text" placeholder="Search machines…" value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        {/* Desktop filters */}
        <div className="filter-pills desktop-only">
          {FILTERS.map(f=>(
            <button key={f} className={`filter-pill ${activeFilter===f?"active":""}`} onClick={()=>setFilter(f)}>
              {f==="all"?"All":f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>
        {/* Mobile filter toggle */}
        <button className="filter-toggle mobile-only" onClick={()=>setFilterOpen(!filterOpen)}>
          ⚙ Filter
        </button>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="mobile-filter-drawer">
          {FILTERS.map(f=>(
            <button key={f} className={`filter-pill ${activeFilter===f?"active":""}`}
              onClick={()=>{ setFilter(f); setFilterOpen(false); }}>
              {f==="all"?"All":f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>
      )}

      {loading ? <SkeletonGrid /> :
        cars.length === 0
          ? <div className="pg-empty">
              <div style={{fontSize:48,marginBottom:16,opacity:.3}}>🏎</div>
              <div>No cars match your filters</div>
              <button className="btn-gold" style={{marginTop:20}} onClick={()=>setFilter("all")}>Clear Filters</button>
            </div>
          : <div className="cars-grid">
              {cars.map(car=>(
                <Item key={car.id} car={car}
                  inWish={wish.includes(car.id)} inCart={cart.includes(car.id)}
                  inCompare={!!compareList.find(c=>c.id===car.id)}
                  onWish={onWish} onCart={onCart} onCompare={onCompare} onCardClick={onCardClick}
                />
              ))}
            </div>
      }
    </section>
  );
}

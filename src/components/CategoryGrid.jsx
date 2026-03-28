const CATS = [
  { label:"Hypercars", val:"hypercar" },
  { label:"Supercars", val:"supercar" },
  { label:"Sport GT",  val:"sport"    },
  { label:"Electric",  val:"electric" },
];

export default function CategoryGrid({ setFilter }) {
  const go = (val) => {
    setFilter(val);
    setTimeout(() => document.getElementById("fleet")?.scrollIntoView({ behavior:"smooth" }), 100);
  };
  return (
    <div className="cat-grid-section">
      {CATS.map(c => (
        <button key={c.val} className="cat-btn" onClick={() => go(c.val)}>
          {c.label}
        </button>
      ))}
    </div>
  );
}

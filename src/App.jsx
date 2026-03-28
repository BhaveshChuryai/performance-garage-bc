import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Editorial from "./components/Editorial";
import CategoryGrid from "./components/CategoryGrid";
import Fleet from "./components/Fleet";
import Analytics from "./components/Analytics";
import CarDetail from "./components/CarDetail";
import Checkout from "./components/Checkout";
import Modal, { CompareBar, CompareModal, Toast } from "./components/Modal";
import "./index.css";

export const CARS = [
  { id:1,  brand:"Bugatti",      name:"Chiron",          cat:"hypercar", hp:1500, speed:420, zero:"2.4s",  torque:"1600 Nm", engine:"8.0L Quad-Turbo W16",        price:"€2,900,000", badge:"Exclusive", desc:"The pinnacle of ultra-luxury hypercar engineering. Quad-turbocharged W16 producing 1600 Nm of torque. Top speed limited to 420 km/h.", tags:["W16","Hypercar","Quad-Turbo"],   grad:"linear-gradient(135deg,#0a0a1a,#1a0050)", img:"bugatti-chiron.jpg" },
  { id:2,  brand:"Lamborghini",  name:"Aventador SVJ",   cat:"supercar", hp:770,  speed:350, zero:"2.8s",  torque:"720 Nm",  engine:"6.5L NA V12",                price:"€393,000",   badge:"Limited",   desc:"Naturally aspirated V12 screaming to 8,500 RPM. Aggressive aero with ALA active system generating massive downforce.", tags:["V12","NA","AWD"],               grad:"linear-gradient(135deg,#1a1200,#5a3800)", img:"lamborghini-aventador.jpg" },
  { id:3,  brand:"Ferrari",      name:"SF90 Stradale",   cat:"hypercar", hp:986,  speed:340, zero:"2.5s",  torque:"800 Nm",  engine:"4.0L V8 + 3 Electric Motors", price:"€490,000",   badge:"Hybrid",    desc:"Ferrari's most powerful road car. Hybrid powertrain combining a twin-turbo V8 with three electric motors.", tags:["Hybrid","V8","Italian"],        grad:"linear-gradient(135deg,#1a0000,#5a0000)", img:"ferrari-sf90.jpg" },
  { id:4,  brand:"McLaren",      name:"P1",              cat:"hypercar", hp:903,  speed:350, zero:"2.8s",  torque:"900 Nm",  engine:"3.8L V8 + Electric",          price:"€1,150,000", badge:null,        desc:"The most driver-focused road car McLaren has ever built. F1-derived aerodynamics with active suspension.", tags:["Hybrid","F1-Derived","IPAS"],   grad:"linear-gradient(135deg,#0a0a0a,#1a1a1a)", img:"mclaren-p1.jpg" },
  { id:5,  brand:"Porsche",      name:"911 Turbo S",     cat:"sport",    hp:650,  speed:330, zero:"2.7s",  torque:"800 Nm",  engine:"3.8L Biturbo H6",             price:"€230,000",   badge:null,        desc:"The benchmark sports car. Rear-engine, all-wheel drive, daily drivable precision.", tags:["Rear-Engine","AWD","Icon"],     grad:"linear-gradient(135deg,#0f0f1a,#1a1a30)", img:"porsche-911.jpg" },
  { id:6,  brand:"Koenigsegg",   name:"Jesko",           cat:"hypercar", hp:1600, speed:531, zero:"2.5s",  torque:"1500 Nm", engine:"5.0L Biturbo V8",             price:"€2,800,000", badge:"Record",    desc:"Theoretical top speed of 531 km/h. Jesko Absolut engineered to claim the production car speed record.", tags:["Record","9-Speed","Absolut"],   grad:"linear-gradient(135deg,#0a0a0a,#001a0a)", img:"koenigsegg-jesko.jpg" },
  { id:7,  brand:"Aston Martin", name:"Valkyrie",        cat:"hypercar", hp:1160, speed:402, zero:"2.5s",  torque:"740 Nm",  engine:"6.5L NA V12 + KERS",          price:"€3,000,000", badge:"F1",        desc:"Born from an F1 partnership with Red Bull Racing. Adrian Newey designed the aerodynamics. Road legal. Barely.", tags:["F1-Inspired","Hybrid","Newey"], grad:"linear-gradient(135deg,#0a000a,#1a001a)", img:"aston-valkyrie.jpg" },
  { id:8,  brand:"Pagani",       name:"Huayra R",        cat:"hypercar", hp:850,  speed:370, zero:"2.8s",  torque:"750 Nm",  engine:"6.0L Twin-Turbo V12 AMG",     price:"€2,600,000", badge:null,        desc:"Artistic hypercar hand-crafted in Modena. Carbon-titanium monocoque and bespoke AMG engine.", tags:["Artisan","Carbon-Ti","AMG"],    grad:"linear-gradient(135deg,#0a0a00,#1a1a00)", img:"pagani-huayra.jpg" },
  { id:9,  brand:"Nissan",       name:"GT-R Nismo",      cat:"sport",    hp:600,  speed:315, zero:"2.7s",  torque:"652 Nm",  engine:"3.8L Twin-Turbo V6",          price:"€210,000",   badge:null,        desc:"Godzilla refined. Hand-assembled VR38DETT engine producing 600 HP per technician.", tags:["AWD","ATTESA","Godzilla"],      grad:"linear-gradient(135deg,#0a0a0a,#1a0a00)", img:"nissan-gtr.jpg" },
  { id:10, brand:"Chevrolet",    name:"Corvette C8 Z06", cat:"supercar", hp:670,  speed:315, zero:"2.6s",  torque:"637 Nm",  engine:"5.5L NA Flat-Plane V8",       price:"€110,000",   badge:null,        desc:"America's mid-engine supercar. LT6 flat-plane V8 revs to 8,600 RPM.", tags:["Mid-Engine","Flat-Plane","V8"], grad:"linear-gradient(135deg,#1a0000,#2a0000)", img:"corvette-c8.jpg" },
  { id:11, brand:"BMW",          name:"M4 CSL",          cat:"sport",    hp:550,  speed:302, zero:"3.7s",  torque:"650 Nm",  engine:"3.0L Biturbo I6",             price:"€142,000",   badge:"Limited",   desc:"1000 units worldwide. Carbon fibre roof, stripped rear seats, Michelin Cup 2R tyres.", tags:["Limited","Carbon","Track"],     grad:"linear-gradient(135deg,#000a1a,#001030)", img:"bmw-m4.jpg" },
  { id:12, brand:"Audi",         name:"R8 V10 Plus",     cat:"supercar", hp:620,  speed:331, zero:"3.1s",  torque:"580 Nm",  engine:"5.2L NA V10",                 price:"€185,000",   badge:null,        desc:"A naturally aspirated V10 mid-engine supercar you can drive every day.", tags:["V10","Quattro","Daily Driver"], grad:"linear-gradient(135deg,#0a0a0a,#001a10)", img:"audi-r8.jpg" },
  { id:13, brand:"Mercedes-AMG", name:"GT Black Series", cat:"supercar", hp:730,  speed:325, zero:"3.2s",  torque:"800 Nm",  engine:"4.0L Biturbo V8",             price:"€335,000",   badge:null,        desc:"The most extreme AMG road car. Flat-plane crank V8 with active aerodynamics.", tags:["Flat-Plane","AMG","Track"],     grad:"linear-gradient(135deg,#0a0a0a,#1a1a0a)", img:"mercedes-gt.jpg" },
  { id:14, brand:"Ford",         name:"GT",              cat:"supercar", hp:660,  speed:348, zero:"3.0s",  torque:"747 Nm",  engine:"3.5L EcoBoost V6",            price:"€500,000",   badge:null,        desc:"Le Mans 2016 champion replicated for the road. Active aero and carbon fibre tub.", tags:["Le Mans","Biturbo","Carbon"],   grad:"linear-gradient(135deg,#0a0000,#200000)", img:"ford-gt.jpg" },
  { id:15, brand:"Rimac",        name:"Nevera",          cat:"electric", hp:1914, speed:412, zero:"1.85s", torque:"2360 Nm", engine:"4 x Electric Motors",         price:"€2,200,000", badge:"Electric",  desc:"The fastest accelerating production car ever. 1914 HP and four-motor torque vectoring.", tags:["Electric","Torque Vector","#1"], grad:"linear-gradient(135deg,#000a1a,#001a3a)", img:"rimac-nevera.jpg" },
];

export default function App() {
  const [wish,         setWish]         = useState([]);
  const [cart,         setCart]         = useState([]);
  const [compareList,  setCompareList]  = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search,       setSearch]       = useState("");
  const [modalCar,     setModalCar]     = useState(null);
  const [detailCar,    setDetailCar]    = useState(null);
  const [compareOpen,  setCompareOpen]  = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [toastMsg,     setToastMsg]     = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMsg(msg); setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2200);
  };

  const toggleWish = (id) =>
    setWish(prev => prev.includes(id)
      ? (showToast("Removed from wishlist"), prev.filter(x => x !== id))
      : (showToast("Saved to wishlist ♥"), [...prev, id]));

  const toggleCart = (id) =>
    setCart(prev => prev.includes(id)
      ? (showToast("Removed from cart"), prev.filter(x => x !== id))
      : (showToast("Added to cart ✓"), [...prev, id]));

  const toggleCompare = (car) =>
    setCompareList(prev => {
      if (prev.find(c => c.id === car.id)) return prev.filter(c => c.id !== car.id);
      if (prev.length >= 2) { showToast("Max 2 cars"); return prev; }
      return [...prev, car];
    });

  const filtered = CARS.filter(c =>
    (activeFilter === "all" || c.cat === activeFilter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) ||
     c.brand.toLowerCase().includes(search.toLowerCase()))
  );

  const cartItems = CARS.filter(c => cart.includes(c.id));

  useEffect(() => {
    const cur = document.getElementById("pg-cursor");
    const ring = document.getElementById("pg-ring");
    if (!cur || !ring) return;
    let rx=0,ry=0,cx=0,cy=0,raf;
    const onMove = e => { cx=e.clientX; cy=e.clientY; cur.style.left=cx+"px"; cur.style.top=cy+"px"; };
    document.addEventListener("mousemove", onMove);
    const loop = () => { rx+=(cx-rx)*.12; ry+=(cy-ry)*.12; ring.style.left=rx+"px"; ring.style.top=ry+"px"; raf=requestAnimationFrame(loop); };
    loop();
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold:0.12 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [detailCar, showCheckout]);

  const goFleet = (val) => { setActiveFilter(val); setTimeout(() => document.getElementById("fleet")?.scrollIntoView({ behavior:"smooth" }), 100); };

  if (showCheckout) return (
    <Checkout
      cartItems={cartItems}
      cart={cart}
      onRemove={toggleCart}
      onBack={() => setShowCheckout(false)}
      showToast={showToast}
      toastMsg={toastMsg}
      toastVisible={toastVisible}
    />
  );

  if (detailCar) return (
    <CarDetail
      car={detailCar}
      inWish={wish.includes(detailCar.id)}
      inCart={cart.includes(detailCar.id)}
      inCompare={!!compareList.find(c => c.id === detailCar.id)}
      onWish={toggleWish}
      onCart={toggleCart}
      onCompare={toggleCompare}
      onBack={() => setDetailCar(null)}
      onCheckout={() => { setShowCheckout(true); setDetailCar(null); }}
      relatedCars={CARS.filter(c => c.cat === detailCar.cat && c.id !== detailCar.id).slice(0,3)}
      onRelatedClick={setDetailCar}
      showToast={showToast}
      toastMsg={toastMsg}
      toastVisible={toastVisible}
    />
  );

  return (
    <div className="pg-root">
      <div id="pg-cursor" className="pg-cursor" />
      <div id="pg-ring"   className="pg-ring"   />

      <Navbar cartCount={cart.length} onCartClick={() => setShowCheckout(true)} />
      <Hero />
      <Editorial />
      <CategoryGrid setFilter={goFleet} />
      <Fleet
        cars={filtered} wish={wish} cart={cart} compareList={compareList}
        search={search} setSearch={setSearch}
        activeFilter={activeFilter} setFilter={setActiveFilter}
        onWish={toggleWish} onCart={toggleCart} onCompare={toggleCompare}
        onCardClick={setDetailCar}
      />
      <Analytics cars={CARS} />

      {modalCar && <Modal car={modalCar} onClose={() => setModalCar(null)} onCheckout={() => { setShowCheckout(true); setModalCar(null); }} />}
      {compareList.length > 0 && (
        <CompareBar compareList={compareList} onOpen={() => setCompareOpen(true)} onClear={() => setCompareList([])} />
      )}
      {compareOpen && compareList.length === 2 && (
        <CompareModal cars={compareList} onClose={() => setCompareOpen(false)} />
      )}
      <Toast message={toastMsg} visible={toastVisible} />

      <footer className="pg-footer">
        <div className="footer-logo">Performance Garage</div>
        <div className="footer-text">Built by Bhavesh Churyai · Lab Experiment 4 · React + Three.js</div>
      </footer>
    </div>
  );
}

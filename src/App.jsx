import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Editorial, { ArticleDetail, ARTICLES } from "./components/Editorial";
import CategoryGrid from "./components/CategoryGrid";
import Fleet from "./components/Fleet";
import Analytics from "./components/Analytics";
import CarDetail from "./components/CarDetail";
import Checkout from "./components/Checkout";
import SavedPage from "./components/SavedPage";
import Modal, { CompareBar, CompareModal, Toast } from "./components/Modal";
import FakeNotification from "./components/FakeNotification";
import "./index.css";

const baseCars = [
  { id: 1, brand: "Bugatti", name: "Chiron", cat: "hypercar", hp: 1500, speed: 420, zero: "2.4s", torque: "1600 Nm", engine: "8.0L Quad-Turbo W16", price: "EUR 2,900,000", badge: "Exclusive", desc: "The pinnacle of ultra-luxury hypercar engineering. Quad-turbocharged W16 force, vast torque, and long-tail composure built for impossible speeds.", tags: ["W16", "Hypercar", "Quad-Turbo"], grad: "linear-gradient(135deg,#0a0a1a,#1a0050)", img: "bugatti-chiron.jpg" },
  { id: 2, brand: "Lamborghini", name: "Aventador SVJ", cat: "supercar", hp: 770, speed: 350, zero: "2.8s", torque: "720 Nm", engine: "6.5L NA V12", price: "EUR 393,000", badge: "Limited", desc: "A naturally aspirated V12 flagship with aggressive aero, sharp steering, and the kind of visual theatre that defines a poster car.", tags: ["V12", "NA", "AWD"], grad: "linear-gradient(135deg,#1a1200,#5a3800)", img: "lamborghini-aventador.jpg" },
  { id: 3, brand: "Ferrari", name: "SF90 Stradale", cat: "hypercar", hp: 986, speed: 340, zero: "2.5s", torque: "800 Nm", engine: "4.0L V8 + 3 Electric Motors", price: "EUR 490,000", badge: "Hybrid", desc: "Ferrari's most powerful road car pairs a twin-turbo V8 with electric precision for explosive exits, instant torque, and a deeply modern supercar feel.", tags: ["Hybrid", "V8", "Italian"], grad: "linear-gradient(135deg,#1a0000,#5a0000)", img: "ferrari-sf90.jpg" },
  { id: 4, brand: "McLaren", name: "P1", cat: "hypercar", hp: 903, speed: 350, zero: "2.8s", torque: "900 Nm", engine: "3.8L V8 + Electric", price: "EUR 1,150,000", badge: null, desc: "The McLaren P1 remains one of the most focused hybrid hypercars ever built, with a relentless powerband and active aero drama.", tags: ["Hybrid", "F1-Derived", "IPAS"], grad: "linear-gradient(135deg,#0a0a0a,#1a1a1a)", img: "mclaren-p1.jpg" },
  { id: 5, brand: "Porsche", name: "911 Turbo S", cat: "sport", hp: 650, speed: 330, zero: "2.7s", torque: "800 Nm", engine: "3.8L Biturbo H6", price: "EUR 230,000", badge: null, desc: "Rear-engine precision, all-weather pace, and brutal repeatability make the 911 Turbo S one of the most complete performance cars on sale.", tags: ["Rear-Engine", "AWD", "Icon"], grad: "linear-gradient(135deg,#0f0f1a,#1a1a30)", img: "porsche-911.jpg" },
  { id: 6, brand: "Koenigsegg", name: "Jesko", cat: "hypercar", hp: 1600, speed: 531, zero: "2.5s", torque: "1500 Nm", engine: "5.0L Biturbo V8", price: "EUR 2,800,000", badge: "Record", desc: "Koenigsegg engineered the Jesko for astonishing speed, huge airflow management, and a powertrain that feels utterly uncompromising.", tags: ["Record", "9-Speed", "Absolut"], grad: "linear-gradient(135deg,#0a0a0a,#001a0a)", img: "koenigsegg-jesko.jpg" },
  { id: 7, brand: "Aston Martin", name: "Valkyrie", cat: "hypercar", hp: 1160, speed: 402, zero: "2.5s", torque: "740 Nm", engine: "6.5L NA V12 + KERS", price: "EUR 3,000,000", badge: "F1", desc: "An Adrian Newey-shaped statement piece that blurs race-car and road-car boundaries through aerodynamics and lightweight engineering.", tags: ["F1-Inspired", "Hybrid", "Newey"], grad: "linear-gradient(135deg,#0a000a,#1a001a)", img: "aston-valkyrie.jpg" },
  { id: 8, brand: "Pagani", name: "Huayra R", cat: "hypercar", hp: 850, speed: 370, zero: "2.8s", torque: "750 Nm", engine: "6.0L Twin-Turbo V12 AMG", price: "EUR 2,600,000", badge: null, desc: "Pagani balances sculpture and violence here, with a carbon-titanium chassis and a soundtrack that feels built for empty mountain roads.", tags: ["Artisan", "Carbon-Ti", "AMG"], grad: "linear-gradient(135deg,#0a0a00,#1a1a00)", img: "pagani-huayra.jpg" },
  { id: 9, brand: "Nissan", name: "GT-R Nismo", cat: "sport", hp: 600, speed: 315, zero: "2.7s", torque: "652 Nm", engine: "3.8L Twin-Turbo V6", price: "EUR 210,000", badge: null, desc: "Godzilla refined, with hand-built power, huge traction, and the kind of confidence that shrinks a road the harder you push it.", tags: ["AWD", "ATTESA", "Godzilla"], grad: "linear-gradient(135deg,#0a0a0a,#1a0a00)", img: "nissan-gtr.jpg" },
  { id: 10, brand: "Chevrolet", name: "Corvette C8 Z06", cat: "supercar", hp: 670, speed: 315, zero: "2.6s", torque: "637 Nm", engine: "5.5L NA Flat-Plane V8", price: "EUR 110,000", badge: null, desc: "America's mid-engine supercar brings exotic balance and a screaming flat-plane crank V8 without losing day-to-day usability.", tags: ["Mid-Engine", "Flat-Plane", "V8"], grad: "linear-gradient(135deg,#1a0000,#2a0000)", img: "corvette-c8.jpg" },
  { id: 11, brand: "BMW", name: "M4 CSL", cat: "sport", hp: 550, speed: 302, zero: "3.7s", torque: "650 Nm", engine: "3.0L Biturbo I6", price: "EUR 142,000", badge: "Limited", desc: "The BMW M4 CSL sharpens the M4 formula with carbon diet measures, laser focus, and an edge that feels tailored for late apexes.", tags: ["Limited", "Carbon", "Track"], grad: "linear-gradient(135deg,#000a1a,#001030)", img: "bmw-m4.jpg" },
  { id: 12, brand: "Audi", name: "R8 V10 Plus", cat: "supercar", hp: 620, speed: 331, zero: "3.1s", torque: "580 Nm", engine: "5.2L NA V10", price: "EUR 185,000", badge: null, desc: "A naturally aspirated V10 hero with mid-engine balance, quattro security, and the tactile polish Audi became famous for.", tags: ["V10", "Quattro", "Daily Driver"], grad: "linear-gradient(135deg,#0a0a0a,#001a10)", img: "audi-r8.jpg" },
  { id: 13, brand: "Mercedes-AMG", name: "GT Black Series", cat: "supercar", hp: 730, speed: 325, zero: "3.2s", torque: "800 Nm", engine: "4.0L Biturbo V8", price: "EUR 335,000", badge: null, desc: "Flat-plane crank energy, aggressive aero, and serious track credibility turn the GT Black Series into a front-engine monster.", tags: ["Flat-Plane", "AMG", "Track"], grad: "linear-gradient(135deg,#0a0a0a,#1a1a0a)", img: "mercedes-gt.jpg" },
  { id: 14, brand: "Ford", name: "GT", cat: "supercar", hp: 660, speed: 348, zero: "3.0s", torque: "747 Nm", engine: "3.5L EcoBoost V6", price: "EUR 500,000", badge: null, desc: "The Ford GT channels Le Mans ambition into a road-going carbon tub, active aero body, and deeply dramatic stance.", tags: ["Le Mans", "Biturbo", "Carbon"], grad: "linear-gradient(135deg,#0a0000,#200000)", img: "ford-gt.jpg" },
  { id: 15, brand: "Rimac", name: "Nevera", cat: "electric", hp: 1914, speed: 412, zero: "1.85s", torque: "2360 Nm", engine: "4 x Electric Motors", price: "EUR 2,200,000", badge: "Electric", desc: "Nevera rewrites the rules with four-motor torque vectoring, silent violence, and acceleration that borders on unreal.", tags: ["Electric", "Torque Vector", "#1"], grad: "linear-gradient(135deg,#000a1a,#001a3a)", img: "rimac-nevera.jpg" },
];

export const CARS = baseCars.map((car) => ({
  ...car,
  gallery: [
    { src: `/cars/${car.img}`, alt: `${car.brand} ${car.name} hero`, focus: "center center" },
    { src: `/cars/${car.img}`, alt: `${car.brand} ${car.name} profile`, focus: "center 35%" },
    { src: `/cars/${car.img}`, alt: `${car.brand} ${car.name} detail`, focus: "center 75%" },
  ],
}));

const showroomCars = {
  bmw: CARS.find((car) => car.brand === "BMW"),
  ferrari: CARS.find((car) => car.brand === "Ferrari"),
};

const LS = {
  get: (key, fallback) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return null;
    }
    return null;
  },
};

export default function App() {
  const [wish, setWish] = useState(() => LS.get("pg_wish", []));
  const [cart, setCart] = useState(() => LS.get("pg_cart", []));
  const [compareList, setCompareList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [detailCar, setDetailCar] = useState(null);
  const [quickViewCar, setQuickViewCar] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState(() => LS.get("pg_recent", []));

  useEffect(() => {
    LS.set("pg_wish", wish);
  }, [wish]);

  useEffect(() => {
    LS.set("pg_cart", cart);
  }, [cart]);

  useEffect(() => {
    LS.set("pg_recent", recentlyViewed);
  }, [recentlyViewed]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 850);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [detailCar, activeArticle, showCheckout, showSaved, loading]);

  const showToast = (message) => {
    setToastMsg(message);
    setToastVisible(true);
    window.clearTimeout(showToast.timerId);
    showToast.timerId = window.setTimeout(() => setToastVisible(false), 2200);
  };

  const resetOverlayState = () => {
    setQuickViewCar(null);
    setActiveArticle(null);
    setDetailCar(null);
  };

  const toggleWish = (id) =>
    setWish((previous) =>
      previous.includes(id)
        ? (showToast("Removed from wishlist"), previous.filter((value) => value !== id))
        : (showToast("Saved to wishlist"), [...previous, id]),
    );

  const toggleCart = (id) =>
    setCart((previous) =>
      previous.includes(id)
        ? (showToast("Removed from cart"), previous.filter((value) => value !== id))
        : (showToast("Added to cart"), [...previous, id]),
    );

  const toggleCompare = (car) =>
    setCompareList((previous) => {
      if (previous.find((entry) => entry.id === car.id)) {
        return previous.filter((entry) => entry.id !== car.id);
      }
      if (previous.length >= 2) {
        showToast("Compare supports up to 2 cars");
        return previous;
      }
      return [...previous, car];
    });

  const openDetail = (car) => {
    setQuickViewCar(null);
    setActiveArticle(null);
    setDetailCar(car);
    setRecentlyViewed((previous) => {
      const filtered = previous.filter((entry) => entry.id !== car.id);
      return [car, ...filtered].slice(0, 8);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openQuickView = (car) => setQuickViewCar(car);
  const openArticle = (article) => {
    setQuickViewCar(null);
    setDetailCar(null);
    setActiveArticle(article);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = CARS.filter(
    (car) =>
      (activeFilter === "all" || car.cat === activeFilter) &&
      (car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.brand.toLowerCase().includes(search.toLowerCase())),
  );

  const cartItems = CARS.filter((car) => cart.includes(car.id));
  const goFleet = (value) => {
    setActiveFilter(value);
    setTimeout(() => document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" }), 120);
  };

  if (showCheckout) {
    return (
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
  }

  if (showSaved) {
    return (
      <SavedPage
        savedIds={wish}
        cars={CARS}
        onBack={() => setShowSaved(false)}
        onCardClick={(car) => {
          setShowSaved(false);
          openDetail(car);
        }}
        onRemove={toggleWish}
        onCart={toggleCart}
        cart={cart}
      />
    );
  }

  if (activeArticle) {
    return (
      <ArticleDetail
        article={activeArticle}
        featuredCars={showroomCars}
        onBack={() => setActiveArticle(null)}
        onOpenCar={openDetail}
      />
    );
  }

  if (detailCar) {
    return (
      <CarDetail
        car={detailCar}
        inWish={wish.includes(detailCar.id)}
        inCart={cart.includes(detailCar.id)}
        inCompare={Boolean(compareList.find((entry) => entry.id === detailCar.id))}
        onWish={toggleWish}
        onCart={toggleCart}
        onCompare={toggleCompare}
        onBack={() => setDetailCar(null)}
        onCheckout={() => {
          setShowCheckout(true);
          setDetailCar(null);
        }}
        relatedCars={CARS.filter((car) => car.id !== detailCar.id)}
        onRelatedClick={openDetail}
        onQuickView={openQuickView}
        showToast={showToast}
        toastMsg={toastMsg}
        toastVisible={toastVisible}
        recentlyViewed={recentlyViewed}
      />
    );
  }

  return (
    <div className="pg-root">
      <FakeNotification />

      <Navbar
        cartCount={cart.length}
        onCartClick={() => setShowCheckout(true)}
        onSavedClick={() => setShowSaved(true)}
        savedCount={wish.length}
        onHome={resetOverlayState}
      />

      <Hero models={showroomCars} onPrimaryAction={() => document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })} />
      <Editorial articles={ARTICLES} onOpenArticle={openArticle} />
      <CategoryGrid setFilter={goFleet} />
      <Fleet
        cars={filtered}
        wish={wish}
        cart={cart}
        compareList={compareList}
        search={search}
        setSearch={setSearch}
        activeFilter={activeFilter}
        setFilter={setActiveFilter}
        onWish={toggleWish}
        onCart={toggleCart}
        onCompare={toggleCompare}
        onCardClick={openDetail}
        onQuickView={openQuickView}
        loading={loading}
      />
      <Analytics cars={CARS} />

      {compareList.length > 0 && (
        <CompareBar compareList={compareList} onOpen={() => setCompareOpen(true)} onClear={() => setCompareList([])} />
      )}
      {compareOpen && compareList.length === 2 && (
        <CompareModal cars={compareList} onClose={() => setCompareOpen(false)} />
      )}
      {quickViewCar && (
        <Modal
          car={quickViewCar}
          onClose={() => setQuickViewCar(null)}
          onCheckout={() => {
            setShowCheckout(true);
            setQuickViewCar(null);
          }}
          onViewDetails={() => openDetail(quickViewCar)}
          onWish={toggleWish}
          onCart={toggleCart}
          onCompare={toggleCompare}
          inWish={wish.includes(quickViewCar.id)}
          inCart={cart.includes(quickViewCar.id)}
          inCompare={Boolean(compareList.find((entry) => entry.id === quickViewCar.id))}
        />
      )}
      <Toast message={toastMsg} visible={toastVisible} />

      <footer className="pg-footer">
        <div className="footer-logo">BC Performance Garage</div>
        <div className="footer-text">Luxury showroom UI with immersive 3D motion, quick view, and editorial car stories.</div>
      </footer>
    </div>
  );
}

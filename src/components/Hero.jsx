import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.THREE) return;
    const THREE = window.THREE;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
    camera.position.set(0, 2, 8);

    scene.add(new THREE.AmbientLight(0x0B0F1A, 2));
    const cyanLight   = new THREE.PointLight(0x00F5FF, 3, 20); cyanLight.position.set(-4, 3, 2);   scene.add(cyanLight);
    const purpleLight = new THREE.PointLight(0x7B61FF, 2, 20); purpleLight.position.set(4, 2, -2); scene.add(purpleLight);
    const orangeLight = new THREE.PointLight(0xFF6B00, 1.5, 15); orangeLight.position.set(0, -1, 4); scene.add(orangeLight);

    const gridHelper = new THREE.GridHelper(40, 40, 0x00F5FF, 0x0f1420);
    gridHelper.position.y = -1.5;
    scene.add(gridHelper);

    const carGroup = new THREE.Group();
    const mat = new THREE.MeshPhongMaterial({ color: 0x111111, shininess: 200, specular: 0x00F5FF });
    const body = new THREE.Mesh(new THREE.BoxGeometry(4, 0.6, 1.8), mat);
    body.position.y = 0.1;
    carGroup.add(body);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(2, 0.45, 1.6), mat);
    roof.position.set(-0.2, 0.52, 0);
    carGroup.add(roof);

    const wMat = new THREE.MeshPhongMaterial({ color: 0x222222, shininess: 100 });
    [[1.4,-0.28,0.95],[1.4,-0.28,-0.95],[-1.4,-0.28,0.95],[-1.4,-0.28,-0.95]].forEach(([x,y,z]) => {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.38,0.38,0.25,24), wMat);
      w.position.set(x,y,z); w.rotation.x = Math.PI/2; carGroup.add(w);
    });

    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 2),
      new THREE.MeshBasicMaterial({ color: 0x00F5FF, transparent: true, opacity: 0.12 })
    );
    glow.rotation.x = -Math.PI/2; glow.position.y = -0.28;
    carGroup.add(glow);
    scene.add(carGroup);

    const pts = [];
    for (let i = 0; i < 200; i++) pts.push((Math.random()-.5)*30,(Math.random()-.5)*10,(Math.random()-.5)*20);
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color:0x00F5FF, size:0.04, transparent:true, opacity:0.5 })));

    let t = 0, raf;
    const animate = () => {
      t += 0.008;
      carGroup.rotation.y = t * 0.4;
      carGroup.position.y = Math.sin(t) * 0.08;
      cyanLight.intensity   = 2 + Math.sin(t*1.3)*0.8;
      purpleLight.intensity = 1.5 + Math.sin(t*0.9+1)*0.6;
      gridHelper.position.x = (t*0.5)%1-0.5;
      camera.position.x = Math.sin(t*0.15)*1.5;
      camera.position.y = 2+Math.sin(t*0.1)*0.3;
      camera.lookAt(0,0,0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      camera.aspect = canvas.offsetWidth/canvas.offsetHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); renderer.dispose(); };
  }, []);

  return (
    <div className="pg-root-hero">

      {/* SECTION 1 — Video only */}
      <div className="hero-video-section">
        <video className="hero-video-full" autoPlay muted loop playsInline>
          <source src="/car.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
        <div className="hero-content">
          <div className="hero-eyebrow">Track · Analyze · Dominate</div>
          <div className="hero-title">
            <span className="line1">PERFORMANCE</span>
            <span className="line2">GARAGE</span>
          </div>
          <div className="hero-sub">
            Track the world's fastest machines. An immersive supercar intelligence system powered by real performance data.
          </div>
          <div className="hero-cta">
            <button className="btn-neon" onClick={() => document.getElementById("fleet").scrollIntoView({ behavior:"smooth" })}>
              Explore Garage
            </button>
            <button className="btn-ghost" onClick={() => document.getElementById("analytics").scrollIntoView({ behavior:"smooth" })}>
              View Analytics
            </button>
          </div>
        </div>
        <div className="hero-stats">
          {[["15","Supercars"],["1914","Max HP"],["420","Top km/h"],["1.85s","Fastest 0–100"]].map(([n,l]) => (
            <div key={l} className="hero-stat-item">
              <div className="hero-stat-num">{n}</div>
              <div className="hero-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2 — Three.js 3D only */}
      <div className="hero-3d-section">
        <canvas ref={canvasRef} className="hero-canvas-full" />
        <div className="threejs-label">
          <span className="threejs-tag">3D Garage</span>
          <div className="threejs-title">LIVE SHOWROOM</div>
          <div className="threejs-sub">Powered by Three.js · Real-time neon render</div>
        </div>
      </div>

    </div>
  );
}

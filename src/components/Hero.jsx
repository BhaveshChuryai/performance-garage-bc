import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const COLOR_SWATCHES = [
  { label: "Pearl White", color: "#f2f2f0" },
  { label: "Ferrari Rosso", color: "#b80f1c" },
  { label: "Obsidian Black", color: "#161616" },
  { label: "Satin Graphite", color: "#6e7278" },
  { label: "Electric Blue", color: "#1c4fff" },
];

function Wheel({ position }) {
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.34, 18]} />
        <meshStandardMaterial color="#111111" roughness={0.84} metalness={0.08} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.36, 12]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.24} metalness={0.95} />
      </mesh>
    </group>
  );
}

function BeastCar({ color }) {
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.78,
        roughness: 0.26,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      }),
    [color],
  );

  const trimMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#121417", metalness: 0.42, roughness: 0.42 }),
    [],
  );

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#161b22",
        transmission: 0.1,
        roughness: 0.08,
      }),
    [],
  );

  return (
    <group position={[0, 0.2, 0]} rotation={[0, -0.6, 0]}>
      <mesh material={bodyMaterial} castShadow receiveShadow position={[0, 0.85, 0]}>
        <boxGeometry args={[4.8, 0.7, 2.06]} />
      </mesh>
      <mesh material={bodyMaterial} castShadow receiveShadow position={[2.2, 0.72, 0]} rotation={[0, 0, -0.14]}>
        <boxGeometry args={[1.36, 0.34, 1.9]} />
      </mesh>
      <mesh material={bodyMaterial} castShadow receiveShadow position={[-2.05, 0.74, 0]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[1.08, 0.28, 1.84]} />
      </mesh>
      <mesh material={trimMaterial} castShadow receiveShadow position={[-0.2, 1.34, 0]}>
        <boxGeometry args={[2.22, 0.7, 1.64]} />
      </mesh>
      <mesh material={glassMaterial} position={[0.66, 1.34, 0]} rotation={[0, 0, -0.28]}>
        <boxGeometry args={[1.08, 0.28, 1.56]} />
      </mesh>
      <mesh material={glassMaterial} position={[-0.82, 1.26, 0]} rotation={[0, 0, 0.22]}>
        <boxGeometry args={[0.88, 0.32, 1.48]} />
      </mesh>
      <mesh material={trimMaterial} castShadow receiveShadow position={[0, 0.26, 1.03]}>
        <boxGeometry args={[3.4, 0.08, 0.1]} />
      </mesh>
      <mesh material={trimMaterial} castShadow receiveShadow position={[0, 0.26, -1.03]}>
        <boxGeometry args={[3.4, 0.08, 0.1]} />
      </mesh>
      <mesh position={[2.6, 0.98, 0.62]}>
        <boxGeometry args={[0.16, 0.08, 0.68]} />
        <meshStandardMaterial color="#fff4ca" emissive="#fff4ca" emissiveIntensity={1.1} />
      </mesh>
      <mesh position={[2.6, 0.98, -0.62]}>
        <boxGeometry args={[0.16, 0.08, 0.68]} />
        <meshStandardMaterial color="#fff4ca" emissive="#fff4ca" emissiveIntensity={1.1} />
      </mesh>
      <mesh position={[-2.68, 0.96, 0.68]}>
        <boxGeometry args={[0.14, 0.08, 0.46]} />
        <meshStandardMaterial color="#ff5656" emissive="#ff5656" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-2.68, 0.96, -0.68]}>
        <boxGeometry args={[0.14, 0.08, 0.46]} />
        <meshStandardMaterial color="#ff5656" emissive="#ff5656" emissiveIntensity={0.8} />
      </mesh>

      <Wheel position={[1.58, 0.42, 1.0]} />
      <Wheel position={[1.58, 0.42, -1.0]} />
      <Wheel position={[-1.54, 0.42, 1.0]} />
      <Wheel position={[-1.54, 0.42, -1.0]} />
    </group>
  );
}

function Reflection({ color }) {
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.15,
        roughness: 0.82,
        transparent: true,
        opacity: 0.11,
      }),
    [color],
  );

  return (
    <group position={[0, -0.52, 0]} scale={[1, -1, 1]} rotation={[0, -0.6, 0]}>
      <mesh material={material} position={[0, 0.85, 0]}>
        <boxGeometry args={[4.8, 0.7, 2.06]} />
      </mesh>
      <mesh material={material} position={[2.2, 0.72, 0]} rotation={[0, 0, -0.14]}>
        <boxGeometry args={[1.36, 0.34, 1.9]} />
      </mesh>
    </group>
  );
}

function Stage() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[44, 44]} />
        <meshStandardMaterial color="#0d1218" />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <circleGeometry args={[6.2, 56]} />
        <meshStandardMaterial color="#121820" metalness={0.65} roughness={0.22} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <ringGeometry args={[4.4, 5.05, 56]} />
        <meshStandardMaterial color="#dde3ea" emissive="#dde3ea" emissiveIntensity={0.95} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[2.7, 3.12, 56]} />
        <meshStandardMaterial color="#82c9ef" emissive="#82c9ef" emissiveIntensity={0.58} />
      </mesh>

      <gridHelper args={[28, 34, "#61aecd", "#24313c"]} position={[0, 0.003, 0]} />

      <mesh position={[0, 3, -12]}>
        <planeGeometry args={[24, 8]} />
        <meshStandardMaterial color="#151b22" />
      </mesh>
      <mesh position={[-9.3, 3, -6.4]} rotation={[0, 0.38, 0]}>
        <planeGeometry args={[16, 8]} />
        <meshStandardMaterial color="#0c1015" />
      </mesh>
      <mesh position={[9.3, 3, -6.4]} rotation={[0, -0.38, 0]}>
        <planeGeometry args={[16, 8]} />
        <meshStandardMaterial color="#0c1015" />
      </mesh>

      <group position={[0, 4.4, 0]}>
        {Array.from({ length: 7 }, (_, index) => (
          <mesh key={index} position={[0, 0, -index * 2.2]}>
            <boxGeometry args={[0.34, 0.02, 1.12]} />
            <meshStandardMaterial color="#fff8df" emissive="#fff0bd" emissiveIntensity={1.35} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function GroundShadow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}>
      <circleGeometry args={[3.2, 32]} />
      <meshBasicMaterial color="#000000" transparent opacity={0.22} />
    </mesh>
  );
}

function ShowroomScene({ color }) {
  return (
    <>
      <color attach="background" args={["#12171d"]} />
      <fog attach="fog" args={["#12171d", 14, 26]} />

      <PerspectiveCamera makeDefault position={[5, 2.2, 6.2]} fov={36} />

      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.25} color="#ebf3ff" groundColor="#0e1217" />
      <directionalLight position={[6, 7, 4]} intensity={1.7} color="#fff6e6" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[-6, 3, -1]} intensity={14} color="#7bcfff" distance={18} />
      <pointLight position={[0, 4.2, -9]} intensity={9} color="#fff0c9" distance={20} />

      <Stage />
      <Reflection color={color} />
      <BeastCar color={color} />
      <GroundShadow />

      <OrbitControls
        enablePan={false}
        minDistance={4.9}
        maxDistance={8.2}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 2.03}
        autoRotate
        autoRotateSpeed={0.52}
        enableDamping
        dampingFactor={0.06}
      />
    </>
  );
}

export default function Hero({ onPrimaryAction }) {
  const [activeSwatch, setActiveSwatch] = useState(COLOR_SWATCHES[0]);

  return (
    <section className="pg-root-hero">
      <div className="hero-video-section hero-compact-intro">
        <video className="hero-video-full" autoPlay muted loop playsInline>
          <source src="/car.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="hero-eyebrow">BC Performance Garage</div>
          <div className="hero-title">
            <span className="line1">DRIVE THE</span>
            <span className="line2">EXTRAORDINARY</span>
          </div>
          <div className="hero-sub hero-sub-premium">
            Experience elite engineering through an immersive 3D showroom built for those who demand more than just speed.
          </div>
          <div className="hero-support-lines">
            <div>Crafted for those who do not just drive, but command the road.</div>
            <div>More than machines, a statement of power, precision, and prestige.</div>
          </div>
          <div className="hero-cta">
            <button className="btn-neon" onClick={onPrimaryAction}>Explore Fleet</button>
            <button className="btn-ghost" onClick={() => document.getElementById("editorial")?.scrollIntoView({ behavior: "smooth" })}>
              Read News
            </button>
          </div>
        </motion.div>
      </div>

      <div className="hero-3d-section premium-showroom premium-showroom-beast">
        <div className="showroom-canvas-shell">
          <Canvas shadows dpr={[1, 1.25]} gl={{ antialias: true, powerPreference: "high-performance" }}>
            <ShowroomScene color={activeSwatch.color} />
          </Canvas>
        </div>

        <motion.aside
          className="showroom-panel beast-panel"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="showroom-panel-tag">Exterior Studio</div>
          <h3>Signature Viewer</h3>
          <p>
            A lighter single-car viewer with a premium tunnel stage, smoother motion, and cleaner performance for everyday browsing.
          </p>

          <div className="showroom-spec-list">
            <div className="showroom-spec-item">
              <span>Scene</span>
              <strong>Optimized tunnel stage</strong>
            </div>
            <div className="showroom-spec-item">
              <span>Controls</span>
              <strong>Drag rotate · scroll zoom</strong>
            </div>
            <div className="showroom-spec-item">
              <span>Render</span>
              <strong>Lightweight live 3D</strong>
            </div>
            <div className="showroom-spec-item">
              <span>Active paint</span>
              <strong>{activeSwatch.label}</strong>
            </div>
          </div>

          <div className="showroom-color-block">
            <div className="showroom-color-title">Paint Selection</div>
            <div className="showroom-swatches">
              {COLOR_SWATCHES.map((swatch) => (
                <button
                  key={swatch.label}
                  type="button"
                  className={`showroom-swatch ${activeSwatch.label === swatch.label ? "active" : ""}`}
                  style={{ background: swatch.color }}
                  title={swatch.label}
                  onClick={() => setActiveSwatch(swatch)}
                />
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

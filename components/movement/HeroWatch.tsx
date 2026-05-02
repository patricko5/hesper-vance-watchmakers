"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function HeroWatchModel() {
  const group = useRef<THREE.Group>(null);
  const [resolved, setResolved] = useState(false);
  const bezelPoints = useMemo(
    () => [
      new THREE.Vector2(1.58, -0.12),
      new THREE.Vector2(1.76, -0.08),
      new THREE.Vector2(1.86, 0.02),
      new THREE.Vector2(1.78, 0.12),
      new THREE.Vector2(1.52, 0.16)
    ],
    []
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setResolved(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += THREE.MathUtils.degToRad(8) * delta;
    }
  });

  const caseMaterial = resolved
    ? new THREE.MeshStandardMaterial({
        color: "#c9cdd2",
        metalness: 0.95,
        roughness: 0.18
      })
    : new THREE.MeshBasicMaterial({
        color: "#b08d4e",
        wireframe: true,
        transparent: true,
        opacity: 0.42
      });

  return (
    <group ref={group} rotation={[0.05, -0.24, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={caseMaterial}>
        <latheGeometry args={[bezelPoints, 96]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.16, 96]} />
        <meshStandardMaterial color="#101115" metalness={0.35} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <circleGeometry args={[1.27, 96]} />
        <meshStandardMaterial color="#15171b" metalness={0.2} roughness={0.55} />
      </mesh>
      {Array.from({ length: 12 }).map((_, marker) => {
        const angle = (marker / 12) * Math.PI * 2;
        return (
          <mesh
            key={marker}
            position={[Math.sin(angle) * 1.05, Math.cos(angle) * 1.05, 0.13]}
            rotation={[0, 0, -angle]}
          >
            <boxGeometry args={[0.035, marker % 3 === 0 ? 0.22 : 0.12, 0.012]} />
            <meshStandardMaterial color={marker % 3 === 0 ? "#b08d4e" : "#8a8579"} />
          </mesh>
        );
      })}
      <mesh position={[0, 0.26, 0.15]} rotation={[0, 0, -0.72]}>
        <boxGeometry args={[0.035, 0.98, 0.018]} />
        <meshStandardMaterial color="#e8e4db" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0.29, -0.1, 0.16]} rotation={[0, 0, 1.1]}>
        <boxGeometry args={[0.026, 0.76, 0.014]} />
        <meshStandardMaterial color="#b08d4e" metalness={0.7} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0, 0.18]}>
        <sphereGeometry args={[0.055, 24, 24]} />
        <meshStandardMaterial color="#b08d4e" metalness={0.8} roughness={0.16} />
      </mesh>
      <mesh position={[1.86, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.28, 32]} />
        <meshStandardMaterial color="#6e7378" metalness={0.9} roughness={0.16} />
      </mesh>
    </group>
  );
}

export function HeroWatch() {
  return (
    <div className="absolute inset-0" aria-label="Slowly rotating Hesper & Vance watch render">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 38 }} dpr={[1, 2]} gl={{ antialias: true }}>
        <color attach="background" args={["#050608"]} />
        <ambientLight intensity={0.12} />
        <directionalLight position={[-4, 5, 5]} color="#ffd9b2" intensity={2.1} />
        <directionalLight position={[5, -2, -5]} color="#9eb8ff" intensity={0.75} />
        <spotLight position={[0, 4, 3]} angle={0.36} penumbra={0.9} intensity={1.4} />
        <HeroWatchModel />
      </Canvas>
    </div>
  );
}

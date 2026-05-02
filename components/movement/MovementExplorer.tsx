"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CalendarDays, Clock3, Moon, TimerReset } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MechanismDiagram } from "@/components/movement/MechanismDiagrams";
import { ProductVisual } from "@/components/ProductVisual";
import { cx } from "@/lib/utils";

export type ComplicationKey = "time" | "chronograph" | "calendar" | "moon";
type ExplorerState = "closed" | "opening" | "movement";
type ShaderKind = "brass" | "steel" | "jewel" | "blued";

const complicationOptions: Array<{
  key: ComplicationKey;
  label: string;
  description: string;
  icon: typeof Clock3;
}> = [
  { key: "time", label: "Time only", description: "Barrel to escapement", icon: Clock3 },
  { key: "chronograph", label: "Chronograph", description: "Column wheel and counter", icon: TimerReset },
  { key: "calendar", label: "Perpetual Calendar", description: "Cam, lever, and date train", icon: CalendarDays },
  { key: "moon", label: "Moon Phase", description: "59-tooth lunar display", icon: Moon }
];

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShaders: Record<ShaderKind, string> = {
  brass: `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform vec3 uBase;
    uniform float uSaturation;
    uniform float uOpacity;

    vec3 saturateColor(vec3 color, float amount) {
      float luma = dot(color, vec3(0.299, 0.587, 0.114));
      return mix(vec3(luma), color, amount);
    }

    void main() {
      float stripe = sin((vUv.y * 72.0 + vUv.x * 11.0) * 3.14159);
      float brush = 0.78 + 0.14 * stripe;
      float spec = pow(max(dot(normalize(vNormal), normalize(vec3(0.2, 0.7, 0.6))), 0.0), 18.0);
      vec3 color = uBase * brush + vec3(spec * 0.42);
      gl_FragColor = vec4(saturateColor(color, uSaturation), uOpacity);
    }
  `,
  steel: `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform vec3 uBase;
    uniform float uSaturation;
    uniform float uOpacity;

    vec3 saturateColor(vec3 color, float amount) {
      float luma = dot(color, vec3(0.299, 0.587, 0.114));
      return mix(vec3(luma), color, amount);
    }

    void main() {
      float line = smoothstep(0.0, 1.0, abs(sin(vUv.x * 24.0)));
      float spec = pow(max(dot(normalize(vNormal), normalize(vec3(-0.4, 0.35, 0.85))), 0.0), 42.0);
      vec3 reflection = mix(uBase, vec3(1.0), 0.6 * spec);
      vec3 color = reflection * (0.88 + line * 0.08);
      gl_FragColor = vec4(saturateColor(color, uSaturation), uOpacity);
    }
  `,
  jewel: `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform vec3 uBase;
    uniform vec3 uEdge;
    uniform float uSaturation;
    uniform float uOpacity;

    vec3 saturateColor(vec3 color, float amount) {
      float luma = dot(color, vec3(0.299, 0.587, 0.114));
      return mix(vec3(luma), color, amount);
    }

    void main() {
      float edge = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.0);
      vec3 color = mix(uBase, uEdge, edge * 0.9);
      gl_FragColor = vec4(saturateColor(color, uSaturation), uOpacity);
    }
  `,
  blued: `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform vec3 uBase;
    uniform vec3 uEdge;
    uniform float uSaturation;
    uniform float uOpacity;

    vec3 saturateColor(vec3 color, float amount) {
      float luma = dot(color, vec3(0.299, 0.587, 0.114));
      return mix(vec3(luma), color, amount);
    }

    void main() {
      float radial = smoothstep(0.0, 0.72, length(vUv - vec2(0.5)));
      float spec = pow(max(dot(normalize(vNormal), normalize(vec3(0.3, 0.2, 0.9))), 0.0), 48.0);
      vec3 color = mix(uBase, uEdge, radial) + vec3(spec * 0.28);
      gl_FragColor = vec4(saturateColor(color, uSaturation), uOpacity);
    }
  `
};

const shaderBases: Record<ShaderKind, { base: string; edge?: string; transparent?: boolean; opacity?: number }> = {
  brass: { base: "#B08D4E" },
  steel: { base: "#C9CDD2" },
  jewel: { base: "#8B2942", edge: "#FF6B7A", transparent: true, opacity: 0.72 },
  blued: { base: "#1B3A6B", edge: "#2D4A7B" }
};

const gearParts = [
  { id: "barrel", label: "Mainspring barrel", x: -0.84, y: -0.42, r: 0.34, teeth: 40, rotationsPerHour: 1, complications: ["time"] },
  { id: "center", label: "Center wheel", x: -0.18, y: 0.0, r: 0.28, teeth: 60, rotationsPerHour: 1, complications: ["time"] },
  { id: "third", label: "Third wheel", x: 0.46, y: -0.32, r: 0.23, teeth: 70, rotationsPerHour: 7.5, complications: ["time"] },
  { id: "fourth", label: "Fourth wheel", x: 0.86, y: 0.18, r: 0.22, teeth: 70, rotationsPerHour: 60, complications: ["time"] },
  { id: "escape", label: "Escape wheel", x: 0.52, y: 0.76, r: 0.17, teeth: 15, rotationsPerHour: 360, complications: ["time"] },
  { id: "chrono", label: "Chronograph wheel", x: -0.72, y: 0.56, r: 0.24, teeth: 32, rotationsPerHour: 60, complications: ["chronograph"] },
  { id: "minute", label: "Minute counter", x: 0.08, y: 0.72, r: 0.18, teeth: 30, rotationsPerHour: 2, complications: ["chronograph"] }
] as const;

const extraComplicationParts = [
  { id: "date", label: "Date wheel", x: -0.98, y: 0.08, r: 0.2, teeth: 31, rotationsPerHour: 120, complications: ["calendar"] },
  { id: "month", label: "Month cam", x: 1.02, y: -0.5, r: 0.18, teeth: 12, rotationsPerHour: 30, complications: ["calendar"] },
  { id: "moon", label: "Moon wheel", x: 0.72, y: -0.78, r: 0.21, teeth: 59, rotationsPerHour: 24, complications: ["moon"] }
] as const;

function useShaderMaterial(kind: ShaderKind, saturation: number, opacityOverride?: number) {
  const material = useMemo(() => {
    const base = shaderBases[kind];
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: fragmentShaders[kind],
      uniforms: {
        uBase: { value: new THREE.Color(base.base) },
        uEdge: { value: new THREE.Color(base.edge ?? base.base) },
        uSaturation: { value: saturation },
        uOpacity: { value: opacityOverride ?? base.opacity ?? 1 }
      },
      transparent: base.transparent || (opacityOverride ?? 1) < 1,
      depthWrite: !base.transparent
    });
  }, [kind, opacityOverride, saturation]);

  useEffect(() => {
    material.uniforms.uSaturation.value = saturation;
    material.uniforms.uOpacity.value = opacityOverride ?? shaderBases[kind].opacity ?? 1;
  }, [kind, material, opacityOverride, saturation]);

  return material;
}

function ShaderMaterialPrimitive({
  kind,
  saturation = 1,
  opacity
}: {
  kind: ShaderKind;
  saturation?: number;
  opacity?: number;
}) {
  const material = useShaderMaterial(kind, saturation, opacity);
  return <primitive attach="material" object={material} />;
}

function makeGearGeometry(teeth: number, radius: number) {
  const shape = new THREE.Shape();
  const outer = radius;
  const inner = radius * 0.86;
  const steps = teeth * 2;

  for (let i = 0; i <= steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2;
    const r = i % 2 === 0 ? outer : inner;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }

  const hole = new THREE.Path();
  hole.absarc(0, 0, radius * 0.18, 0, Math.PI * 2, false);
  shape.holes.push(hole);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.06,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 1
  });
  geometry.center();
  return geometry;
}

function makeBridgeGeometry(points: Array<[number, number]>) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], index) => {
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.06,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  geometry.center();
  return geometry;
}

function isRelevant(complications: readonly string[], selected: ComplicationKey) {
  if (selected === "time") return complications.includes("time");
  return complications.includes(selected);
}

function GearMesh({
  part,
  selected,
  z = 0.22
}: {
  part: (typeof gearParts)[number] | (typeof extraComplicationParts)[number];
  selected: ComplicationKey;
  z?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => makeGearGeometry(part.teeth, part.r), [part.r, part.teeth]);
  const relevant = isRelevant(part.complications, selected);
  const speed = relevant ? 1 : 0.2;

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.z += ((Math.PI * 2 * part.rotationsPerHour) / 3600) * speed * delta;
    }
  });

  return (
    <mesh ref={mesh} geometry={geometry} position={[part.x, part.y, z]}>
      <ShaderMaterialPrimitive kind="brass" saturation={relevant ? 1 : 0.3} opacity={relevant ? 1 : 0.78} />
    </mesh>
  );
}

function BalanceWheel({ selected }: { selected: ComplicationKey }) {
  const group = useRef<THREE.Group>(null);
  const relevant = selected === "time";

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(clock.elapsedTime * Math.PI * 8) * THREE.MathUtils.degToRad(140);
    }
  });

  return (
    <group ref={group} position={[1.04, 0.78, 0.26]}>
      <mesh>
        <torusGeometry args={[0.23, 0.012, 16, 96]} />
        <ShaderMaterialPrimitive kind="steel" saturation={relevant ? 1 : 0.3} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.44, 0.018, 0.018]} />
        <ShaderMaterialPrimitive kind="steel" saturation={relevant ? 1 : 0.3} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.018, 0.44, 0.018]} />
        <ShaderMaterialPrimitive kind="steel" saturation={relevant ? 1 : 0.3} />
      </mesh>
    </group>
  );
}

function Bridge({ points, position, selected, complications }: { points: Array<[number, number]>; position: [number, number, number]; selected: ComplicationKey; complications: string[] }) {
  const geometry = useMemo(() => makeBridgeGeometry(points), [points]);
  const relevant = isRelevant(complications, selected);
  return (
    <mesh geometry={geometry} position={position}>
      <ShaderMaterialPrimitive kind="brass" saturation={relevant ? 1 : 0.3} opacity={0.9} />
    </mesh>
  );
}

function Jewels({ selected }: { selected: ComplicationKey }) {
  const positions = useMemo(() => {
    const pivots = [...gearParts, ...extraComplicationParts].map((part) => [part.x, part.y, 0.31] as [number, number, number]);
    const ring = Array.from({ length: 11 }).map((_, index) => {
      const angle = (index / 11) * Math.PI * 2;
      return [Math.cos(angle) * 1.12, Math.sin(angle) * 1.12, 0.29] as [number, number, number];
    });
    return [...pivots, ...ring].slice(0, 21);
  }, []);

  return (
    <group>
      {positions.map((position, index) => (
        <mesh key={`${position.join("-")}-${index}`} position={position}>
          <sphereGeometry args={[0.038, 20, 20]} />
          <ShaderMaterialPrimitive kind="jewel" saturation={selected === "time" || index > 9 ? 1 : 0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Screws() {
  return (
    <group>
      {Array.from({ length: 12 }).map((_, index) => {
        const angle = (index / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 1.25;
        const y = Math.sin(angle) * 1.25;
        return (
          <group key={index} position={[x, y, 0.36]} rotation={[0, 0, angle]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.055, 0.055, 0.024, 32]} />
              <ShaderMaterialPrimitive kind="blued" />
            </mesh>
            <mesh position={[0, 0, 0.016]}>
              <boxGeometry args={[0.086, 0.012, 0.009]} />
              <meshBasicMaterial color="#07101f" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function CaseAndCrystal({ state }: { state: ExplorerState }) {
  const caseback = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const bezelPoints = useMemo(
    () => [
      new THREE.Vector2(1.54, -0.16),
      new THREE.Vector2(1.83, -0.12),
      new THREE.Vector2(1.92, 0.03),
      new THREE.Vector2(1.76, 0.16),
      new THREE.Vector2(1.46, 0.18)
    ],
    []
  );

  useFrame((_, delta) => {
    const target = state === "closed" ? 0 : 1;
    progress.current = THREE.MathUtils.damp(progress.current, target, 4.2, delta);
    if (caseback.current) {
      caseback.current.rotation.y = -progress.current * 2.05;
    }
  });

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.12]}>
        <latheGeometry args={[bezelPoints, 128]} />
        <ShaderMaterialPrimitive kind="steel" />
      </mesh>
      <mesh position={[0, 0, 0.34]}>
        <circleGeometry args={[1.32, 128]} />
        <meshPhysicalMaterial
          color="#dbe8ff"
          metalness={0}
          roughness={0.02}
          transmission={0.65}
          transparent
          opacity={0.22}
          ior={1.45}
          thickness={0.08}
        />
      </mesh>
      <group ref={caseback} position={[-1.42, 0, 0.42]}>
        <mesh position={[1.42, 0, 0]}>
          <circleGeometry args={[1.24, 128]} />
          <ShaderMaterialPrimitive kind="steel" opacity={0.94} />
        </mesh>
        <mesh position={[1.42, 0, 0.028]}>
          <ringGeometry args={[0.72, 1.08, 128]} />
          <meshPhysicalMaterial color="#cfe9ff" metalness={0} roughness={0.02} transmission={0.55} transparent opacity={0.28} />
        </mesh>
      </group>
    </group>
  );
}

function MovementWorks({ selected }: { selected: ComplicationKey }) {
  const bridgeA = useMemo<Array<[number, number]>>(() => [[-1.12, -0.68], [-0.32, -0.98], [0.16, -0.66], [-0.18, -0.18], [-1.02, -0.08]], []);
  const bridgeB = useMemo<Array<[number, number]>>(() => [[-0.26, 0.18], [0.74, -0.06], [1.2, 0.34], [0.78, 0.72], [-0.06, 0.56]], []);
  const bridgeC = useMemo<Array<[number, number]>>(() => [[-1.08, 0.42], [-0.42, 0.22], [0.08, 0.72], [-0.32, 1.04], [-0.98, 0.9]], []);

  return (
    <group>
      <mesh position={[0, 0, 0.04]}>
        <cylinderGeometry args={[1.42, 1.42, 0.08, 128]} />
        <ShaderMaterialPrimitive kind="brass" saturation={selected === "time" ? 1 : 0.72} />
      </mesh>
      <Bridge points={bridgeA} position={[-0.16, -0.08, 0.18]} selected={selected} complications={["time", "moon"]} />
      <Bridge points={bridgeB} position={[0.06, 0.06, 0.2]} selected={selected} complications={["time", "chronograph"]} />
      <Bridge points={bridgeC} position={[0.02, -0.02, 0.22]} selected={selected} complications={["calendar", "chronograph"]} />
      {gearParts.map((part) => (
        <GearMesh key={part.id} part={part} selected={selected} />
      ))}
      {extraComplicationParts.map((part) => (
        <GearMesh key={part.id} part={part} selected={selected} z={0.3} />
      ))}
      <BalanceWheel selected={selected} />
      <Jewels selected={selected} />
      <Screws />
    </group>
  );
}

function DialSide({ state }: { state: ExplorerState }) {
  const opacity = state === "closed" ? 1 : 0.18;
  return (
    <group position={[0, 0, 0.38]}>
      <mesh>
        <circleGeometry args={[1.18, 128]} />
        <meshStandardMaterial color="#111217" metalness={0.45} roughness={0.5} transparent opacity={opacity} />
      </mesh>
      {Array.from({ length: 12 }).map((_, marker) => {
        const angle = (marker / 12) * Math.PI * 2;
        return (
          <mesh
            key={marker}
            position={[Math.sin(angle) * 0.94, Math.cos(angle) * 0.94, 0.03]}
            rotation={[0, 0, -angle]}
          >
            <boxGeometry args={[0.026, marker % 3 === 0 ? 0.17 : 0.09, 0.014]} />
            <meshStandardMaterial color={marker % 3 === 0 ? "#B08D4E" : "#8A8579"} transparent opacity={opacity} />
          </mesh>
        );
      })}
      <mesh position={[0, 0.18, 0.05]} rotation={[0, 0, -0.7]}>
        <boxGeometry args={[0.03, 0.82, 0.016]} />
        <meshStandardMaterial color="#E8E4DB" metalness={0.55} roughness={0.2} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.25, -0.08, 0.06]} rotation={[0, 0, 1.2]}>
        <boxGeometry args={[0.025, 0.62, 0.014]} />
        <meshStandardMaterial color="#B08D4E" metalness={0.7} roughness={0.18} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

function MovementCamera({ state }: { state: ExplorerState }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const target = state === "closed" ? 8 : 5;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target, 3.6, delta);
    camera.updateProjectionMatrix();
  });

  return null;
}

function MovementScene({ state, selected }: { state: ExplorerState; selected: ComplicationKey }) {
  return (
    <>
      <color attach="background" args={["#050608"]} />
      <ambientLight intensity={0.12} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff4e0" />
      <directionalLight position={[-3, 2, 4]} intensity={0.4} color="#b8c5ff" />
      <directionalLight position={[0, -2, -5]} intensity={0.8} color="#9ca7bd" />
      <hemisphereLight args={["#c8d3ff", "#1a1208", 0.18]} />
      <MovementCamera state={state} />
      <group rotation={[0.1, -0.1, 0]}>
        <MovementWorks selected={selected} />
        <DialSide state={state} />
        <CaseAndCrystal state={state} />
      </group>
      <SceneOrbitControls />
    </>
  );
}

function SceneOrbitControls() {
  const { camera, gl } = useThree();
  const controls = useMemo(() => new ThreeOrbitControls(camera, gl.domElement), [camera, gl.domElement]);

  useEffect(() => {
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 12;
    return () => controls.dispose();
  }, [controls]);

  useFrame(() => controls.update());

  return null;
}

function hasWebGL2() {
  if (typeof document === "undefined") return false;
  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl2"));
}

function StaticFallback({ selected }: { selected: ComplicationKey }) {
  const option = complicationOptions.find((item) => item.key === selected) ?? complicationOptions[0];
  return (
    <div className="grid h-full place-items-center bg-[#050608] px-6 pt-20">
      <div className="w-full max-w-[560px]">
        <ProductVisual name={`${option.label} static movement render`} material="Rose Gold" complication="chronograph" index={188} />
        <p className="technical-label mt-5 text-center text-[12px] text-muted">
          Static movement render / WebGL2 fallback
        </p>
      </div>
    </div>
  );
}

export function MovementExplorer() {
  const [state, setState] = useState<ExplorerState>("closed");
  const [selected, setSelected] = useState<ComplicationKey>("time");
  const [webgl2, setWebgl2] = useState<boolean | null>(null);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    setWebgl2(hasWebGL2());
  }, []);

  const openCaseback = () => {
    if (state !== "closed") return;
    setState("opening");
    window.setTimeout(() => setState("movement"), 1500);
  };

  const panelVisible = state === "movement" || staticMode || webgl2 === false;
  const showCanvas = webgl2 !== false && !staticMode;

  return (
    <section className="relative h-screen overflow-hidden bg-black" aria-label="Interactive movement explorer">
      <div
        className={cx("absolute inset-0", state === "closed" && "cursor-grab active:cursor-grabbing")}
        onDoubleClick={openCaseback}
      >
        {showCanvas ? (
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{ antialias: true }}
            dpr={[1, 2]}
            aria-label="Three-dimensional watch movement scene. Drag to rotate."
          >
            <MovementScene state={state} selected={selected} />
          </Canvas>
        ) : (
          <StaticFallback selected={selected} />
        )}
      </div>

      <div className="absolute left-5 top-24 z-10 max-w-sm rounded-md border border-white/10 bg-graphite/72 p-4 backdrop-blur-xl">
        <p className="technical-label text-[11px] text-brass" aria-live="polite">
          {state === "closed" ? "Closed caseback" : state === "opening" ? "Caseback opening" : "Movement view active"}
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          {state === "closed"
            ? "Drag to rotate. Double-click or use the control to open the back."
            : "Select a mechanism. Non-selected components desaturate and slow."}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="button-primary" onClick={openCaseback} disabled={state !== "closed"}>
            Open caseback
          </button>
          <button type="button" className="button-secondary" onClick={() => setStaticMode((value) => !value)}>
            {staticMode ? "Use WebGL" : "Static view"}
          </button>
        </div>
      </div>

      <aside
        className={cx(
          "absolute inset-x-0 top-16 z-20 max-h-[46vh] w-full overflow-auto border-b border-white/10 bg-surface/96 px-5 py-5 backdrop-blur-xl md:inset-y-0 md:left-auto md:h-full md:max-h-none md:max-w-[380px] md:border-b-0 md:border-l md:pb-6 md:pt-24",
          panelVisible ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Complication selector"
      >
        <p className="technical-label text-[11px] text-brass">Complication</p>
        <div className="mt-5 grid gap-3">
          {complicationOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.key}
                type="button"
                className={cx(
                  "grid grid-cols-[32px_1fr] gap-4 rounded-md border p-4 text-left",
                  selected === option.key ? "border-brass bg-brass/10" : "border-white/10 hover:border-brass/50"
                )}
                onClick={() => setSelected(option.key)}
              >
                <Icon size={22} className="mt-1 text-brass" aria-hidden="true" />
                <span>
                  <span className="block font-display text-2xl font-light text-bone">{option.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted">{option.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <div
        className={cx(
          "absolute inset-x-0 bottom-0 z-10 max-h-[42vh] overflow-auto border-t border-white/10 bg-graphite/95 px-5 py-6 backdrop-blur-xl md:max-h-[52vh]",
          panelVisible ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="atelier-grid">
          <MechanismDiagram key={selected} selected={selected} />
        </div>
      </div>
    </section>
  );
}

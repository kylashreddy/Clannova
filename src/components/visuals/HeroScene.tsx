"use client";

// Hero composition inspired by the CLANNOVA mark: a gradient hexagon frame at the
// centre of a hexagonal node network (connected ecosystem), with data packets
// travelling between nodes (intelligence) and particles streaming forward (motion).

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const CYAN = new THREE.Color("#39D5FF");
const VIOLET = new THREE.Color("#9B7BFF");

/** Small seeded PRNG so the composition is identical on every render and visit. */
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexPoints(r: number, rot = Math.PI / 6) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = rot + (i * Math.PI) / 3;
    return new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r);
  });
}

/** Extruded hexagon ring with a cyan→violet gradient baked into vertex colours. */
function HexFrame({ radius, width, depth, opacity = 1 }: { radius: number; width: number; depth: number; opacity?: number }) {
  const geometry = useMemo(() => {
    const outer = new THREE.Shape(hexPoints(radius));
    outer.closePath();
    const hole = new THREE.Path(hexPoints(radius - width).reverse());
    hole.closePath();
    outer.holes.push(hole);
    const g = new THREE.ExtrudeGeometry(outer, { depth, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3, curveSegments: 1 });
    g.center();
    const pos = g.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      // Diagonal gradient: cyan top-left to violet bottom-right, as in the logo.
      const t = THREE.MathUtils.clamp((pos.getX(i) - pos.getY(i)) / (radius * 2.6) + 0.5, 0, 1);
      c.copy(CYAN).lerp(VIOLET, t);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [radius, width, depth]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial vertexColors toneMapped={false} transparent opacity={opacity} />
    </mesh>
  );
}

/** Hexagonal lattice of nodes with edges between neighbours. */
function useLattice() {
  return useMemo(() => {
    const random = seeded(7);
    const nodes: THREE.Vector3[] = [];
    const size = 0.62;
    for (let q = -5; q <= 5; q++) {
      for (let r = -5; r <= 5; r++) {
        const x = size * Math.sqrt(3) * (q + r / 2);
        const y = size * 1.5 * r;
        const d = Math.hypot(x, y);
        if (d < 1.9 || d > 4.6) continue; // keep the centre clear for the frame
        const z = -0.6 - random() * 1.2 + Math.sin(x * 0.8) * 0.3;
        nodes.push(new THREE.Vector3(x, y, z));
      }
    }
    const edges: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++)
        if (nodes[i].distanceTo(nodes[j]) < size * 1.95 && random() > 0.35) edges.push([i, j]);
    return { nodes, edges };
  }, []);
}

function Network({ animate }: { animate: boolean }) {
  const { nodes, edges } = useLattice();
  const packets = useRef<THREE.InstancedMesh>(null);
  const PACKETS = 22;
  const state = useMemo(
    () => {
      const random = seeded(11);
      return Array.from({ length: PACKETS }, () => ({ e: Math.floor(random() * edges.length), t: random(), s: 0.25 + random() * 0.5 }));
    },
    [edges.length],
  );

  const lineGeo = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    const col = new Float32Array(edges.length * 6);
    const c = new THREE.Color();
    edges.forEach(([a, b], i) => {
      arr.set([nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z], i * 6);
      for (const [k, n] of [nodes[a], nodes[b]].entries()) {
        c.copy(CYAN).lerp(VIOLET, THREE.MathUtils.clamp((n.x + 4) / 8, 0, 1));
        col.set([c.r, c.g, c.b], i * 6 + k * 3);
      }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [nodes, edges]);

  const nodeGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(nodes), [nodes]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, dt) => {
    if (!packets.current || !edges.length) return;
    state.forEach((p, i) => {
      if (animate) {
        p.t += dt * p.s;
        if (p.t > 1) {
          // Hop to a connected edge so packets appear to travel through the network.
          const end = edges[p.e][1];
          const next = edges.findIndex(([a], idx) => a === end && idx !== p.e);
          p.e = next >= 0 ? next : Math.floor(Math.random() * edges.length);
          p.t = 0;
        }
      }
      const [a, b] = edges[p.e];
      dummy.position.lerpVectors(nodes[a], nodes[b], p.t);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      packets.current!.setMatrixAt(i, dummy.matrix);
    });
    packets.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial vertexColors transparent opacity={0.22} toneMapped={false} />
      </lineSegments>
      <points geometry={nodeGeo}>
        <pointsMaterial size={0.06} color="#E8F0FC" transparent opacity={0.7} sizeAttenuation />
      </points>
      <instancedMesh ref={packets} args={[undefined, undefined, PACKETS]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color={CYAN} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/** Particles drifting left-to-right: forward motion. */
function Stream({ animate }: { animate: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 420;
  const { positions, speeds } = useMemo(() => {
    const random = seeded(23);
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions.set([(random() - 0.5) * 14, (random() - 0.5) * 8, (random() - 0.5) * 6 - 1], i * 3);
      speeds[i] = 0.15 + random() * 0.6;
    }
    return { positions, speeds };
  }, []);

  useFrame((_, dt) => {
    if (!animate || !ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      let x = pos.getX(i) + speeds[i] * dt;
      if (x > 7) x = -7;
      pos.setX(i, x);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#9B7BFF" transparent opacity={0.55} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Core({ animate }: { animate: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = animate ? clock.getElapsedTime() : 0;
    ref.current.rotation.set(t * 0.3, t * 0.45, 0);
    ref.current.scale.setScalar(1 + Math.sin(t * 1.6) * 0.04);
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.55, 1]} />
      <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.55} toneMapped={false} />
    </mesh>
  );
}

function Rig({ animate, children }: { animate: boolean; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = animate ? clock.getElapsedTime() : 0;
    const tx = pointer.current.y * 0.25 + Math.sin(t * 0.3) * 0.06;
    const ty = pointer.current.x * 0.35 + Math.sin(t * 0.2) * 0.1;
    group.current.rotation.x += (tx - group.current.rotation.x) * 0.05;
    group.current.rotation.y += (ty - group.current.rotation.y) * 0.05;
  });

  const scale = size.width < 520 ? 0.78 : 1;
  return (
    <group ref={group} scale={scale}>
      {children}
    </group>
  );
}

function Frames({ animate }: { animate: boolean }) {
  const a = useRef<THREE.Group>(null);
  const b = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!animate) return;
    if (a.current) a.current.rotation.z += dt * 0.12;
    if (b.current) b.current.rotation.z -= dt * 0.07;
  });
  return (
    <>
      <HexFrame radius={1.55} width={0.16} depth={0.22} />
      <group ref={a} rotation={[0.5, 0.2, 0]}>
        <HexFrame radius={2.05} width={0.025} depth={0.02} opacity={0.5} />
      </group>
      <group ref={b} rotation={[-0.4, -0.5, 0.3]}>
        <HexFrame radius={2.45} width={0.018} depth={0.02} opacity={0.3} />
      </group>
    </>
  );
}

export default function HeroScene({ reduceMotion }: { reduceMotion: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  // Stop rendering while the hero is scrolled out of view.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const animate = !reduceMotion;

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={!animate ? "demand" : inView ? "always" : "never"}
      >
        <Rig animate={animate}>
          <Network animate={animate} />
          <Frames animate={animate} />
          <Core animate={animate} />
        </Rig>
        <Stream animate={animate} />
      </Canvas>
    </div>
  );
}

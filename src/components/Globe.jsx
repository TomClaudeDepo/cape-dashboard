import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { EXPOSURES, HQ } from "../data/globe-data";

/* ── helpers ─────────────────────────────────────────────── */
function latLonToVec3(lat, lon, r) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function makeArcCurve(from, to, r, lift = 1.25) {
  const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
  mid.normalize().multiplyScalar(r * lift);
  return new THREE.QuadraticBezierCurve3(from, mid, to);
}

/* ── atmosphere shader ───────────────────────────────────── */
const atmosVert = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const atmosFrag = `
  varying vec3 vNormal;
  uniform vec3 uColor;
  void main() {
    float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
    gl_FragColor = vec4(uColor, intensity * 0.45);
  }
`;

/* ── main component ──────────────────────────────────────── */
export default function Globe({ style }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const frameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, dragging: false, prevX: 0, prevY: 0 });
  const rotRef = useRef({ x: 0.3, y: 0 }); // start tilted slightly

  const init = useCallback(() => {
    const container = mountRef.current;
    if (!container || sceneRef.current) return;

    const W = container.clientWidth;
    const H = container.clientHeight;
    const R = 1.8; // globe radius
    const isMobile = W < 600;

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* scene + camera */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.z = isMobile ? 5.8 : 4.8;

    /* pivot group (all globe elements) */
    const pivot = new THREE.Group();
    scene.add(pivot);

    /* ── globe sphere (dark, subtle) ─────────────────────── */
    const globeGeo = new THREE.SphereGeometry(R, 64, 64);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x0d0d14,
      transparent: true,
      opacity: 0.85,
    });
    pivot.add(new THREE.Mesh(globeGeo, globeMat));

    /* ── latitude / longitude grid ───────────────────────── */
    const gridMat = new THREE.LineBasicMaterial({ color: 0x9b1b1b, transparent: true, opacity: 0.08 });

    // latitudes every 20 deg
    for (let lat = -80; lat <= 80; lat += 20) {
      const pts = [];
      for (let lon = 0; lon <= 360; lon += 2) {
        pts.push(latLonToVec3(lat, lon, R * 1.002));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      pivot.add(new THREE.Line(geo, gridMat));
    }
    // longitudes every 30 deg
    for (let lon = 0; lon < 360; lon += 30) {
      const pts = [];
      for (let lat = -90; lat <= 90; lat += 2) {
        pts.push(latLonToVec3(lat, lon, R * 1.002));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      pivot.add(new THREE.Line(geo, gridMat));
    }

    /* ── continent outlines (simplified) ─────────────────── */
    // We'll add subtle dotted circles at key regions for visual depth
    const regionMat = new THREE.LineBasicMaterial({ color: 0x9b1b1b, transparent: true, opacity: 0.14 });
    EXPOSURES.forEach(e => {
      const center = latLonToVec3(e.lat, e.lon, R * 1.003);
      const ringR = 0.04 + e.weight * 0.15;
      const ringPts = [];
      for (let a = 0; a <= Math.PI * 2; a += 0.15) {
        // small ring on globe surface
        const offset = new THREE.Vector3(Math.cos(a) * ringR, Math.sin(a) * ringR, 0);
        // orient ring to face outward
        const normal = center.clone().normalize();
        const up = new THREE.Vector3(0, 1, 0);
        const right = new THREE.Vector3().crossVectors(up, normal).normalize();
        const localUp = new THREE.Vector3().crossVectors(normal, right).normalize();
        const pt = center.clone()
          .add(right.clone().multiplyScalar(Math.cos(a) * ringR))
          .add(localUp.clone().multiplyScalar(Math.sin(a) * ringR));
        ringPts.push(pt);
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
      pivot.add(new THREE.Line(ringGeo, regionMat));
    });

    /* ── exposure markers (glowing points) ───────────────── */
    const markerGroup = new THREE.Group();
    pivot.add(markerGroup);

    const markerData = [];
    EXPOSURES.forEach(e => {
      const pos = latLonToVec3(e.lat, e.lon, R * 1.01);
      const baseSize = 0.02 + e.weight * 0.08;

      // Core bright point
      const coreGeo = new THREE.SphereGeometry(baseSize, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: e.isHQ ? 0xffffff : 0xffccc0,
        transparent: true,
        opacity: 0.95,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.copy(pos);
      markerGroup.add(core);

      // Outer glow
      const glowGeo = new THREE.SphereGeometry(baseSize * 2.5, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: e.isHQ ? 0xffd4c4 : 0x9b1b1b,
        transparent: true,
        opacity: 0.2,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.copy(pos);
      markerGroup.add(glow);

      // Pulse ring
      const pulseGeo = new THREE.RingGeometry(baseSize * 1.5, baseSize * 2.2, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0x9b1b1b,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      pulse.position.copy(pos);
      pulse.lookAt(new THREE.Vector3(0, 0, 0));
      markerGroup.add(pulse);

      markerData.push({ core, glow, pulse, pos, baseSize, weight: e.weight });
    });

    /* ── arcs from Zurich HQ to each exposure ────────────── */
    const hqPos = latLonToVec3(HQ.lat, HQ.lon, R * 1.01);
    EXPOSURES.forEach(e => {
      if (e.isHQ) return;
      const target = latLonToVec3(e.lat, e.lon, R * 1.01);
      const curve = makeArcCurve(hqPos, target, R);
      const pts = curve.getPoints(60);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);

      // Gradient-like: use vertex colors
      const colors = new Float32Array(pts.length * 3);
      for (let i = 0; i < pts.length; i++) {
        const t = i / (pts.length - 1);
        const fade = Math.sin(t * Math.PI); // bright in middle, fade at ends
        colors[i * 3] = 0.608 * fade;     // R: 155/255
        colors[i * 3 + 1] = 0.106 * fade; // G: 27/255
        colors[i * 3 + 2] = 0.106 * fade; // B: 27/255
      }
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const arcMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.35,
        linewidth: 1,
      });
      pivot.add(new THREE.Line(geo, arcMat));
    });

    /* ── atmosphere glow ─────────────────────────────────── */
    const atmosGeo = new THREE.SphereGeometry(R * 1.15, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: atmosVert,
      fragmentShader: atmosFrag,
      uniforms: { uColor: { value: new THREE.Color(0x9b1b1b) } },
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    pivot.add(new THREE.Mesh(atmosGeo, atmosMat));

    /* ── subtle star field ───────────────────────────────── */
    const starCount = 800;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 40;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.3 });
    scene.add(new THREE.Points(starGeo, starMat));

    /* ── lighting (minimal, since we use MeshBasic mostly) ─ */
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    /* ── mouse interaction ───────────────────────────────── */
    const onDown = (e) => {
      const ev = e.touches ? e.touches[0] : e;
      mouseRef.current.dragging = true;
      mouseRef.current.prevX = ev.clientX;
      mouseRef.current.prevY = ev.clientY;
    };
    const onMove = (e) => {
      if (!mouseRef.current.dragging) return;
      const ev = e.touches ? e.touches[0] : e;
      const dx = ev.clientX - mouseRef.current.prevX;
      const dy = ev.clientY - mouseRef.current.prevY;
      rotRef.current.y += dx * 0.005;
      rotRef.current.x += dy * 0.003;
      rotRef.current.x = Math.max(-1.2, Math.min(1.2, rotRef.current.x));
      mouseRef.current.prevX = ev.clientX;
      mouseRef.current.prevY = ev.clientY;
    };
    const onUp = () => { mouseRef.current.dragging = false; };

    renderer.domElement.addEventListener("mousedown", onDown);
    renderer.domElement.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    /* ── resize handler ──────────────────────────────────── */
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      camera.position.z = w < 600 ? 5.8 : 4.8;
    };
    window.addEventListener("resize", onResize);

    /* ── animation loop ──────────────────────────────────── */
    const clock = new THREE.Clock();
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // auto-rotate (slow)
      if (!mouseRef.current.dragging) {
        rotRef.current.y += 0.0015;
      }

      pivot.rotation.x = rotRef.current.x;
      pivot.rotation.y = rotRef.current.y;

      // pulse markers
      markerData.forEach((m, i) => {
        const pulse = 1 + 0.15 * Math.sin(t * 2 + i * 1.1);
        m.glow.scale.setScalar(pulse);
        m.pulse.material.opacity = 0.15 + 0.15 * Math.sin(t * 1.5 + i * 0.7);
        const ringScale = 1 + 0.3 * ((t * 0.5 + i * 0.3) % 1);
        m.pulse.scale.setScalar(ringScale);
      });

      renderer.render(scene, camera);
    };
    animate();

    /* ── store for cleanup ───────────────────────────────── */
    sceneRef.current = {
      renderer, scene, camera, pivot,
      cleanup: () => {
        cancelAnimationFrame(frameRef.current);
        renderer.domElement.removeEventListener("mousedown", onDown);
        renderer.domElement.removeEventListener("touchstart", onDown);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("mouseup", onUp);
        window.removeEventListener("touchend", onUp);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        container.removeChild(renderer.domElement);
      },
    };
  }, []);

  useEffect(() => {
    init();
    return () => {
      if (sceneRef.current) {
        sceneRef.current.cleanup();
        sceneRef.current = null;
      }
    };
  }, [init]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%", ...style }} />;
}

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * CinematicLayer
 * A transparent, GPU-light Three.js overlay that renders slow, warm
 * bokeh-style particles with additive blending and subtle mouse parallax.
 * Purely decorative — pointer-events are disabled on the canvas.
 */
export default function CinematicLayer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ---- Scene setup -------------------------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ---- Soft round glow sprite (generated, no network asset) --------
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = 128;
    spriteCanvas.height = 128;
    const ctx = spriteCanvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const sprite = new THREE.CanvasTexture(spriteCanvas);

    // ---- Particle field ------------------------------------------------
    const COUNT = 90;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const seeds = new Float32Array(COUNT * 3); // phase, speed, radius

    const warm = new THREE.Color("#ff8a3d");
    const ember = new THREE.Color("#c1541c");
    const white = new THREE.Color("#fff4e8");

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 18;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10 - 2;

      const mixT = Math.random();
      const color =
        mixT < 0.45
          ? warm.clone().lerp(white, Math.random() * 0.4)
          : mixT < 0.8
          ? ember.clone().lerp(warm, Math.random() * 0.6)
          : white.clone();
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2.2 + 0.6;

      seeds[i3] = Math.random() * Math.PI * 2; // phase
      seeds[i3 + 1] = Math.random() * 0.4 + 0.08; // speed
      seeds[i3 + 2] = Math.random() * 1.4 + 0.4; // amplitude
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.55,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      opacity: 0.85,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const basePositions = positions.slice();

    // ---- Mouse parallax -------------------------------------------------
    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };

    function handlePointerMove(e: PointerEvent) {
      const rect = mount!.getBoundingClientRect();
      pointerTarget.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerTarget.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // ---- Resize -----------------------------------------------------
    function handleResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    // ---- Animation loop -----------------------------------------------
    let rafId = 0;
    const clock = new THREE.Clock();

    function tick() {
      rafId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        const posAttr = geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < COUNT; i++) {
          const i3 = i * 3;
          const phase = seeds[i3];
          const speed = seeds[i3 + 1];
          const amp = seeds[i3 + 2];
          posAttr.array[i3] =
            basePositions[i3] + Math.sin(t * speed + phase) * amp * 0.4;
          posAttr.array[i3 + 1] =
            basePositions[i3 + 1] + Math.cos(t * speed * 0.8 + phase) * amp;
        }
        posAttr.needsUpdate = true;

        points.rotation.y = Math.sin(t * 0.02) * 0.05;
      }

      // Smooth parallax easing
      pointer.x += (pointerTarget.x - pointer.x) * 0.03;
      pointer.y += (pointerTarget.y - pointer.y) * 0.03;
      camera.position.x = pointer.x * 0.8;
      camera.position.y = -pointer.y * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    tick();

    // ---- Cleanup --------------------------------------------------------
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
      }}
    />
  );
}

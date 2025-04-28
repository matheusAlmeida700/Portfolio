import { useEffect, useRef } from "react";
import * as THREE from "three";

const ParticlesCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const count = 100;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      positions.set([x, y, (Math.random() - 0.5) * 0.5], i * 3);
      colors.set(
        [0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 1],
        i * 3
      );
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);

      particles.rotation.z += 0.005;
      const time = Date.now() * 0.001;
      const pos = geometry.attributes.position.array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const angle = Math.atan2(pos[i3 + 1], pos[i3]);
        const radius = 2 + Math.sin(time + i * 0.1) * 0.1;
        pos[i3] = Math.cos(angle) * radius;
        pos[i3 + 1] = Math.sin(angle) * radius;
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden md:block absolute right-0 top-20"
    />
  );
};

export default ParticlesCanvas;

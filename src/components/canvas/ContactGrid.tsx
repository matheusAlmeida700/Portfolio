import { useRef, useEffect } from "react";
import * as THREE from "three";

const ContactGrid = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    backgroundRef.current.appendChild(renderer.domElement);

    const gridSize = 20;
    const spacing = 0.5;

    const pointsGeometry = new THREE.BufferGeometry();
    const positions = [];
    const pointsCount = gridSize * gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i - gridSize / 2) * spacing;
        const y = (j - gridSize / 2) * spacing;
        const z = 0;

        positions.push(x, y, z);
      }
    }

    pointsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x36f4eb,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    const lineIndices = [];

    let index = 0;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (i < gridSize - 1) {
          lineIndices.push(index, index + 1);
        }
        if (j < gridSize - 1) {
          lineIndices.push(index, index + gridSize);
        }
        index++;
      }
    }

    for (let i = 0; i < positions.length; i++) {
      linePositions.push(positions[i]);
    }

    linesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    linesGeometry.setIndex(lineIndices);

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x9b87f5,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      const positions = pointsGeometry.attributes.position.array;

      for (let i = 0; i < pointsCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];

        positions[i3 + 2] =
          Math.sin(x * 0.5 + time) * 0.2 + Math.cos(y * 0.5 + time) * 0.2;
      }

      pointsGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.position.needsUpdate = true;

      points.rotation.x = Math.sin(time * 0.2) * 0.1;
      points.rotation.y = Math.cos(time * 0.2) * 0.1;
      lines.rotation.x = Math.sin(time * 0.2) * 0.1;
      lines.rotation.y = Math.cos(time * 0.2) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (backgroundRef.current?.contains(renderer.domElement)) {
        backgroundRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={backgroundRef} className="absolute inset-0 -z-10" />;
};

export default ContactGrid;

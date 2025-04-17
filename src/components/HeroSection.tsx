import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import * as THREE from "three";
import ComputersCanvas from "./canvas/Computer";

const HeroSection = () => {
  const avatarContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!avatarContainerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(300, 300);
    avatarContainerRef.current.appendChild(renderer.domElement);

    const orbitGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

      colors[i * 3] = 0.5 + Math.random() * 0.5;
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.5;
      colors[i * 3 + 2] = 1.0;
    }

    orbitGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    orbitGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const orbitMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const orbitParticles = new THREE.Points(orbitGeometry, orbitMaterial);
    scene.add(orbitParticles);

    const animate = () => {
      requestAnimationFrame(animate);

      orbitParticles.rotation.z += 0.005;

      const positions = orbitGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];

        const angle = Math.atan2(y, x);
        const radius = 2 + Math.sin(Date.now() * 0.001 + i * 0.1) * 0.1;

        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = Math.sin(angle) * radius;
      }
      orbitGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (avatarContainerRef.current?.contains(renderer.domElement)) {
        avatarContainerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section id="home" className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto sm:px-16 px-6 flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-60 h-40 bg-gradient-to-b from-purple-700 to-purple-600/10" />
        </div>

        <div>
          <h1
            className={`font-black lg:text-[70px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] text-white`}
          >
            Hi, I'm <span className="text-[#915EFF]">Matheus</span>
          </h1>
          <p
            className={`text-[#dfd9ff] font-medium lg:text-[25px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] text-white-100`}
          >
            I Develop Attractive, user <br className="sm:block hidden" />
            interfaces and web applications
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute bottom-20 left-56">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-3 border-white/90 flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-white/80 mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

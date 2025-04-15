
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import * as THREE from 'three';

const HeroSection = () => {
  const avatarContainerRef = useRef<HTMLDivElement>(null);
  
  // Particle effect around the avatar
  useEffect(() => {
    if (!avatarContainerRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(300, 300);
    avatarContainerRef.current.appendChild(renderer.domElement);
    
    // Create an orbit of particles
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
      
      // Colors (cyan to purple)
      colors[i * 3] = 0.5 + Math.random() * 0.5; // R
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.5; // G
      colors[i * 3 + 2] = 1.0; // B
    }
    
    orbitGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    orbitGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const orbitMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const orbitParticles = new THREE.Points(orbitGeometry, orbitMaterial);
    scene.add(orbitParticles);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the orbit
      orbitParticles.rotation.z += 0.005;
      
      // Make particles pulse
      const positions = orbitGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        
        // Calculate current angle of the particle
        const angle = Math.atan2(y, x);
        const radius = 2 + Math.sin(Date.now() * 0.001 + i * 0.1) * 0.1;
        
        // Update position
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
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative py-20">
      <div className="container mx-auto px-4 z-10">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 neon-purple-text">
            <TypeAnimation
              sequence={[
                'Developer.',
                2000,
                'Creator.',
                2000,
                'Innovator.',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Crafting digital experiences from code to creation
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="mt-16 relative w-64 h-64 mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div 
            ref={avatarContainerRef} 
            className="absolute inset-0 z-0"
          ></div>
          
          <div className="relative z-10 w-48 h-48 mx-auto rounded-full overflow-hidden border-2 border-future-neon animate-float">
            <div className="w-full h-full bg-gradient-to-br from-future-purple to-future-blue rounded-full flex items-center justify-center">
              {/* Placeholder for avatar - replace with your image */}
              <span className="text-5xl">DEV</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.a
            href="#about"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-future-purple to-future-blue text-white font-bold text-lg hover:from-future-neon hover:to-future-purple transition-all duration-300 shadow-lg shadow-future-purple/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({
                behavior: 'smooth'
              });
            }}
          >
            Explore My Universe
          </motion.a>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center pt-1">
          <motion.div 
            className="w-1 h-2 bg-white rounded-full"
            animate={{ 
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

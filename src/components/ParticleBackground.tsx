
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Particle geometry
    const particleCount = 2000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Positions (random across a 3D field)
      positions[i * 3] = (Math.random() - 0.5) * 100;  // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;  // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;  // z
      
      // Sizes (varying)
      sizes[i] = Math.random() * 0.5 + 0.1;
      
      // Colors (blue to purple gradient)
      const mixFactor = Math.random();
      colors[i * 3] = 0.2 + mixFactor * 0.6;  // R (more for purple)
      colors[i * 3 + 1] = 0.1 + mixFactor * 0.1;  // G (low)
      colors[i * 3 + 2] = 0.8 - mixFactor * 0.3;  // B (more for blue)
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      sizeAttenuation: true,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    // Points mesh
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Animation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowX = window.innerWidth / 2;
    const windowY = window.innerHeight / 2;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowX) / 100;
      mouseY = (event.clientY - windowY) / 100;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      targetX = mouseX * 0.2;
      targetY = mouseY * 0.2;
      
      // Rotate the particles based on mouse movement
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.0005;
      particles.rotation.x += (targetY - particles.rotation.x) * 0.02;
      particles.rotation.y += (targetX - particles.rotation.y) * 0.02;
      
      // Render
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => {
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
    };
  }, []);
  
  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default ParticleBackground;

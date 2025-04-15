
import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // 3D background effect
  useEffect(() => {
    if (!backgroundRef.current) return;
    
    // Set up three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    backgroundRef.current.appendChild(renderer.domElement);
    
    // Create a grid of points
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
    
    pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x36F4EB,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);
    
    // Add lines connecting the points
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    const lineIndices = [];
    
    // Connect points to create a grid
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
    
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeometry.setIndex(lineIndices);
    
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x9b87f5,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Deform the grid based on time
      const time = Date.now() * 0.001;
      const positions = pointsGeometry.attributes.position.array;
      
      for (let i = 0; i < pointsCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        
        // Wave effect
        positions[i3 + 2] = Math.sin(x * 0.5 + time) * 0.2 + Math.cos(y * 0.5 + time) * 0.2;
      }
      
      pointsGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.position.needsUpdate = true;
      
      // Rotate the scene slightly
      points.rotation.x = Math.sin(time * 0.2) * 0.1;
      points.rotation.y = Math.cos(time * 0.2) * 0.1;
      lines.rotation.x = Math.sin(time * 0.2) * 0.1;
      lines.rotation.y = Math.cos(time * 0.2) * 0.1;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      if (backgroundRef.current?.contains(renderer.domElement)) {
        backgroundRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate the form submission
    controls.start({
      scale: [1, 0.98, 1],
      transition: { duration: 0.3 }
    });
    
    // Here you would typically handle the form submission logic
    console.log('Form submitted:', formState);
    
    // Reset form after submission (in a real app, you'd do this after successful API response)
    setFormState({
      name: '',
      email: '',
      message: ''
    });
  };
  
  return (
    <section id="contact" className="min-h-screen py-20 relative overflow-hidden">
      <div ref={backgroundRef} className="absolute inset-0 -z-10" />
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get In <span className="neon-text">Touch</span>
        </motion.h2>
        
        <motion.p 
          className="text-lg text-center max-w-2xl mx-auto mb-16 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Have a project in mind or want to collaborate? Let's create something amazing together.
        </motion.p>
        
        <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
          {/* Contact form */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            animate={controls}
          >
            <form 
              onSubmit={handleSubmit}
              className="glassmorphism rounded-xl p-8 neon-border"
            >
              <div className="mb-6 relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    onFocus={() => setActiveInput('name')}
                    onBlur={() => setActiveInput(null)}
                    className="w-full bg-future-dark/30 backdrop-blur-sm border border-future-purple/30 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-future-neon/50 transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                  {activeInput === 'name' && (
                    <motion.div 
                      className="absolute inset-0 rounded-lg border border-future-neon -z-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              </div>
              
              <div className="mb-6 relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    onFocus={() => setActiveInput('email')}
                    onBlur={() => setActiveInput(null)}
                    className="w-full bg-future-dark/30 backdrop-blur-sm border border-future-purple/30 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-future-neon/50 transition-all duration-300"
                    placeholder="john.doe@example.com"
                    required
                  />
                  {activeInput === 'email' && (
                    <motion.div 
                      className="absolute inset-0 rounded-lg border border-future-neon -z-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              </div>
              
              <div className="mb-6 relative">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    onFocus={() => setActiveInput('message')}
                    onBlur={() => setActiveInput(null)}
                    rows={5}
                    className="w-full bg-future-dark/30 backdrop-blur-sm border border-future-purple/30 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-future-neon/50 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                  {activeInput === 'message' && (
                    <motion.div 
                      className="absolute inset-0 rounded-lg border border-future-neon -z-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              </div>
              
              <motion.button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-future-neon to-future-purple text-black font-medium rounded-lg hover:from-future-purple hover:to-future-neon transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Send Message</span>
                <motion.div 
                  className="absolute inset-0 -z-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </form>
          </motion.div>
          
          {/* Contact info */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glassmorphism rounded-xl p-8 h-full neon-border flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 neon-purple-text">Let's Connect</h3>
                <p className="text-gray-300 mb-8">
                  Ready to start your next project or have questions about my work? 
                  Drop me a message and I'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-future-dark flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-future-neon" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">contact@example.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-future-dark flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-future-neon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="text-white">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <p className="text-sm text-gray-400 mb-4">Connect with me on social media</p>
                <div className="flex space-x-4">
                  <SocialButton icon="github" />
                  <SocialButton icon="linkedin" />
                  <SocialButton icon="twitter" />
                  <SocialButton icon="instagram" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SocialButton = ({ icon }: { icon: string }) => {
  return (
    <motion.a
      href="#"
      className="w-10 h-10 rounded-full bg-future-dark flex items-center justify-center border border-future-purple/30 hover:border-future-neon transition-colors duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="text-future-purple group-hover:text-future-neon transition-colors duration-300">
        {/* Simple placeholder icons - replace with actual social icons */}
        {icon === 'github' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 8a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm7 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm-3.5 5.5a.5.5 0 00-1 0V14h1v-.5z" clipRule="evenodd" />
          </svg>
        )}
        {icon === 'linkedin' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
          </svg>
        )}
        {icon === 'twitter' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.615 11.615 0 006.29 1.84" />
          </svg>
        )}
        {icon === 'instagram' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 00-1.417.923A3.927 3.927 0 00.42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 001.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 00-.923-1.417A3.911 3.911 0 0013.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 01-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 01-.92-.598 2.48 2.48 0 01-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 100 1.92.96.96 0 000-1.92zm-4.27 1.122a4.109 4.109 0 100 8.217 4.109 4.109 0 000-8.217zm0 1.441a2.667 2.667 0 110 5.334 2.667 2.667 0 010-5.334z" clipRule="evenodd" />
          </svg>
        )}
      </span>
    </motion.a>
  );
};

export default ContactSection;

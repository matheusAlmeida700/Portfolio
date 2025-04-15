
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [50, 0, 0, -50]);
  
  // Holographic lines effect
  useEffect(() => {
    if (!textRef.current) return;
    
    const createHolographicLines = () => {
      const container = textRef.current;
      if (!container) return;
      
      // Clear existing lines
      const existingLines = container.querySelectorAll('.holo-line');
      existingLines.forEach(line => line.remove());
      
      // Add new lines
      const lineCount = 10;
      
      for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.classList.add('holo-line');
        line.style.top = `${(i / lineCount) * 100}%`;
        line.style.height = `${100 / lineCount}px`;
        line.style.opacity = `${0.1 + Math.random() * 0.05}`;
        line.style.animationDuration = `${3 + Math.random() * 2}s`;
        line.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(line);
      }
    };
    
    createHolographicLines();
    
    window.addEventListener('resize', createHolographicLines);
    return () => window.removeEventListener('resize', createHolographicLines);
  }, []);
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-future-dark/20 z-0"></div>
      
      <motion.div 
        className="container mx-auto px-4 z-10 relative"
        style={{ opacity, y }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="neon-text">About</span> Me
          </motion.h2>
          
          <div 
            ref={textRef} 
            className="relative glassmorphism p-8 rounded-xl neon-border overflow-hidden"
          >
            <style>
              {`
                .holo-line {
                  position: absolute;
                  left: 0;
                  width: 100%;
                  background: linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(54, 244, 235, 0.05) 15%,
                    rgba(115, 103, 240, 0.05) 50%,
                    rgba(54, 244, 235, 0.05) 85%,
                    transparent 100%
                  );
                  animation: moveHorizontal linear infinite;
                }
                
                @keyframes moveHorizontal {
                  from { transform: translateX(-100%); }
                  to { transform: translateX(100%); }
                }
              `}
            </style>
            
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
                Since the age of 12, technology stopped being just a curiosity and became a true passion. 
                I began building simple apps and games, driven by a desire to understand what happens behind 
                the screen — and today, I turn that passion into impactful code.
              </p>
              
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                My journey has taken me through various languages, frameworks, and paradigms, 
                each adding new dimensions to my understanding of software development. 
                I believe in creating solutions that are not only technically sound but also 
                intuitive and accessible to users.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                <Stat value="10+" label="Years Coding" />
                <Stat value="30+" label="Projects Completed" />
                <Stat value="15+" label="Technologies Mastered" />
                <Stat value="∞" label="Passion for Learning" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => {
  return (
    <motion.div 
      className="text-center p-4"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-3xl md:text-4xl font-bold neon-purple-text mb-2">{value}</h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </motion.div>
  );
};

export default AboutSection;

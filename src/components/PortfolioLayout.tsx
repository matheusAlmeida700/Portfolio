
import { useState, useEffect } from 'react';
import ParticleBackground from './ParticleBackground';
import FuturisticNav from './FuturisticNav';
import { motion } from 'framer-motion';

interface PortfolioLayoutProps {
  children: React.ReactNode;
}

const PortfolioLayout = ({ children }: PortfolioLayoutProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  
  useEffect(() => {
    // Track cursor movement
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsMouseMoving(true);
      
      // Hide custom cursor when not moving
      clearTimeout(window.cursorTimeout);
      window.cursorTimeout = setTimeout(() => setIsMouseMoving(false), 3000);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(window.cursorTimeout);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      {/* Particle background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <FuturisticNav />
      
      {/* Main content */}
      <main>
        {children}
      </main>
      
      {/* Footer */}
      <footer className="py-6 px-4 border-t border-future-purple/20 text-center text-gray-400 text-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} • Created with cutting-edge web technologies</p>
        </div>
      </footer>
      
      {/* Custom cursor */}
      <motion.div
        className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference ${
          isMouseMoving ? 'opacity-100' : 'opacity-0'
        }`}
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          transition: { duration: 0.1, ease: "linear" }
        }}
      >
        <motion.div 
          className="w-full h-full rounded-full bg-white/80"
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Cursor trail */}
      <div className="cursor-trail fixed pointer-events-none z-40">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full absolute bg-future-neon/30 mix-blend-screen"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              x: cursorPosition.x - 4,
              y: cursorPosition.y - 4,
              scale: 1 - (i * 0.1),
              opacity: 0.5 - (i * 0.05)
            }}
            transition={{
              duration: 0.1,
              ease: "linear",
              delay: i * 0.05
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Add the cursorTimeout to Window interface
declare global {
  interface Window {
    cursorTimeout: NodeJS.Timeout;
  }
}

export default PortfolioLayout;

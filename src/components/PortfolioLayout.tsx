import { useState, useEffect } from "react";
import ParticleBackground from "./ParticleBackground";
import FuturisticNav from "./Navbar";
import { motion } from "framer-motion";

interface PortfolioLayoutProps {
  children: React.ReactNode;
}

const PortfolioLayout = ({ children }: PortfolioLayoutProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsMouseMoving(true);

      clearTimeout(window.cursorTimeout);
      window.cursorTimeout = setTimeout(() => setIsMouseMoving(false), 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(window.cursorTimeout);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <ParticleBackground />

      <FuturisticNav />

      <main>{children}</main>

      <footer className="py-6 px-4 border-t border-white/30 text-center text-gray-300">
        <div className="container mx-auto">
          <p>
            © {new Date().getFullYear()} • Matheus Almeida - Todos os direitos
            reservados
          </p>
        </div>
      </footer>

      <motion.div
        className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference ${
          isMouseMoving ? "opacity-100" : "opacity-0"
        }`}
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          transition: { duration: 0.1, ease: "linear" },
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
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="cursor-trail fixed pointer-events-none z-40">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full absolute bg-future-neon/30 mix-blend-screen"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              x: cursorPosition.x - 4,
              y: cursorPosition.y - 4,
              scale: 1 - i * 0.1,
              opacity: 0.5 - i * 0.05,
            }}
            transition={{
              duration: 0.1,
              ease: "linear",
              delay: i * 0.05,
            }}
          />
        ))}
      </div>
    </div>
  );
};

declare global {
  interface Window {
    cursorTimeout: NodeJS.Timeout;
  }
}

export default PortfolioLayout;

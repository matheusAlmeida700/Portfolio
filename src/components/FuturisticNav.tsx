
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const FuturisticNav = () => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  
  useEffect(() => {
    // Handle nav highlighting based on scroll or URL
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).clientHeight;
        
        if (window.scrollY >= sectionTop - 200 && 
            window.scrollY < sectionTop + sectionHeight - 200) {
          current = section.getAttribute('id') || '';
        }
      });
      
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Set based on URL if that's how we're navigating
    if (location.hash) {
      setActiveSection(location.hash.substring(1));
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location, activeSection]);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];
  
  return (
    <motion.nav 
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-2 py-1 glassmorphism rounded-full"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <ul className="flex items-center space-x-2">
        {navItems.map((item) => (
          <li key={item.id} className="relative">
            <Link
              to={`#${item.id}`}
              className={`relative px-4 py-2 rounded-full text-sm transition-all duration-300 block ${
                activeSection === item.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: 'smooth'
                });
                setActiveSection(item.id);
              }}
            >
              {activeSection === item.id && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-future-neon to-future-purple-light -z-10"
                  layoutId="navBackground"
                  transition={{ type: 'spring', duration: 0.6 }}
                />
              )}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default FuturisticNav;

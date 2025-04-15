
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Sample certification data - replace with your own
const certificationsData = [
  {
    id: 1,
    title: "Advanced Full-Stack Development",
    issuer: "Tech Academy",
    date: "2023",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=150&h=150&q=80",
    skills: ["React", "Node.js", "MongoDB", "AWS"]
  },
  {
    id: 2,
    title: "Machine Learning & AI Fundamentals",
    issuer: "DataScience Institute",
    date: "2022",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=150&h=150&q=80",
    skills: ["Python", "TensorFlow", "Neural Networks", "Computer Vision"]
  },
  {
    id: 3,
    title: "Cloud Architecture Professional",
    issuer: "Cloud Certification Board",
    date: "2022",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=150&h=150&q=80",
    skills: ["AWS", "Azure", "Kubernetes", "Microservices"]
  },
  {
    id: 4,
    title: "Blockchain Development",
    issuer: "Crypto Academy",
    date: "2021",
    image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop&w=150&h=150&q=80",
    skills: ["Solidity", "Smart Contracts", "Web3", "DApps"]
  }
];

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Create a parallax effect for the heading
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <section 
      id="certifications" 
      ref={sectionRef}
      className="min-h-screen py-20 relative"
    >
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div style={{ y, opacity }}>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="neon-text">Certifications</span> & Achievements
          </motion.h2>
          
          <motion.p 
            className="text-lg text-center max-w-2xl mx-auto mb-16 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Professional qualifications that validate my expertise across multiple domains
          </motion.p>
        </motion.div>
        
        {/* Interactive Grid */}
        <div ref={carouselRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsData.map((cert, index) => (
            <CertificationCard 
              key={cert.id} 
              certification={cert} 
              index={index} 
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
      
      {/* Circuit board background pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23${encodeURIComponent('#36F4EB').slice(1)}' fill-opacity='0.25' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
    </section>
  );
};

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  skills: string[];
}

const CertificationCard = ({ 
  certification, 
  index, 
  scrollProgress 
}: { 
  certification: Certification; 
  index: number; 
  scrollProgress: any; 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Calculate scale and rotation based on scroll position
  const scale = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [0.8, 1, 0.8]
  );
  
  const rotateY = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [10, 0, -10]
  );
  
  return (
    <motion.div
      ref={cardRef}
      className="glassmorphism rounded-xl overflow-hidden neon-border group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        scale,
        rotateY,
        transformPerspective: 1000
      }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 0 15px 5px rgba(54, 244, 235, 0.15)' 
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-future-purple to-future-neon p-[2px]">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img 
                src={certification.image} 
                alt={certification.title}
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-future-neon font-medium text-sm">{certification.date}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-1">{certification.title}</h3>
        <p className="text-gray-400 text-sm mb-4">Issued by {certification.issuer}</p>
        
        <div className="flex flex-wrap gap-2">
          {certification.skills.map((skill, i) => (
            <motion.span
              key={i}
              className="px-2 py-1 bg-future-dark/80 text-xs rounded-full text-future-neon"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.5 + (i * 0.05), 
                duration: 0.2 
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
        
        <motion.div 
          className="h-0.5 w-full bg-gradient-to-r from-future-neon to-future-purple mt-4"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>
      
      {/* Glowing hover effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-future-neon/20 to-future-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={{ opacity: 0.2 }}
      />
    </motion.div>
  );
};

export default CertificationsSection;

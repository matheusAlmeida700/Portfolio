
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Define skills with their categories
const skillsData = [
  { 
    name: 'JavaScript', 
    level: 95, 
    category: 'frontend',
    color: '#F7DF1E',
    icon: '⚡' 
  },
  { 
    name: 'TypeScript', 
    level: 90, 
    category: 'frontend',
    color: '#3178C6',
    icon: '🛡️' 
  },
  { 
    name: 'React', 
    level: 92, 
    category: 'frontend',
    color: '#61DAFB',
    icon: '⚛️' 
  },
  { 
    name: 'Node.js', 
    level: 88, 
    category: 'backend',
    color: '#339933',
    icon: '🚀' 
  },
  { 
    name: 'Python', 
    level: 85, 
    category: 'backend',
    color: '#3776AB',
    icon: '🐍' 
  },
  { 
    name: 'MySQL', 
    level: 80, 
    category: 'database',
    color: '#4479A1',
    icon: '🗄️' 
  },
  { 
    name: 'NoSQL', 
    level: 82, 
    category: 'database',
    color: '#4DB33D',
    icon: '📊' 
  },
  { 
    name: 'Express.js', 
    level: 85, 
    category: 'backend',
    color: '#000000',
    icon: '🔌' 
  },
  { 
    name: 'Spring Boot', 
    level: 78, 
    category: 'backend',
    color: '#6DB33F',
    icon: '🍃' 
  },
  { 
    name: 'Unity', 
    level: 75, 
    category: 'other',
    color: '#000000',
    icon: '🎮' 
  }
];

// Filter categories 
const categories = ['all', 'frontend', 'backend', 'database', 'other'];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredSkills, setFilteredSkills] = useState(skillsData);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  // Filter skills when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredSkills(skillsData);
    } else {
      setFilteredSkills(skillsData.filter(skill => skill.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="min-h-screen py-20 relative"
    >
      <div className="container mx-auto px-4 z-10 relative">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Tech <span className="neon-text">Skills</span>
        </motion.h2>
        
        <motion.div 
          className="flex justify-center mb-12 flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-future-neon to-future-purple text-white'
                  : 'bg-future-dark/40 text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.1 + index * 0.1 }
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredSkills.map((skill, index) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              index={index}
              isInView={isInView} 
            />
          ))}
        </div>
      </div>
      
      {/* Dynamic background circles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${
                ['#36F4EB', '#8B5CF6', '#F471B5'][i % 3]
              } 0%, rgba(0,0,0,0) 70%)`,
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </section>
  );
};

// Define the Skill interface
interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
  icon: string;
}

// Skill card component with animation
const SkillCard = ({ 
  skill, 
  index, 
  isInView 
}: { 
  skill: Skill; 
  index: number; 
  isInView: boolean;
}) => {
  return (
    <motion.div
      className="glassmorphism rounded-xl overflow-hidden relative p-6 neon-border h-40 flex flex-col justify-between"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 20px 2px rgba(${skill.color}, 0.3)`,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
            <span>{skill.icon}</span>
            {skill.name}
          </h3>
          <p className="text-sm text-gray-400 capitalize">{skill.category}</p>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-future-dark to-future-blue-dark">
          <span className="text-lg">{skill.level}%</span>
        </div>
      </div>
      
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ 
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
            width: `${skill.level}%`, 
            originX: 0 
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
        />
      </div>
      
      {/* Glowing particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isInView && [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ 
              background: skill.color,
              boxShadow: `0 0 5px ${skill.color}`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsSection;

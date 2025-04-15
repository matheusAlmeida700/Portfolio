
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Sample timeline data - replace with your own milestones
const timelineData = [
  {
    year: "2011",
    age: 12,
    title: "First Line of Code",
    description: "Wrote my first 'Hello World' program in HTML and was instantly fascinated by seeing my code come to life in the browser."
  },
  {
    year: "2013",
    age: 14,
    title: "First Game Development",
    description: "Created a simple arcade game with JavaScript, learning the fundamentals of game logic, collision detection, and animation."
  },
  {
    year: "2015",
    age: 16,
    title: "Mobile App Development",
    description: "Developed my first mobile app, an educational tool that helped high school students with science concepts."
  },
  {
    year: "2017",
    age: 18,
    title: "University & First Internship",
    description: "Started studying Computer Science and secured my first internship at a local tech startup working on web applications."
  },
  {
    year: "2019",
    age: 20,
    title: "Open Source Contributions",
    description: "Started contributing to open source projects, collaborating with developers worldwide and improving my coding skills."
  },
  {
    year: "2021",
    age: 22,
    title: "Professional Developer",
    description: "Joined a tech company as a full-stack developer, working on enterprise applications serving thousands of users."
  },
  {
    year: "Present",
    age: "Now",
    title: "Independent Developer",
    description: "Working as an independent developer, building cutting-edge solutions and continuously exploring new technologies."
  }
];

const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Create a progress line that fills as the user scrolls through this section
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.01, 1]);
  
  return (
    <section 
      id="timeline" 
      ref={sectionRef}
      className="min-h-screen py-20 relative"
    >
      <div className="container mx-auto px-4 z-10 relative">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My <span className="neon-text">Journey</span>
        </motion.h2>
        
        <div className="relative">
          {/* Vertical timeline line with progress animation */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-800/50" />
          
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-gradient-to-b from-future-neon to-future-purple origin-top"
            style={{ scaleY: scaleX, height: '100%' }}
          />
          
          <div className="relative">
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={index} 
                item={item} 
                index={index} 
                isLast={index === timelineData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Nebula-like animated background */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? '#9b87f5' : '#36F4EB'
              } 0%, rgba(0,0,0,0) 70%)`,
              width: `${200 + i * 20}px`,
              height: `${200 + i * 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 20 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </section>
  );
};

interface TimelineItemProps {
  item: {
    year: string;
    age: number | string;
    title: string;
    description: string;
  };
  index: number;
  isLast: boolean;
}

const TimelineItem = ({ item, index, isLast }: TimelineItemProps) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className={`mb-16 flex items-center ${isLast ? 'mb-0' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Content */}
      <div className={`w-1/2 pr-12 ${!isEven && 'order-2 pl-12 pr-0 text-right'}`}>
        <div className={`glassmorphism rounded-xl p-6 ${isEven ? 'mr-8' : 'ml-8'}`}>
          <h3 className="text-lg font-bold mb-1 neon-purple-text">{item.title}</h3>
          <p className="text-sm text-gray-300 mb-4">{item.description}</p>
        </div>
      </div>
      
      {/* Timeline marker */}
      <motion.div 
        className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex flex-col items-center justify-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-future-neon to-future-purple flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full animate-pulse-slow bg-future-neon/20 blur-sm"></div>
            <span className="text-xs font-bold">{item.age}</span>
          </div>
          <div className="mt-2 text-sm font-medium text-future-neon">{item.year}</div>
        </div>
      </motion.div>
      
      {/* Empty div for layout */}
      <div className={`w-1/2 ${isEven && 'order-2'}`}></div>
    </motion.div>
  );
};

export default TimelineSection;

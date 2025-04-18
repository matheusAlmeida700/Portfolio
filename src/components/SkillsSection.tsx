import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { technologies } from "../constants/index";

const skillsData = [
  {
    name: "JavaScript",
    level: 95,
    category: "frontend",
    color: "#F7DF1E",
    icon: "🟨",
  },
  {
    name: "HTML",
    level: 95,
    category: "frontend",
    color: "#E34F26",
    icon: "📄",
  },
  {
    name: "CSS",
    level: 95,
    category: "frontend",
    color: "#1572B6",
    icon: "🎨",
  },
  {
    name: "TailwindCSS",
    level: 95,
    category: "frontend",
    color: "#06B6D4",
    icon: "🌬️",
  },
  {
    name: "TypeScript",
    level: 90,
    category: "frontend",
    color: "#3178C6",
    icon: "🌀",
  },
  {
    name: "React",
    level: 92,
    category: "frontend",
    color: "#61DAFB",
    icon: "⚛️",
  },
  {
    name: "Node.js",
    level: 88,
    category: "backend",
    color: "#339933",
    icon: "🌱",
  },
  {
    name: "Python",
    level: 85,
    category: "other",
    color: "#3776AB",
    icon: "🐍",
  },
  {
    name: "MySQL",
    level: 80,
    category: "database",
    color: "#4479A1",
    icon: "🐬",
  },
  {
    name: "MongoDB",
    level: 82,
    category: "database",
    color: "#47A248",
    icon: "🍃",
  },
  {
    name: "Express.js",
    level: 85,
    category: "backend",
    color: "#000000",
    icon: "🚇",
  },
  {
    name: "Spring Boot",
    level: 78,
    category: "backend",
    color: "#6DB33F",
    icon: "🌼",
  },
  {
    name: "Git",
    level: 85,
    category: "other",
    color: "#F05032",
    icon: "🔧",
  },
  {
    name: "Unity",
    level: 75,
    category: "other",
    color: "#000000",
    icon: "🎮",
  },
];

const categories = ["all", "frontend", "backend", "database", "other"];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredSkills, setFilteredSkills] = useState(skillsData);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredSkills(skillsData);
    } else {
      setFilteredSkills(
        skillsData.filter((skill) => skill.category === activeCategory)
      );
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
          className="text-4xl md:text-4xl font-bold mb-8 pl-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Tech <span className="neon-text">Skills</span>
        </motion.h2>

        <div className="flex justify-center mb-12 flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-future-neon to-future-purple text-white"
                  : "bg-future-dark/40 text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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

      {/* Background bubbles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${
                ["#36F4EB", "#8B5CF6", "#F471B5"][i % 3]
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
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
  icon: string;
}

const SkillCard = ({
  skill,
  isInView,
}: {
  skill: Skill;
  index: number;
  isInView: boolean;
}) => {
  const tech = technologies.find((t) => t.name.includes(skill.name));

  return (
    <motion.div
      className="glassmorphism rounded-xl overflow-hidden relative p-4 flex flex-col justify-between"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2 }}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 20px 2px ${skill.color}55`,
      }}
    >
      <div className="flex justify-center flex-col items-center">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span>{skill.icon}</span>
          {skill.name}
        </h3>
        <div
          className="w-24 h-24 rounded-full p-[3px]"
          style={{
            background: `radial-gradient(circle, ${skill.color}55, transparent)`,
            boxShadow: `0 0 12px ${skill.color}88`,
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center">
            {tech?.icon ? (
              <img
                src={tech.icon}
                alt={skill.name}
                className="w-5/6 h-5/6 object-contain"
              />
            ) : (
              <span className="text-lg text-black">{skill.category}</span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isInView &&
          [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: skill.color,
                boxShadow: `0 0 5px ${skill.color}`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
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
                repeatType: "reverse",
              }}
            />
          ))}
      </div>
    </motion.div>
  );
};

export default SkillsSection;

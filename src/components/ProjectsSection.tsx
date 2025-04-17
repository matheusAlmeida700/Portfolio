import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Virtual Reality Dashboard",
    description:
      "An immersive VR dashboard for monitoring real-time data streams with interactive 3D visualizations.",
    tags: ["React", "Three.js", "WebXR", "Node.js"],
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=250",
  },
  {
    id: 2,
    title: "Neural Network Visualizer",
    description:
      "Interactive visualization tool for neural networks that lets users experiment with different architectures.",
    tags: ["Python", "TensorFlow", "WebGL", "D3.js"],
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&h=250",
  },
  {
    id: 3,
    title: "Quantum Computing Simulator",
    description:
      "Educational platform for simulating quantum algorithms and visualizing quantum states.",
    tags: ["TypeScript", "React", "Python", "WebAssembly"],
    image:
      "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=400&h=250",
  },
  {
    id: 4,
    title: "Blockchain Explorer",
    description:
      "Advanced blockchain explorer with real-time transaction visualization and analytics dashboard.",
    tags: ["React", "Node.js", "Web3", "GraphQL"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&h=250",
  },
  {
    id: 5,
    title: "AI Code Assistant",
    description:
      "Intelligent code assistant that provides contextual suggestions and autocompletion based on your coding patterns.",
    tags: ["Python", "NLP", "React", "TypeScript"],
    image:
      "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop&w=400&h=250",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="projects"
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
          <span className="neon-text">Projects</span> Gallery
        </motion.h2>

        <motion.p
          className="text-lg text-center max-w-2xl mx-auto mb-16 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore my universe of digital creations — from immersive experiences
          to cutting-edge applications that push technical boundaries.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #36F4EB20 1px, transparent 1px), 
                          linear-gradient(to bottom, #36F4EB20 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>
    </section>
  );
};

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const ProjectCard = ({
  project,
  index,
  progress,
}: {
  project: Project;
  index: number;
  progress: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate the different movement timing based on card position
  const baseDelay = index * 0.2;
  const y = useTransform(progress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <motion.div
      ref={cardRef}
      className="relative h-[380px] rounded-xl overflow-hidden neon-border group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: baseDelay }}
      style={{ y }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Card background with parallax effect */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${project.image})`,
          filter: "brightness(0.3)",
        }}
        animate={
          isHovered
            ? {
                scale: 1.1,
                filter: "brightness(0.5)",
              }
            : {
                scale: 1,
                filter: "brightness(0.3)",
              }
        }
        transition={{ duration: 0.4 }}
      />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-future-dark/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
        <div>
          <motion.h3
            className="text-xl font-bold mb-2 neon-purple-text"
            animate={isHovered ? { y: -5 } : { y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="text-gray-300 text-sm mb-4"
            animate={isHovered ? { opacity: 0.9 } : { opacity: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {project.description}
          </motion.p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <motion.span
                key={i}
                className="px-2 py-1 bg-future-dark/80 text-xs rounded-full text-future-neon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: isHovered ? 0.1 + i * 0.05 : 0,
                  duration: 0.2,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button className="px-4 py-2 bg-gradient-to-r from-future-neon to-future-blue text-black font-medium text-sm rounded-full hover:from-future-purple hover:to-future-neon transition-all duration-300">
              Demo
            </button>
            <button className="px-4 py-2 border border-future-neon text-future-neon text-sm rounded-full hover:bg-future-neon/10 transition-all duration-300">
              Code
            </button>
          </motion.div>
        </div>

        {/* Futuristic corner accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-future-neon/70"></div>
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-future-neon/70"></div>
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-future-neon/70"></div>
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-future-neon/70"></div>
      </div>

      {/* Hover state lighting effect */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-tr from-future-neon/5 to-future-purple/5"
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectsSection;

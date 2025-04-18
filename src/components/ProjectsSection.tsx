import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ExternalLink, Github } from "lucide-react";

const projectsData = [
  {
    title: "Protex Expert Cleaning",
    description: "Uma aplicação web moderna com foco em experiência do usuário",
    image: "/projects/protex.png",
    tags: ["React", "Node.js", "MongoDB"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "BioVerse",
    description: "Uma aplicação web moderna com foco em experiência do usuário",
    image: "/projects/bioverse.png",
    tags: ["React", "Node.js", "MongoDB"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Pet-Mania",
    description: "Sistema de gerenciamento empresarial completo",
    image: "/projects/petshop.png",
    tags: ["TypeScript", "Express", "PostgreSQL"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Engineering",
    description: "Aplicativo móvel para rastreamento de hábitos",
    image: "/projects/engineering.png",
    tags: ["React Native", "Firebase"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Projeto 4",
    description: "Dashboard analítico com visualizações de dados",
    image: "/projects/pack-go.png",
    tags: ["Vue.js", "D3.js", "Python"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Anime-Hub",
    description: "Dashboard analítico com visualizações de dados",
    image: "/projects/anime-hub.png",
    tags: ["Vue.js", "D3.js", "Python"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Movie-Hub",
    description: "Dashboard analítico com visualizações de dados",
    image: "/projects/movie-hub.png",
    tags: ["Vue.js", "D3.js", "Python"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Projeto 4",
    description: "Dashboard analítico com visualizações de dados",
    image: "/projects/dev-burguer.png",
    tags: ["Vue.js", "D3.js", "Python"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="neon-text">About</span> Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <Dialog key={project.title}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group glassmorphism">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </DialogTrigger>

              <DialogContent className="w-[90vw] md:w-[80vw] max-w-[1000px]">
                <DialogHeader>
                  <DialogTitle>{project.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <p className="text-muted-foreground">
                    {project.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => window.open(project.demoUrl, "_blank")}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                      className="flex items-center gap-2"
                    >
                      <Github size={16} />
                      GitHub
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

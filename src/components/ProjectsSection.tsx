import { motion } from "framer-motion";
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
import { projectsData } from "@/constants";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="neon-text">Meus</span> Projetos
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
                          className="px-2 py-1 rounded-full bg-primary/10 text-purple-500 font-bold text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </DialogTrigger>

              <DialogContent className="w-[90vw] max-h-[85vh] overflow-y-auto max-w-[1000px]">
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
                      className="flex items-center gap-2 border-2 border-white cursor-pointer hover:bg-[#915EFF] hover:border-[#915EFF]"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </Button>
                    <Button
                      onClick={() => window.open(project.githubUrl, "_blank")}
                      className="flex items-center gap-2 border-2 border-white cursor-pointer hover:bg-[#915EFF] hover:border-[#915EFF]"
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

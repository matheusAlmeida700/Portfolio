import { useState, useEffect } from "react";
import { Calendar, Briefcase, GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type TimelineItem = {
  id: number;
  date: string;
  title: string;
  description: string;
  type: "work" | "education" | "achievement";
};

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    date: "2020",
    title: "Início na Programação",
    description:
      "Primeiro contato com programação por meio do Python. Criei scripts para automatizar tarefas no computador, como envio de e-mails e formulários",
    type: "work",
  },
  {
    id: 2,
    date: "2021 - 2022",
    title: "Desenvolvedor Python e Unity",
    description:
      "Desenvolvi jogos em C# utilizando a engine Unity, além de scripts para análise de dados e automação com Python",
    type: "work",
  },
  {
    id: 3,
    date: "2023",
    title: "Desenvolvedor Front-end",
    description:
      "Curso de especialização focado em padrões de projeto, microserviços e sistemas distribuídos.",
    type: "education",
  },
  {
    id: 4,
    date: "2018 - 2020",
    title: "Desenvolvedor Front-end",
    description:
      "Desenvolvimento de aplicações web responsivas e escaláveis utilizando React, TypeScript e Node.js. Integração com APIs de terceiros e implementação de fluxos de CI/CD.",
    type: "work",
  },
  {
    id: 5,
    date: "2018",
    title: "Bacharelado em Ciência da Computação",
    description:
      "Graduação com foco em desenvolvimento de software, algoritmos e estruturas de dados.",
    type: "education",
  },
  {
    id: 6,
    date: "2017",
    title: "Prêmio de Inovação Tecnológica",
    description:
      "Reconhecimento por projeto de aplicativo de acessibilidade desenvolvido durante hackathon universitário.",
    type: "achievement",
  },
];

function getIcon(type: TimelineItem["type"]) {
  switch (type) {
    case "work":
      return <Briefcase className="h-5 w-5" />;
    case "education":
      return <GraduationCap className="h-5 w-5" />;
    case "achievement":
      return <Award className="h-5 w-5" />;
    default:
      return <Calendar className="h-5 w-5" />;
  }
}

const getIconClass = (type: TimelineItem["type"]) => {
  switch (type) {
    case "work":
      return "bg-blue-500/20 text-blue-500 border-blue-500/50";
    case "education":
      return "bg-purple-500/20 text-purple-500 border-purple-500/50";
    case "achievement":
      return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
    default:
      return "bg-primary/20 text-primary border-primary/50";
  }
};

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.id.split("-")[1]);
            setVisibleItems((prev) =>
              prev.includes(id) ? prev : [...prev, id]
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    const timelineElements = document.querySelectorAll(".timeline-item");
    timelineElements.forEach((el) => observer.observe(el));

    return () => {
      timelineElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="timeline" className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="neon-text">Linha do</span> Tempo
        </motion.h2>

        <div className="relative">
          <div className="absolute left-[20px] md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-timeline"></div>

          <div className="space-y-16">
            {timelineItems.map((item, index) => (
              <div
                id={`item-${item.id}`}
                key={item.id}
                className={cn(
                  "timeline-item relative flex items-start gap-8",
                  visibleItems.includes(item.id) ? "opacity-100" : "opacity-0"
                )}
                style={{
                  transition: "all 0.7s ease-out",
                  transitionDelay: `${
                    visibleItems.includes(item.id) ? item.id * 0.2 : 0
                  }s`,
                }}
              >
                <div className="absolute left-0 md:left-1/2 z-10 transform -translate-y-1/2 md:-translate-x-1/2">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2",
                      getIconClass(item.type),
                      "timeline-animation-icon"
                    )}
                  >
                    {getIcon(item.type)}
                  </div>
                </div>

                <div
                  className={cn(
                    "ml-16 md:ml-0 w-full md:w-1/2",
                    index % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:pl-16 md:ml-auto"
                  )}
                >
                  <div
                    className={cn(
                      "glassmorphism p-6 rounded-lg transform",
                      index % 2 === 0
                        ? "timeline-animation-left"
                        : "timeline-animation-right"
                    )}
                  >
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                    <span className="inline-block mt-3 bg-purple-500/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

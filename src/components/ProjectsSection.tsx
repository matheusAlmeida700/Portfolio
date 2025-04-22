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

const projectsData = [
  {
    title: "Protex Expert Cleaning",
    description:
      "Sistema completo para gerenciamento de clientes e colaboradores de uma empresa de limpeza profissional.",
    image: "/projects/protex.png",
    tags: ["React", "Vite", "Express.js", "MongoDB"],
    demoUrl: "https://github.com/matheusAlmeida700/Protex-Cleaning-Back",
    githubUrl: "https://github.com/matheusAlmeida700/Protex-Cleaning-Back",
    longDescription:
      "Uma aplicação full-stack moderna desenvolvida para otimizar o controle de clientes, colaboradores e estatísticas operacionais. Com recursos completos de cadastro, edição e gerenciamento em tempo real, o sistema oferece uma interface intuitiva e poderosa para empresas do ramo de limpeza. Utiliza tecnologias como React, Express e MongoDB para entregar performance, segurança e escalabilidade.",
  },
  {
    title: "BioVerse",
    description:
      "Plataforma interativa para o ensino de Biologia, com quizzes e conteúdo visual dinâmico.",
    image: "/projects/bioverse.png",
    tags: ["React", "TypeScript", "Vite", "TailwindCSS"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "O BioVerse é uma aplicação educacional pensada para tornar o aprendizado de Biologia mais intuitivo e envolvente. Com quizzes, explicações interativas e um design limpo, a plataforma é ideal para estudantes do ensino médio e vestibulandos que buscam fixar o conteúdo de forma prática. Desenvolvido com React, TypeScript e Tailwind, o projeto pode ser expandido com novas disciplinas e funcionalidades gamificadas.",
  },
  {
    title: "Pet-Mania",
    description:
      "Site institucional para petshop, com foco em identidade visual e usabilidade.",
    image: "/projects/petshop.png",
    tags: ["React", "TypeScript", "Vite", "TailwindCSS"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "O Pet-Mania é um site moderno criado para apresentar os serviços e diferenciais de um petshop. Com um layout responsivo e visual atrativo, permite que os usuários conheçam melhor o negócio, seus produtos e formas de contato. Ideal para estabelecimentos que desejam fortalecer a presença digital e atrair mais clientes.",
  },
  {
    title: "Engineering",
    description:
      "Website institucional para empresa de engenharia, destacando serviços e portfólio.",
    image: "/projects/engineering.png",
    tags: ["React", "TypeScript", "TailwindCSS"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "Este projeto foi desenvolvido para apresentar uma empresa de engenharia de forma profissional e clara. Com foco em destacar os serviços oferecidos e o portfólio de obras, o site proporciona uma navegação fluida e uma estética moderna, sendo ideal para converter visitantes em clientes.",
  },
  {
    title: "Pack-Go",
    description:
      "Site profissional para transportadora, com foco em apresentação de serviços e contato rápido.",
    image: "/projects/pack-go.png",
    tags: ["React", "TypeScript", "Vite", "TailwindCSS"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "O Pack-Go é uma solução digital criada para empresas de transporte e logística que desejam divulgar seus serviços online. Com um visual confiável e estrutura bem organizada, o site facilita a compreensão dos serviços e incentiva o contato com a empresa. Totalmente responsivo, é ideal para aumentar a credibilidade e atrair novos clientes.",
  },
  {
    title: "Anime-Hub",
    description:
      "Dashboard para descobrir, acompanhar e favoritar animes com facilidade.",
    image: "/projects/anime-hub.png",
    tags: ["React", "Vite", "TailwindCSS"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "O Anime-Hub é uma plataforma moderna para fãs de anime que desejam explorar novas obras, salvar favoritos e acompanhar suas preferências em um painel visual limpo. A aplicação pode ser integrada com APIs como Jikan ou Anilist para fornecer dados atualizados sobre temporadas, episódios e personagens. Um espaço perfeito para organizar seus animes favoritos com praticidade.",
  },
  {
    title: "Movie-Hub",
    description:
      "Aplicação para explorar, buscar e salvar filmes favoritos com visual atraente.",
    image: "/projects/movie-hub.png",
    tags: ["React", "Vite", "TailwindCSS"],
    demoUrl: "#",
    githubUrl: "#",
    longDescription:
      "O Movie-Hub é uma plataforma completa para os amantes de cinema. Permite buscar filmes por nome, visualizar trailers, ler sinopses e adicionar favoritos em uma interface fluida e responsiva. Ideal para quem quer montar uma lista personalizada e ter acesso rápido aos seus títulos preferidos, com possibilidade de integração futura a APIs de cinema.",
  },
  {
    title: "To-Do List",
    description:
      "Lista de tarefas intuitiva com recursos de adição, edição e conclusão de atividades.",
    image: "/projects/todolist.png",
    tags: ["HTML", "CSS", "JavaScript", "Sass"],
    demoUrl: "https://matheusalmeida700.github.io/To-Do-List/",
    githubUrl: "https://github.com/matheusAlmeida700/To-Do-List",
    longDescription:
      "Essa aplicação front-end foi desenvolvida para ajudar usuários a organizarem suas tarefas diárias de forma simples e eficiente. Com funcionalidades de adicionar, editar, concluir e excluir atividades, ela também oferece design responsivo e estrutura clara. É um exemplo prático de manipulação do DOM com JavaScript puro, ideal para demonstrar habilidades em projetos dinâmicos.",
  },
];

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

              <DialogContent
                className="w-[90vw] max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-muted
 max-w-[1000px]"
              >
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

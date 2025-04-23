import { useRef } from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="neon-text">Sobre</span> Mim
        </motion.h2>

        <div
          ref={textRef}
          className="relative glassmorphism p-4 rounded-xl overflow-hidden"
        >
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg md:text-md text-gray-200 leading-relaxed mb-6">
              Desde os 12 anos, a tecnologia deixou de ser apenas uma
              curiosidade e se tornou uma verdadeira paixão. Comecei a criar
              aplicativos e jogos simples, movido pelo desejo de entender o que
              acontece por trás da tela — e hoje, transformo essa paixão em
              código com impacto.
            </p>

            <p className="text-lg md:text-md text-gray-200 leading-relaxed">
              Minha jornada me levou por diversas linguagens, frameworks e
              paradigmas, cada um acrescentando novas dimensões ao meu
              entendimento sobre desenvolvimento de software. Acredito em criar
              soluções que sejam não apenas tecnicamente sólidas, mas também
              intuitivas e acessíveis aos usuários.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <Stat value="4+" label="Anos de Experiência" />
              <Stat value="30+" label="Projetos Finalizados" />
              <Stat value="10+" label="Tecnologias" />
              <Stat value="∞" label="Aprendizado Contínuo" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => {
  return (
    <motion.div
      className="text-center p-4"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-3xl md:text-4xl font-bold neon-purple-text mb-2">
        {value}
      </h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </motion.div>
  );
};

export default AboutSection;

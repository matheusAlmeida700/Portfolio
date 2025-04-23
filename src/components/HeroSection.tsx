import { useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import ComputersCanvas from "./canvas/Computer";
import ParticlesCanvas from "./canvas/ParticlesCanvas";

const HeroSection = () => {
  return (
    <section id="home" className="relative w-full h-screen mx-auto">
      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto sm:px-16 px-6 flex flex-row items-start gap-5">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-60 h-40 bg-gradient-to-b from-purple-700 to-purple-600/10" />
        </div>
        <div>
          <h3 className="font-black lg:text-[30px] sm:text-[20px] xs:text-[10px] text-[10px] lg:leading-[58px] text-white">
            <span className="text-[#915EFF]">
              <TypeAnimation
                sequence={[
                  "Dev Full-Stack",
                  2500,
                  "Clean Code",
                  2500,
                  "Apaixonado por tecnologia",
                  2500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h3>
          <h1 className="font-black lg:text-[70px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] text-white">
            Olá, Eu sou o <span className="text-[#915EFF]">Matheus</span>
          </h1>

          <p className="text-[#dfd9ff] font-medium lg:text-[25px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] text-white-100">
            Desenvolvo aplicaçãoes full-stack com foco em{" "}
            <br className="sm:block hidden" />
            qualidade e usabilidade.
          </p>
        </div>
      </div>

      <ParticlesCanvas />
      <ComputersCanvas />

      <div className="absolute bottom-20 left-20">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-3 border-white/90 flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-white/80 mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

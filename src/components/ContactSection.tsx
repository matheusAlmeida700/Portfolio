import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import ContactGrid from "./canvas/ContactGrid";
import { Github, Linkedin, Mail, MapPin, PhoneIcon } from "lucide-react";

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [activeInput, setActiveInput] = useState<string | null>(null);
  const controls = useAnimation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    controls.start({
      scale: [1, 0.98, 1],
      transition: { duration: 0.3 },
    });

    console.log("Form submitted:", formState);

    setFormState({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-20 relative overflow-hidden"
    >
      <ContactGrid />

      <div className="container mx-auto px-4 z-10 relative">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Entre em <span className="neon-text">Contato</span>
        </motion.h2>

        <motion.p
          className="text-lg text-center max-w-2xl mx-auto mb-16 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Tem um projeto em mente ou gostaria de colaborar? Entre em contato
          para que possamos conversar
        </motion.p>

        <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
          {/* Contact form */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            animate={controls}
          >
            <form
              onSubmit={handleSubmit}
              className="glassmorphism rounded-xl p-8"
            >
              <div className="mb-6 relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Nome
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    onFocus={() => setActiveInput("name")}
                    onBlur={() => setActiveInput(null)}
                    className="w-full bg-gray-500/10 backdrop-blur-sm rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                  {activeInput === "name" && (
                    <motion.div
                      className="absolute inset-0 rounded-lg -z-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              </div>

              <div className="mb-6 relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    onFocus={() => setActiveInput("email")}
                    onBlur={() => setActiveInput(null)}
                    className="w-full bg-gray-500/10 backdrop-blur-sm rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300"
                    placeholder="john.doe@example.com"
                    required
                  />
                  {activeInput === "email" && (
                    <motion.div
                      className="absolute inset-0 rounded-lg border border-future-neon -z-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              </div>

              <div className="mb-6 relative">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Mensagem
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    onFocus={() => setActiveInput("message")}
                    onBlur={() => setActiveInput(null)}
                    rows={5}
                    className="w-full bg-gray-500/10 backdrop-blur-sm rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 resize-none"
                    placeholder="Me conte sobre seu projeto..."
                    required
                  />
                  {activeInput === "message" && (
                    <motion.div
                      className="absolute inset-0 rounded-lg border border-future-neon -z-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-future-neon to-future-purple text-white font-medium rounded-lg hover:from-future-purple hover:to-future-neon cursor-pointer transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Enviar Mensagem</span>
                <motion.div
                  className="absolute inset-0 -z-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glassmorphism rounded-xl p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 neon-purple-text">
                  Contato
                </h3>
                <p className="text-gray-300 mb-8">
                  Preparado para iniciar seu próximo projeto ou tem dúvidas
                  sobre meu trabalho? Me envie uma mensagem e responderei assim
                  que possível.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-future-dark flex items-center justify-center mr-4">
                      <Mail />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">
                        matheus.almeida.dev2024@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-future-dark flex items-center justify-center mr-4">
                      <MapPin />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Localização</p>
                      <p className="text-white">Sorocaba, São Paulo</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-sm text-gray-400 mb-4">Entre em contato</p>
                <div className="flex space-x-4">
                  <SocialButton icon="github" />
                  <SocialButton icon="linkedin" />
                  <SocialButton icon="phone" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SocialButton = ({ icon }: { icon: string }) => {
  return (
    <motion.a
      href="#"
      className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white hover:bg-white hover:text-black transition-colors duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="text-future-purple group-hover:text-future-neon transition-colors duration-300">
        {icon === "github" && <Github />}
        {icon === "linkedin" && <Linkedin />}
        {icon === "phone" && <PhoneIcon />}
      </span>
    </motion.a>
  );
};

export default ContactSection;

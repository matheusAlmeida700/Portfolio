import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Menu, X } from "lucide-react";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", title: "Sobre" },
    { id: "skills", title: "Habilidades" },
    { id: "projects", title: "Projetos" },
    { id: "timeline", title: "Linha do Tempo" },
    { id: "contact", title: "Contato" },
  ];

  return (
    <nav
      className={`sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 transition-colors duration-300 ${
        scrolled ? "bg-slate-900/80" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <Loader2 className="w-6 h-6 text-white" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex gap-1">
            {"<"}Matheus
            <span className="sm:block hidden">
              {" "}
              | Full Stack Developer {"/>"}
            </span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-white/80"
              } hover:text-white underline-hover font-medium cursor-pointer transition-colors`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex justify-end items-center">
          {toggle ? (
            <X
              className="w-7 h-7 text-white cursor-pointer"
              onClick={() => setToggle(false)}
            />
          ) : (
            <Menu
              className="w-7 h-7 text-white cursor-pointer"
              onClick={() => setToggle(true)}
            />
          )}

          <div
            className={`${
              toggle ? "flex" : "hidden"
            }  black-gradient absolute top-15 right-0 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="p-4 list-none flex flex-col gap-4 bg-slate-900/80">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium text-xl cursor-pointer underline-hover ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

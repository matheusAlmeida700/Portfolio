import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "/logo.png";
import BackgroundMusic from "../assets/audio/lofi-streets.mp3";
import { navLinks } from "@/constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <nav
      className={`sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 transition-colors duration-300 ${
        scrolled ? "bg-black/80" : "bg-transparent"
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
          <img className="w-10 rounded-full" src={Logo} alt="" />
          <p className="text-[18px] font-bold cursor-pointer flex gap-1 text-white">
            Matheus
            <span className="sm:block hidden text-[#915EFF]">
              | Full-Stack Developer
            </span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
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

          <button
            onClick={toggleMusic}
            className="relative flex justify-center items-center w-11 h-11 rounded-full border-2 border-white opacity-80 hover:opacity-100 transition-opacity"
          >
            <div className="flex items-center gap-1">
              <div
                className={`w-1 h-4.5 bg-white rounded-lg transform transition-all ${
                  isPlaying ? "animate-equalizer1" : ""
                }`}
              ></div>
              <div
                className={`w-1 h-3 bg-white rounded-lg transform transition-all ${
                  isPlaying ? "animate-equalizer2" : ""
                }`}
              ></div>
              <div
                className={`w-1 h-4.5 bg-white rounded-lg transform transition-all ${
                  isPlaying ? "animate-equalizer3" : ""
                }`}
              ></div>
              <div
                className={`w-1 h-3 bg-white rounded-lg transform transition-all ${
                  isPlaying ? "animate-equalizer4" : ""
                }`}
              ></div>
            </div>
          </button>

          <audio ref={audioRef} src={BackgroundMusic} loop preload="auto" />
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

          <button
            onClick={toggleMusic}
            className="relative flex justify-center items-center w-11 h-11 ml-4 rounded-full border-2 border-white opacity-80 hover:opacity-100 transition-opacity"
          >
            <div className="flex items-center gap-1">
              <div
                className={`w-1 h-4.5 bg-white rounded-lg transform transition-all ${
                  isPlaying ? "animate-equalizer1" : ""
                }`}
              ></div>
              <div
                className={`w-1 h-3 bg-white rounded-lg transform transition-all ${
                  isPlaying ? "animate-equalizer2" : ""
                }`}
              ></div>
              <div
                className={`w-1 h-4.5 bg-white rounded-lg transform transition-all ${
                  isPlaying ? "animate-equalizer3" : ""
                }`}
              ></div>
              <div
                className={`w-1 h-3 bg-white rounded-lg transform transition-all ${
                  isPlaying ? "animate-equalizer4" : ""
                }`}
              ></div>
            </div>
          </button>

          <div
            className={`${
              toggle ? "flex" : "hidden"
            }  black-gradient absolute top-20 right-0 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="p-4 list-none flex flex-col gap-4 bg-black/80">
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

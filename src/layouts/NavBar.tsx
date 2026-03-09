import { useState, useRef } from "react";
import Logo from "../components/Logo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { navLinks } from "../components/constants/constants";
import { NavLinkItem } from "../components/NavLinkItem";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const burgerWrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<GSAPTimeline | null>(null);

  const isMobile = window.innerWidth <= 768;

  useGSAP(() => {
    // Initial state
    gsap.set(menuRef.current, { x: isMobile ? "100%" : "120%" });

    // =========================
    // MENU TIMELINE
    // =========================
    timeline.current = gsap
      .timeline({ paused: true })
      .to(menuRef.current, {
        x: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });

    // =========================
    // NAVBAR SCROLL ANIMATION
    // =========================
    
    // Logo shrink
    gsap.to(logoRef.current, {
      x: -100,
      duration: 0.6,
      ease: "power2.in",
      scrollTrigger: {
        trigger: document.body,
        start: "top -80",
        toggleActions: "play none none reverse",
      },
    });

    // Burger background animation
    gsap.to(burgerWrapperRef.current, {
      backgroundColor: isOpen?"#18181b":"#ffffff",
      borderRadius: "9999px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      padding: "10px",
      duration: .6,
      ease: "elastic",
      scrollTrigger: {
        trigger: document.body,
        start: "top -80",
        toggleActions: "play none none reverse",
      },
    });

    // =========================
    // Hide on scroll down
    // =========================
    const nav = navRef.current;
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 120) {
          gsap.to(nav, { y: -100, duration: 0.35, ease: "power2.out" });
        } else {
          gsap.to(nav, { y: 0, duration: 0.35, ease: "power2.out" });
        }
      },
    });
  });

  const toggleMenu = () => {
    if (!timeline.current) return;
     // Add a slight delay for smoother transition
    if (isOpen) {
      timeline.current.delay(1.6);
      timeline.current.reverse();
    } else {
      timeline.current.play();
    }

    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav
        ref={navRef}
        className="flex justify-between items-center px-6 h-[88px] transition-all bg-transparent"
      >
        <div ref={logoRef} className="transition-all">
          <Logo />
        </div>

        <div
          ref={burgerWrapperRef}
          className={`relative z-30 transition-all duration-300 rounded-full ${isOpen ? "bg-none" : "bg-none"}`}
        >
          <button
            className="relative flex flex-col gap-1.5"
            onClick={toggleMenu}
          >
            <div
              className={`w-7 h-[2px] transition-all duration-500 ${
                isOpen && scrollY < 20
                  ? "rotate-45 translate-y-[8px] bg-white"
                  : (scrollY > 20 && isOpen) ? "bg-black rotate-45 translate-y-[4px]" : "bg-black"
              }`}
            />
            <div
              className={`w-7 h-[2px] transition-all duration-500 ${
                isOpen && scrollY < 20 ? "-rotate-45 bg-white" : (scrollY > 20 && isOpen) ? "bg-black -rotate-45 -translate-y-[4px]" : "bg-black"
              }`}
            />
          </button>
        </div>

        {/* Slide Menu */}
        <div
          ref={menuRef}
          className="fixed top-0 text-thin text-left right-0 h-screen w-full md:w-[30%] bg-black text-white flex flex-col justify-center items-center gap-8 text-3xl"
        >
          {navLinks.map((link, index) => (
            <NavLinkItem
              key={index}
              label={link.label}
              href={link.href}
              onClick={toggleMenu}
            />
          ))}
        </div>
      </nav>
    </header>
  );
}


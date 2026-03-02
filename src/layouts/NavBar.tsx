import { useState, useRef } from "react";
import Logo from "../components/Logo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { navLinks } from "../components/constants/constants";
import { NavLinkItem } from "../components/NavLinkItem";

export function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Changed to false
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useRef<GSAPTimeline | null>(null);
  const linkRef1 = useRef<HTMLAnchorElement>(null);
  const linkRef2 = useRef<HTMLAnchorElement>(null);
  const burgerRef1 = useRef<HTMLDivElement>(null);
  const burgerRef2 = useRef<HTMLDivElement>(null);
  const b = useRef<GSAPTween | null>(null);
  const isMobile = window.innerWidth <= 768; // Simple check for mobile devices
  

  useGSAP(() => {
    gsap.set(menuRef.current, { x: isMobile?"100%":"340%" });
    // gsap.set([linkRef1.current,linkRef2.current], {
    //   autoAlpha: 0,
    //   x: 20,
    // });

    t.current = gsap
      .timeline({ paused: true })
      .to(menuRef.current, {
        x: isMobile? 0 : "250%",
        duration: 1,
        ease: "power1.inOut",
      })
      .to(linkRef1.current, {
        autoAlpha: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      },
      "<+0.7"
      )
      .to(linkRef2.current, {
        autoAlpha: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      },
      "<+0.2"
      )
  })

  const toggleMenu = () => {
    if (t.current) {
      if (isOpen) {
        t.current.reverse();
      } else {
        t.current.play();
      }
    }
    setIsOpen(!isOpen);
  }

  return (
    <header className="block fixed top-0 inset-0 min-w-screen h-fit z-50 bg-background/80 backdrop-blur border-b">
      <nav className="z-40 fixed w-full flex flex-row justify-between items-center p-6">
        <Logo />
        {/* Burger menu */}
        <button 
          className="relative z-50 flex flex-col gap-1.5 cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div
           className={`w-8 h-1 transition-all duration-1000 ${
            isOpen ? 'rotate-45 translate-y-2.5 bg-white' : 'bg-black'
          }`}></div>
           <div className={`w-8 h-1 transition-all duration-1000 ${
            isOpen ? '-rotate-45 bg-white' : 'bg-black'
          }`}></div>
        </button>
        
        {/* mobile menu */}
        <div 
          className="absolute top-0 left-0 min-h-svh w-screen md:w-[30%] bg-black backdrop-blur text-6xl flex flex-col gap-7 font-thin items-center justify-center md:justify-center md:items-start md:px-5 "
          ref={menuRef}
          onClick={toggleMenu}
        >
          {
            navLinks.map((link, index) => (
              <NavLinkItem 
                key={index} 
                label={link.label} 
                href={link.href} 
                onClick={toggleMenu} 
              />
            ))
          }
        </div>
      </nav>
    </header>
  );
}
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Statue from "../components/3dStatue";
import { useRef, useEffect } from "react";
import { sharedProgress } from "../components/constants/constants";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Shared scroll progress — single source of truth\
gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const iconStyle =
    "p-2 w-12 h-12 text-primary border-4 border-primary rounded-lg hover:bg-gray-100 transition-colors";

  const statueRef = useRef<HTMLDivElement>(null);
  const gaucheRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const seeRef = useRef<HTMLDivElement>(null);
  const togetherRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isLockedRef = useRef(true); // locked = animations not done yet
  const isMobile = window.innerWidth < 768;

  // =============================
  // GSAP TIMELINE SETUP
  // =============================
  useGSAP(() => {
    if (!gaucheRef.current) return;
    if (isMobile) return;

    const tl = gsap.timeline({ paused: true, onComplete: () => {tl.kill()} });
    const name = gsap.utils.toArray(".name");

    tl.to(gaucheRef.current, {
      x: "0%",
      ease: "power2.inOut",
    })
      .to(
        name,
        {
          x: "200%",
          right: -200,
          stagger: -0.1,
          ease: "power2.inOut",
        },
        "<"
      )
      .from(
        gaucheRef.current.children,
        {
          x: "-100%",
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.4")

        .fromTo(seeRef.current, 
          { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, 
          { 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
            duration: 0.1, 
            ease: "power2.inOut" ,
            scrub:2
          }
        );

    timelineRef.current = tl;

  }, []);

  // =============================
  // WHEEL HANDLER — single listener
  // =============================
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!statueRef.current) return;

      const rect = statueRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > window.innerHeight;
      if (!inView) return;

      const progress = sharedProgress.value;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Animation not yet complete
      let animationActive =
        (scrollingDown && progress < 0.99) || (scrollingUp && progress > 0.01);

      if ( progress == 0.99 ) {
        animationActive = false;
      }

      if (animationActive) {
        e.preventDefault();

        sharedProgress.target += e.deltaY * 0.0003;
        sharedProgress.target = gsap.utils.clamp(0, 1, sharedProgress.target);
        isLockedRef.current = true;
      } else{
        isLockedRef.current = false;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // =============================
  // SMOOTH SCRUB LOOP — drives Hero timeline from sharedProgress
  // =============================
  useEffect(() => {
    const update = () => {
      // Smooth lerp toward target
      sharedProgress.value +=
        (sharedProgress.target - sharedProgress.value) * 0.09;

      // Drive Hero's own timeline
      if (timelineRef.current) {
        timelineRef.current.progress(sharedProgress.value);
      }
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  // =============================
  // JSX
  // =============================
  return (
    <section
    id="hero"
      ref={sectionRef}
      className="
      relative 
      w-full
      flex 
      flex-col-reverse 
      inset-0 
      z-30 
      min-h-screen 
      max-h-screen
      xs:items-start 
      xs:justify-end 
      justify-between
      xs:pt-20 
      py-10
      px-4
      overflow-hidden
      md:pt-0  
      md:px-10 
      md:flex 
      md:flex-row 
      md:mt-14 
      md:justify-between 
      md:items-center
      max-w-full 
      mx-auto
      "
    >
      {/* LEFT SIDE */}
      <div
        ref={gaucheRef}
        className="relative z-40 md:h-screen w-full gap-7 xs:gap-10 mt-5 md:w-1/2 flex flex-col lg:gap-10 md:mt-5 xl:mt-20 xl:my-auto"
      > 
        <div>
          <p className="xl:text-3xl">Hi, I'm <span className="italic font-semibold">Jonathan</span> Andria</p>
          <h1 className="text-2xl xs:text-4xl md:text-5xl xl:text-6xl text-primary">
            <span className="font-semibold">Full-Stack</span> Web and Mobile
            Developer.
          </h1>
        </div>
        <h4 className="text-primary text-xl xs:text-3xl md:text-4xl xl:text-5xl relative">
          <span className="font-semibold relative z-20 mr-4"><div className="w-10 h-2 z-10 bg-red-500 relative bottom-2"></div>Creative</span>
           Web Designer.
        </h4>

        {/* SOCIALS */}
        <div>
          <h6 className="text-primary text-md xs:text-xl md:text-2xl mb-2">My socials:</h6>
          <div className="flex w-[10rem] justify-between">
            <a href="#" className={iconStyle}>
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a href="#" className={iconStyle}>
              <FaLinkedinIn className="w-6 h-6" />
            </a>
            <a href="#" className={iconStyle}>
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-1 w-full">
          <div className="flex group w-2/3 h-[50px] " ref={togetherRef}>
            <button
              className=" w-full h-full pointer-events-auto rounded-md group-hover:bg-red-500 transition-colors duration-700 bg-black px-2 text-white text-xl md:text-2xl xl:text-3xl"
              onClick={() => console.log("CTA clicked")}
            >
              Let's work together
            </button>
          </div>
          <div className="flex group w-1/3"
            ref={seeRef}
          >
            <span className="absolute z-10 inset-0 w-0 bg-black transition-all duration-500 ease-out group-hover:w-full"></span>
            <a
              href="#projects"
              className=" z-20 flex items-center justify-center w-full rounded-md h-full pointer-events-auto group-hover:text-white border-2 border-black transition-all duration-700 px-2 text-md md:text-2xl"
              onClick={() => console.log("CTA clicked")}
            >
              See my work
            </a>
          </div>
        </div>
        
      </div>

      {/* STATUE LAYER */}
      <div
        ref={statueRef}
        className="z-10 md:h-full w-full md:absolute md:inset-0 overflow-visible md:flex flex flex-col justify-end pointer-events-none "
      >
        {/* <h2 className="name relative text-6xl md:text-9xl left-16 top-20 md:top-0 md:right-32 md:bottom-10">J</h2> */}
        <div className="pointer-events-auto min-w-screen overflow-visible">
          <Statue />
        </div>
        {/* <h2 className="name relative text-6xl left-72  md:text-9xl md:left-36">
          A<span className="text-red-500">.</span>
        </h2> */}
      </div>
    </section>
  );
}

export default Hero;

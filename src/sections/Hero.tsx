import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Statue from "../components/3dStatue";
import { useRef, useEffect } from "react";
import Skills from "./Skills";
import { sharedProgress } from "../components/constants/constants";
import { TbLabel } from "react-icons/tb";

// Shared scroll progress — single source of truth

function Hero() {
  const iconStyle =
    "p-2 w-12 h-12 text-primary border-4 border-primary rounded-lg hover:bg-gray-100 transition-colors";

  const statueRef = useRef<HTMLDivElement>(null);
  const gaucheRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
        "-=0.4");

    timelineRef.current = tl;
  }, []);

  // =============================
  // WHEEL HANDLER — single listener
  // =============================
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!statueRef.current) return;

      const rect = statueRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      const progress = sharedProgress.value;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Animation not yet complete
      const animationActive =
        (scrollingDown && progress < 0.99) || (scrollingUp && progress > 0.01);

      if (animationActive) {
        e.preventDefault();

        sharedProgress.target += e.deltaY * 0.0003;
        sharedProgress.target = gsap.utils.clamp(0, 1, sharedProgress.target);
        isLockedRef.current = true;
      } else if (scrollingDown && progress >= 0.99) {
        // Animations complete — unlock and let browser scroll naturally
        isLockedRef.current = false;
        if(timelineRef.current) timelineRef.current.clear()
        // Don't preventDefault() → browser scrolls down naturally
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
      className="relative z-30 min-h-screen w-full md:overflow-visible px-6 md:px-10 flex md:flex-row md:mt-14 justify-between items-center flex-col-reverse"
    >
      {/* LEFT SIDE */}
      <div
        ref={gaucheRef}
        className="relative z-40 h-screen w-full md:w-1/2 flex flex-col gap-10 lg:gap-10 justify-center md:justify-start md:mt-5"
      >
        <h2 className="text-4xl md:text-5xl text-primary">
          <span className="font-semibold">Full-Stack</span> Web and Mobile
          Developer.
        </h2>

        <h4 className="text-primary text-3xl md:text-4xl relative">
          <span className="font-semibold relative z-20">Creative</span>
          Web Designer.
        </h4>

        {/* SOCIALS */}
        <div>
          <h6 className="text-primary text-xl md:text-2xl mb-2">My socials:</h6>
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
        <div className="flex group">
          <button
            className="pointer-events-auto group-hover:bg-red-500 transition-colors duration-700 bg-black p-4 text-white text-xl md:text-2xl"
            onClick={() => console.log("CTA clicked")}
          >
            Let's work together
          </button>
        </div>
      </div>

      {/* STATUE LAYER */}
      <div
        ref={statueRef}
        className="z-10 md:h-full w-full absolute inset-0 overflow-hidden flex justify-center items-center pointer-events-none"
      >
        <h2 className="name relative text-9xl right-32 bottom-10">J</h2>
        <div className="pointer-events-auto min-w-screen">
          <Statue />
        </div>
        <h2 className="name relative text-9xl left-36">
          A<span className="text-red-500">.</span>
        </h2>
      </div>
    </section>
  );
}

export default Hero;
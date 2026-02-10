import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Statue from "../components/3dStatue";
import { useRef, useEffect } from "react";

function Hero() {
  const iconStyle =
    "p-2 w-12 h-12 text-primary border-4 border-primary rounded-lg hover:bg-gray-100 transition-colors";

  const statueRef = useRef<HTMLDivElement>(null);
  const gaucheRef = useRef<HTMLDivElement>(null);

  const targetProgress = useRef(0);
  const progressRef = useRef({ value: 0 });
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // --- GSAP setup ---
  useGSAP(() => {
    if (!gaucheRef.current) return;

    const tl = gsap.timeline({ paused: true });
    const name = gsap.utils.toArray(".name");

    gsap.set(gaucheRef.current, { x: "-105%" });

    tl.to(gaucheRef.current, {
      x: "0%",
      duration: 1,
      ease: "power2.inOut",
    })
    .to(name, {
      x: "200%",
      right: -200,
      stagger: -0.1,
      duration: 1.6,
      ease: "power2.inOut",
    }, "<")
    .from(
      gaucheRef.current.children,
      {
        x: "-100%",
        stagger: 0.15,
        duration: .6,
        ease: "power2.out",
      },
      "-=0.4" // overlap avec le slide
    )
    .to(gaucheRef.current, {
      x: "-105%",
      duration: 1,
      ease: "power2.inOut",
    })
    .to(name, {
      y: 200,
      autoAlpha: 0,
      stagger: -0.1,
      duration: .6,
      ease: "power2.inOut",
    }, "<")
    .to(gaucheRef.current, {
      x: "56%",
      duration: 1,
      ease: "power2.inOut",
    })

    timelineRef.current = tl;

    const handleWheel = (e: WheelEvent) => {
      // only react if hero is visible
      if (!statueRef.current) return;

      const rect = statueRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (!inView) return;

      e.preventDefault();

      targetProgress.current += e.deltaY * 0.0003;
      targetProgress.current = Math.max(
        0,
        Math.min(1, targetProgress.current)
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // --- Smooth animation loop using GSAP ticker ---
  useEffect(() => {
    const update = () => {
      if (!timelineRef.current) return;

      progressRef.current.value +=
        (targetProgress.current - progressRef.current.value) * 0.1;

      timelineRef.current.progress(progressRef.current.value);
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <section className="relative z-20 min-h-screen w-full md:overflow-hidden px-6 md:px-10 flex md:flex-row md:mt-14 justify-between items-center flex-col-reverse">
      {/* LEFT SIDE */}
      <div
        className="h-screen w-full md:w-1/2 flex flex-col gap-10 justify-center md:justify-start md:mt-5"
        ref={gaucheRef}
      >
        <h2 className="text-4xl md:text-5xl text-primary">
          <span className="font-semibold">Full-Stack</span> Web and Mobile
          Developer.
        </h2>

        <h4 className="text-primary text-3xl md:text-4xl relative">
          <span className="font-semibold relative z-20">Creative</span>
          <div className="relative z-10 -top-3 w-8 h-2.5 bg-red-500"></div>
          Web Designer.
        </h4>

        <div>
          <h6 className="text-primary text-xl md:text-2xl mb-2">My socials:</h6>

          <div className="flex w-[10rem] justify-between">
            <a href="#" className={iconStyle} aria-label="Facebook">
              <FaFacebookF className="w-6 h-6" />
            </a>

            <a href="#" className={iconStyle} aria-label="LinkedIn">
              <FaLinkedinIn className="w-6 h-6" />
            </a>

            <a href="#" className={iconStyle} aria-label="Github">
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="flex">
          <button className="bg-black p-4 text-white text-xl md:text-2xl">
            Let's work together
          </button>
        </div>
      </div>

      {/* STATUE CENTER */}
      <div
        className="z-20 md:h-full w-full absolute inset-0 overflow-hidden flex flex-row justify-center items-center pointer-events-none"
        ref={statueRef}
      >
        <h2 className="name relative text-9xl right-32 bottom-10">J</h2>
        <div className="pointer-events-auto">
          <Statue />
        </div>
        <h2 className="name relative text-9xl left-36">A<span className="text-red-500">.</span></h2>
      </div>
    </section>
  );
}

export default Hero;

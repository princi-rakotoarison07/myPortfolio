import { useRef, useState,forwardRef, useImperativeHandle } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type ProjectCardGroup = {
  title: string;
  desc: string;
  stacks: string[];
  images: string[];
  category: "web" | "mobile" | "design";
}

type Props = {
  data: ProjectCardGroup[];
};

export type ProjectsCardHandle = {
  cards: HTMLDivElement[] | null;
}

const ProjectCard = forwardRef<ProjectsCardHandle, Props>(({ data }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // const StackContainerStyle =
  //   "group flex flex-col items-center bg-zinc-900 justify-center gap-3 p-4 rounded-md hover:border-black transition-all duration-300 aspect-square md:w-[120px]";
  // const StackStyle =
  //   "text-zinc-500 group-hover:text-white text-[12px] font-normal tracking-widest uppercase transition-colors duration-300 text-center leading-tight";
  
    useImperativeHandle(ref, () => ({
      cards: cardsRef.current,
  }));

  useGSAP(() => {
    if (!containerRef.current) return;

    // gsap.fromTo(
    //   containerRef.current.children,
    //   { opacity: 0, y: 100 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     duration: 1,
    //     stagger: 0.4,
    //     ease: "power3.out",
    //     scrollTrigger: {
    //       trigger: containerRef.current,
    //       start: "top 80%",
    //       end: "top 30%",
    //       scrub: 2,
    //     },
    //   }
    // );

    
    if (selectedImage && modalRef.current) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale:1, duration: 0.6 }
      );

      gsap.fromTo(
        ".fullscreen-image",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "auto";
    }

    
  const ctx = gsap.context(() => {
    const cards = cardsRef.current;

    cards.forEach((card) => {
      if (!card) return;

      gsap.set(card, {
        opacity: 0,
        y: 140,
        scale: 0.95,
        filter: "blur(8px)"
      });

      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });
    });
  }, containerRef);

  return ( () => ctx.revert());
  }, [data]);

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      transformOrigin: "left",
      duration: 0.6,
      onComplete: () => setSelectedImage(null),
    });
  };

  return (
    <>
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto"
      >
        {data.map((project, index) => (
          <div
            key={index}
            ref={(el) => { if (el) cardsRef.current[index] = el; }}
            className="bg-zinc-800 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={project.images[0]}
                alt={project.title}
                onClick={() => setSelectedImage(project.images[0])}
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition duration-500"
              />
            </div>
  
            {/* Content */}
            <div className="p-6 space-y-4 text-white">
              <h3 className="text-xl font-semibold">
                {project.title}
              </h3>
  
              <p className="text-zinc-400 text-sm leading-relaxed">
                {project.desc}
              </p>
  
              {/* Stacks */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.stacks.map((stack, i) => (
                  <span
                    key={i}
                    className="text-xs bg-zinc-700 px-3 py-1 rounded-full text-zinc-300"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
  
      {/* FULLSCREEN MODAL */}
      {selectedImage && (
        <div
          ref={modalRef}
          onClick={closeModal}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={selectedImage}
            className="fullscreen-image max-w-[90%] max-h-[90%] object-contain"
            alt="fullscreen"
          />
        </div>
      )}
    </>
  );
  
});

export default ProjectCard;

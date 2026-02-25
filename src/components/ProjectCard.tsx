import { useRef, useState,forwardRef, useImperativeHandle } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SvgList } from "./SvgList";

gsap.registerPlugin(ScrollTrigger);

export type ProjectCardGroup = {
  title: string;
  desc: string;
  stacks: string[];
  images: string[];
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const StackContainerStyle =
    "group flex flex-col items-center bg-zinc-900 justify-center gap-3 p-4 rounded-md hover:border-black transition-all duration-300 aspect-square md:w-[120px]";
  const StackStyle =
    "text-zinc-500 group-hover:text-white text-[12px] font-normal tracking-widest uppercase transition-colors duration-300 text-center leading-tight";
  
    useImperativeHandle(ref, () => ({
      cards: cardsRef.current,
  }));

  useGSAP(() => {
    // if (!containerRef.current) return;

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
        { opacity: 0, scale: 0 },
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
  }, []);

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale:0,
      duration: 0.6,
      onComplete: () => setSelectedImage(null),
    });
  };

  return (
    <>{
      data.map((project, index) => (
        <div
        key={index}
        ref={(el) => { if (el) cardsRef.current[index] = el; }}
        className="max-w-5xl max-h-screen w-full flex flex-col gap-16"
      >
        {/* Title */}
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold tracking-tight text-black">
            {project.title},
          </h2>
          <p className="text-black/70 leading-relaxed max-w-2xl">{project.desc}</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden shadow-lg" ref={emblaRef}>
            <div className="flex">
              {project.images.map((src, index) => (
                <div
                  key={index}
                  className="min-w-full flex items-center justify-center"
                >
                  <img
                    src={src}
                    alt={`projectImage${index + 1}`}
                    onClick={() => setSelectedImage(src)}
                    className="w-full h-[400px] object-cover cursor-pointer hover:opacity-80 transition"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="border border-black px-4 py-2 text-sm rounded-md hover:bg-black hover:text-white transition"
            >
              Prev
            </button>

            <button
              onClick={() => emblaApi?.scrollNext()}
              className="border border-black px-4 py-2 text-sm rounded-md hover:bg-black hover:text-white transition"
            >
              Next
            </button>
          </div>
        </div>

        {/* Stacks */}
        <ul className="grid grid-cols-4 md:flex md:flex-wrap gap-1">
          {project.stacks.map((stack, index) => (
            <SvgList
              styleCont={StackContainerStyle}
              style={StackStyle}
              key={index}
              skill={stack}
            />
          ))}
        </ul>
      </div>
      ))
    }

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

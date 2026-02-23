import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SvgList } from "./SvgList";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  title: string;
  desc: string;
  stacks: string[];
  images: string[];
};

function ProjectCard({ title, desc, stacks, images }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const StackContainerStyle =
    "group flex flex-col items-center bg-zinc-900 justify-center gap-3 p-4 border border-zinc-900/20 hover:border-black transition-all duration-300 aspect-square md:w-[120px]";
  const StackStyle =
    "text-zinc-500 group-hover:text-white text-[12px] font-normal tracking-widest uppercase transition-colors duration-300 text-center leading-tight";

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
  }, []);

  // Animate modal open
  useEffect(() => {
    if (selectedImage && modalRef.current) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      gsap.fromTo(
        ".fullscreen-image",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedImage]);

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setSelectedImage(null),
    });
  };

  return (
    <>
      <div
        ref={containerRef}
        className="max-w-5xl max-h-full w-full flex flex-col gap-10"
      >
        {/* Title */}
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold tracking-tight text-black">
            {title},
          </h2>
          <p className="text-black/70 leading-relaxed max-w-2xl">{desc}</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {images.map((src, index) => (
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
              className="border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition"
            >
              Prev
            </button>

            <button
              onClick={() => emblaApi?.scrollNext()}
              className="border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition"
            >
              Next
            </button>
          </div>
        </div>

        {/* Stacks */}
        <ul className="grid grid-cols-3 md:flex md:flex-wrap gap-1">
          {stacks.map((stack, index) => (
            <SvgList
              styleCont={StackContainerStyle}
              style={StackStyle}
              key={index}
              skill={stack}
            />
          ))}
        </ul>
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
}

export default ProjectCard;

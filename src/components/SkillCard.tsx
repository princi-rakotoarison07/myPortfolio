import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import { SvgList } from "./SvgList";

export type SkillGroup = {
  title: string;
  skills: string[];
};

type Props = {
  data: SkillGroup[];
};

export type SkillCardsHandle = {
  container: HTMLDivElement | null;
  cards: HTMLDivElement[];
};

const SkillCards = forwardRef<SkillCardsHandle, Props>(({ data }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const frontRef = useRef<HTMLDivElement>(null);
  const SkillContainerStyle = "group flex flex-col items-center justify-center gap-3 p-4 rounded-md border border-white/20 hover:border-white transition-all duration-300 aspect-square md:w-[120px]";
  const SkillStyle ="text-white/40 group-hover:text-white text-[12px] font-thin tracking-widest uppercase transition-colors duration-300 text-center leading-tight"
  useImperativeHandle(ref, () => ({
    container: containerRef.current,
    cards: cardsRef.current,
  }));

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 2,
        },
      }
    );
  })

  return (
    <div
      ref={containerRef}
      className="grid place-items-start w-full h-full relative"
    >
      {/* First group — FRONTEND */}
      <div
      ref={frontRef}
        className={`
          w-full
          h-full
          col-start-1
          row-start-1
          bg-zinc-900/50
          py-2
          transition
        `}
      >
        <h3 className=" text-7xl md:text-8xl mb-6 text-white font-thin">
          FRONTEND
        </h3>

        <ul className=" grid grid-cols-3 md:flex md:flex-wrap gap-2">
          {data[0].skills.map((skill, j) => (
            <SvgList styleCont={SkillContainerStyle} style={SkillStyle} key={j} skill={skill} />
          ))}
        </ul>
      </div>

      {/* Remaining groups */}
      {data.slice(1).map((group, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) cardsRef.current[index] = el;
          }}
          className={`
            w-full
            h-full
            col-start-1
            row-start-1
            bg-zinc-900
            transition
            border-t
            border-t-1
            border-t-white
          `}
        >
          <h3 className="text-7xl md:text-8xl font-thin mb-6 text-white">
            {group.title}
          </h3>

          <ul className="grid grid-cols-3 md:flex md:flex-wrap gap-2">
            {group.skills.map((skill, j) => (
              <SvgList styleCont={SkillContainerStyle} style={SkillStyle} key={j} skill={skill} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
});

export default SkillCards;
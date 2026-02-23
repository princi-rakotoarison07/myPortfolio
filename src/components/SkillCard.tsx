import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import { SvgList } from "./SvgList";
// import {
//   siReact,
//   siTypescript,
//   siTailwindcss,
//   siGreensock,
//   siFramer,
//   siNodedotjs,
//   siExpress,
//   siDjango,
//   siFlask,
//   siMongodb,
//   siPostgresql,
//   siMysql,
//   siFigma,
//   siCanvas,
//   // siAdobeillustrator,
//   siGit,
//   siDocker,
// } from "simple-icons";

// const skillIconMap: Record<string, { path: string }> = {
//   // Frontend
//   React: siReact,
//   "React Native": siReact,
//   TypeScript: siTypescript,
//   "Tailwind CSS": siTailwindcss,
//   GSAP: siGreensock,
//   "Framer Motion": siFramer,
//   // Backend
//   "Node.js": siNodedotjs,
//   Express: siExpress,
//   Django: siDjango,
//   Flask: siFlask,
//   // Databases
//   MongoDB: siMongodb,
//   PostgreSQL: siPostgresql,
//   MySQL: siMysql,
//   // Tools & Platforms
//   Figma: siFigma,
//   Canvas: siCanvas,
//   // "Adobe Illustrator": siAdobeillustrator,
//   Git: siGit,
//   Docker: siDocker,
// };

// function SkillCard({ skill }: { skill: string }) {
//   const icon = skillIconMap[skill];

//   return (
//     <li className="
//       group
//       flex flex-col items-center justify-center gap-3
//       p-4
//       border border-white/20
//       hover:border-white
//       transition-all duration-300
//       aspect-square
//       md:w-[120px]
//     ">
//       {icon ? (
//         <svg
//           role="img"
//           viewBox="0 0 24 24"
//           className="w-7 h-7 fill-white opacity-50 group-hover:opacity-100 transition-opacity duration-300"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d={icon.path} />
//         </svg>
//       ) : (
//         <span className="text-white/50 group-hover:text-white text-xl transition-colors duration-300">
//           •
//         </span>
//       )}
//       <span className="text-white/40 group-hover:text-white text-[12px] font-thin tracking-widest uppercase transition-colors duration-300 text-center leading-tight">
//         {skill.trim()}
//       </span>
//     </li>
//   );
// }

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
  const SkillContainerStyle = "group flex flex-col items-center justify-center gap-3 p-4 border border-white/20 hover:border-white transition-all duration-300 aspect-square md:w-[120px]";
  const SkillStyle ="text-white/40 group-hover:text-white text-[12px] font-thin tracking-widest uppercase transition-colors duration-300 text-center leading-tight"
  useImperativeHandle(ref, () => ({
    container: containerRef.current,
    cards: cardsRef.current,
  }));

  useGSAP(() => {
    if (!frontRef.current) return;
    gsap.from(frontRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 2,
      },
      yPercent: 10,
      duration: 0.8
    })
  })

  return (
    <div
      ref={containerRef}
      className="grid place-items-start w-full h-full"
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
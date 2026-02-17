import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
  } from "react";
  
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
  
  const SkillCards = forwardRef<SkillCardsHandle, Props>(
    ({ data }, ref) => {
      const containerRef = useRef<HTMLDivElement>(null);
      const cardsRef = useRef<HTMLDivElement[]>([]);
  
      useImperativeHandle(ref, () => ({
        container: containerRef.current,
        cards: cardsRef.current,
      }));
  
      return (
        <div
          ref={containerRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {data.map((group, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="
                bg-zinc-900
                border border-zinc-800
                rounded-xl
                p-6
                shadow-lg
                hover:scale-[1.03]
                transition
              "
            >
              <h3 className="text-lg font-semibold mb-4 text-white">
                {group.title}
              </h3>
  
              <ul className="space-y-2">
                {group.skills.map((skill, j) => (
                  <li
                    key={j}
                    className="
                      text-sm
                      text-zinc-400
                      hover:text-white
                      transition
                    "
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }
  );
  
  export default SkillCards;
  
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
          className="grid place-items-start w-full h-full"
        >
          <div
              className={`
                w-full
                h-full
                col-start-1
                row-start-1
                bg-zinc-900
                px-2
                py-2
                transition
              `}
            >
              <h3 className="text-8xl mb-4 text-white font-thin">
                FRONTEND
              </h3>
  
              <ul className="space-y-2">
                {data[0].skills.map((skill, j) => (
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
          {data.slice(1).map((group, index=1) => (
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
                px-2
              `}
            >
              <h3 className="text-8xl font-thin mb-4 text-white">
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
  
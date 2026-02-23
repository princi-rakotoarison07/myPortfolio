import {
    siReact,
    siTypescript,
    siTailwindcss,
    siGreensock,
    siFramer,
    siNodedotjs,
    siExpress,
    siDjango,
    siFlask,
    siMongodb,
    siPostgresql,
    siMysql,
    siFigma,
    siCanvas,
    si99designs,
    siGit,
    siDocker,
  } from "simple-icons";
const skillIconMap: Record<string, { path: string }> = {
    // Frontend
    React: siReact,
    "React Native": siReact,
    TypeScript: siTypescript,
    "Tailwind CSS": siTailwindcss,
    GSAP: siGreensock,
    "Framer Motion": siFramer,
    // Backend
    "Node.js": siNodedotjs,
    Express: siExpress,
    Django: siDjango,
    Flask: siFlask,
    // Databases
    MongoDB: siMongodb,
    PostgreSQL: siPostgresql,
    MySQL: siMysql,
    // Tools & Platforms
    Figma: siFigma,
    Canvas: siCanvas,
    "Adobe Illustrator": si99designs,
    Git: siGit,
    Docker: siDocker,
};

export function SvgList({ skill, styleCont, style }: { skill: string, styleCont: string ,style: string }) {
    const icon = skillIconMap[skill];
  
    return (
      <li className={styleCont}>
        {icon ? (
          <svg
            role="img"
            viewBox="0 0 24 24"
            className="w-7 h-7 fill-white opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <span className="text-white/50 group-hover:text-white text-xl transition-colors duration-300">
            •
          </span>
        )}
        <span className={style}>
          {skill.trim()}
        </span>
      </li>
    );
  }
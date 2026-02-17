// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// type Category = {
//   title: string;
//   skills: string[];
// };

// const data: Category[] = [
//   {
//     title: "Programming & Frameworks",
//     skills: ["React", "TypeScript", "Node.js (Express)", "Python"],
//   },
//   {
//     title: "Databases",
//     skills: ["Oracle", "MongoDB", "PostgreSQL", "MySQL"],
//   },
//   {
//     title: "UI / Tools & Workflow",
//     skills: ["Figma", "Adobe Illustrator", "Canvas", "Git", "Jira"],
//   },
// ];

// export default function Skills() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const titles = gsap.utils.toArray<HTMLElement>(".stack-title");
//       const lists = gsap.utils.toArray<HTMLElement>(".skills-list");

//       gsap.set(titles, { yPercent: 100, opacity: 0 });
//       gsap.set(lists, { opacity: 0, y: 40 });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top top",
//           end: `+=${data.length * 500}`,
//           scrub: true,
//           pin: true,
//         },
//       });

//       data.forEach((_, i) => {
//         const title = titles[i];
//         const list = lists[i];

//         tl.to(title, {
//           yPercent: 0,
//           opacity: 1,
//           duration: 0.5,
//         });

//         tl.to(
//           list,
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.4,
//           },
//           "<"
//         );

//         tl.to({}, { duration: 0.6 });

//         if (i !== data.length - 1) {
//           tl.to(title, {
//             yPercent: -100,
//             opacity: 0,
//             duration: 0.5,
//           });

//           tl.to(
//             list,
//             {
//               opacity: 0,
//               y: -40,
//               duration: 0.4,
//             },
//             "<"
//           );
//         }
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="relative h-screen overflow-hidden bg-neutral-50 text-neutral-900"
//     >
//       <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
//         {data.map((cat, i) => (
//           <div
//             key={i}
//             className="absolute flex flex-col items-center text-center"
//           >
//             <h2 className="stack-title text-3xl md:text-5xl font-bold mb-8">
//               {cat.title}
//             </h2>

//             <div className="skills-list flex flex-wrap justify-center gap-3 max-w-2xl">
//               {cat.skills.map((skill, idx) => (
//                 <div
//                   key={idx}
//                   className="
//                     px-4 py-2
//                     rounded-full
//                     border border-neutral-300
//                     bg-white
//                     shadow-sm
//                     hover:bg-neutral-100
//                     transition
//                   "
//                 >
//                   {skill}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Skill logos as inline SVG strings ────────────────────────────────────────
const LOGOS: Record<string, string> = {
  React: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#61DAFB"><circle cx="12" cy="12" r="2.05"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.2" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.2" fill="none" transform="rotate(120 12 12)"/></g></svg>`,
  TypeScript: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="3" fill="#3178C6"/><path d="M13.5 12.5H16V11H10v1.5h2.5V19H13.5V12.5z" fill="white"/><path d="M17 14.75c0-.9.7-1.5 1.8-1.5.5 0 1 .1 1.4.3v1.4c-.3-.2-.7-.3-1.1-.3-.5 0-.8.2-.8.6 0 .9 2.2.6 2.2 2.4 0 1-.8 1.6-1.9 1.6-.6 0-1.1-.15-1.5-.4v-1.45c.35.25.8.4 1.2.4.55 0 .85-.2.85-.6 0-1-2.2-.65-2.2-2.45z" fill="white"/></svg>`,
  "Node.js (Express)": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.85L2 7.27v9.46L12 22.15l10-5.42V7.27L12 1.85zm0 2.3l7.5 4.07-7.5 4.06-7.5-4.06L12 4.15zM3.5 8.9l7.5 4.07v8.12l-7.5-4.07V8.9zm9.5 12.19V12.97l7.5-4.07v8.12l-7.5 4.07z" fill="#6BBF47"/></svg>`,
  Python: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.9 2C9.1 2 7 3.1 7 5v2h5v.5H5.5C3.6 7.5 2 9.1 2 11.5c0 2.3 1.5 4 3.5 4H7v-2.5c0-2 2-3 5-3s5 1 5 3V17h1.5c2 0 3.5-1.7 3.5-4 0-2.4-1.6-4-3.5-4H17V7c0-1.9-2.1-5-5.1-5zM10 4.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#3776AB"/><path d="M17 13v2.5c0 2-2 3-5 3s-5-1-5-3V13H5.5C3.5 13 2 14.7 2 17c0 2.3 1.6 5 3.5 5H7v-2h-.5c-1 0-2-1-2-2.5.1.5 1 1 2 1H17c2 0 3.5-1.7 3.5-4 0-2.4-1.6-4-3.5-4H17zm-3 6.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#FFD43B"/></svg>`,
  Oracle: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 5a7 7 0 0 0 0 14h8a7 7 0 0 0 0-14H8zm0 2h8a5 5 0 0 1 0 10H8a5 5 0 0 1 0-10z" fill="#F80000"/></svg>`,
  MongoDB: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C9 7 7.5 10 7.5 13a4.5 4.5 0 0 0 4 4.47V22h1v-4.53A4.5 4.5 0 0 0 16.5 13C16.5 10 15 7 12 2zm0 13.5a2 2 0 0 1-2-2c0-1.2.7-2.4 2-4.3 1.3 1.9 2 3.1 2 4.3a2 2 0 0 1-2 2z" fill="#47A248"/></svg>`,
  PostgreSQL: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zm0 2a7 7 0 0 1 6.93 6H17.5a5.5 5.5 0 0 0-11 0H5.07A7 7 0 0 1 12 5zm-3 7h6a3 3 0 0 1-6 0z" fill="#336791"/></svg>`,
  MySQL: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h2.5L7 9l1.5-4H11L8.5 12H7L3 5zm10 0h2l2 4.5L19 5h2l-3 7h-2l-3-7zm-8 9h14v2H5v-2z" fill="#4479A1"/></svg>`,
  Figma: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 2h4a4 4 0 0 1 0 8H8V2z" fill="#F24E1E"/><path d="M8 10h4a4 4 0 0 1 0 8H8v-8z" fill="#FF7262"/><path d="M8 18a4 4 0 0 0 4 4v-4H8z" fill="#1ABCFE"/><path d="M4 14a4 4 0 0 1 4-4v8a4 4 0 0 1-4-4z" fill="#0ACF83"/><path d="M4 6a4 4 0 0 1 4-4v8A4 4 0 0 1 4 6z" fill="#FF7262"/></svg>`,
  "Adobe Illustrator": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="3" fill="#FF9A00"/><path d="M9.5 15.5l-.8 2.3H7l3-8.5h1.8l3 8.5h-1.7l-.8-2.3H9.5zm2.3-1.3L11 11.5l-.8 2.7h1.6z" fill="white"/><path d="M15 7.7c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm-.7 10.1v-6.3h1.4v6.3h-1.4z" fill="white"/></svg>`,
  Canvas: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="#E8442B" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="#E8442B" stroke-width="1.5"/><path d="M12 8v2M12 14v2M8 12h2M14 12h2" stroke="#E8442B" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  Git: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.2 11l-9.1-9.2a1.2 1.2 0 0 0-1.7 0L9.5 3.7l2.1 2.1a1.4 1.4 0 0 1 1.8 1.8l2 2a1.4 1.4 0 0 1 1.8 1.8 1.4 1.4 0 1 1-1.4 0l-1.9-1.9v4.9a1.4 1.4 0 0 1 .4 2.7 1.4 1.4 0 0 1-.4-2.7V9.3a1.4 1.4 0 0 1-.8-1.9L10.9 5.3 1.8 14.4a1.2 1.2 0 0 0 0 1.7l9.1 9.1c.5.5 1.2.5 1.7 0l9.6-9.5a1.2 1.2 0 0 0 0-1.7z" fill="#F05032"/></svg>`,
  Jira: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 12l10 10 10-10L12 2zm0 3.8l6.2 6.2L12 18.2 5.8 12 12 5.8z" fill="#0052CC"/><path d="M12 8.4l3.6 3.6L12 15.6 8.4 12 12 8.4z" fill="#0052CC"/></svg>`,
};

// ─── Per-category theme ────────────────────────────────────────────────────────
type Theme = { bg: string; accent: string; text: string; tag: string; num: string };

const THEMES: Theme[] = [
  {
    bg: "#FFFFFF",
    accent: "#61DAFB",
    text: "#2E2E31",
    tag: "rgba(97,218,251,0.08)",
    num: "rgba(97,218,251,0.04)",
  },
  {
    bg: "#FFFFFF",
    accent: "#47A248",
    text: "#393D39",
    tag: "rgba(71,162,72,0.08)",
    num: "rgba(71,162,72,0.04)",
  },
  {
    bg: "#FFFFFF",
    accent: "#FF9A00",
    text: "#474441",
    tag: "rgba(255,154,0,0.08)",
    num: "rgba(255,154,0,0.04)",
  },
];

type Category = { title: string; skills: string[] };

const data: Category[] = [
  { title: "Programming & Frameworks", skills: ["React", "TypeScript", "Node.js (Express)", "Python"] },
  { title: "Databases", skills: ["Oracle", "MongoDB", "PostgreSQL", "MySQL"] },
  { title: "UI / Tools & Workflow", skills: ["Figma", "Adobe Illustrator", "Canvas", "Git", "Jira"] },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titles = gsap.utils.toArray<HTMLElement>(".sk-title");
      const lists = gsap.utils.toArray<HTMLElement>(".sk-list");
      const nums = gsap.utils.toArray<HTMLElement>(".sk-num");

      gsap.set(titles, { yPercent: 60, opacity: 0 });
      gsap.set(lists, { opacity: 0, y: 30 });
      gsap.set(nums, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${data.length * 600}`,
          scrub: 1,
          pin: true,
        },
      });

      data.forEach((_, i) => {
        const theme = THEMES[i];

        // ── Transition background + glow ──
        tl.to(bgRef.current, { backgroundColor: theme.bg, duration: 0.4, ease: "none" }, i === 0 ? 0 : undefined);
        tl.to(glowRef.current, { backgroundColor: theme.accent, duration: 0.4, ease: "none" }, "<");
        tl.to(nums[i], { opacity: 1, duration: 0.3 }, "<");
        if (i > 0) tl.to(nums[i - 1], { opacity: 0, duration: 0.2 }, "<");

        // ── Reveal title ──
        tl.to(titles[i], { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, "<0.1");

        // ── Reveal skill chips staggered ──
        tl.to(
          lists[i].querySelectorAll(".sk-chip"),
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.35, ease: "power2.out" },
          "<0.15"
        );

        // ── Hold ──
        tl.to({}, { duration: 0.7 });

        // ── Exit (except last) ──
        if (i !== data.length - 1) {
          tl.to(titles[i], { yPercent: -60, opacity: 0, duration: 0.35, ease: "power3.in" });
          tl.to(
            lists[i].querySelectorAll(".sk-chip"),
            { opacity: 0, y: -20, stagger: 0.03, duration: 0.25, ease: "power2.in" },
            "<"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: THEMES[0].bg }}
    >
      {/* ── Live background ── */}
      <div ref={bgRef} className="absolute inset-0 transition-none" style={{ backgroundColor: THEMES[0].bg }} />

      {/* ── Ambient glow blob ── */}
      <div
        ref={glowRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "60vw",
          height: "60vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(120px)",
          opacity: 0.12,
          backgroundColor: THEMES[0].accent,
        }}
      />

      {/* ── Watermark numbers ── */}
      {data.map((_, i) => (
        <div
          key={i}
          className="sk-num absolute select-none pointer-events-none font-black"
          style={{
            fontSize: "clamp(200px, 30vw, 380px)",
            lineHeight: 1,
            right: "-0.05em",
            bottom: "-0.1em",
            color: THEMES[i].num,
            fontFamily: "'Georgia', serif",
            letterSpacing: "-0.05em",
          }}
        >
          0{i + 1}
        </div>
      ))}

      {/* ── Thin top border accent line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${THEMES[0].accent}55, transparent)` }}
      />

      {/* ── Content ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        {/* Category index dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {data.map((_, i) => (
            <div
              key={i}
              className="sk-dot w-1.5 h-1.5 rounded-full transition-all"
              style={{ backgroundColor: THEMES[i].accent, opacity: 0.4 }}
            />
          ))}
        </div>

        {data.map((cat, i) => {
          const theme = THEMES[i];
          return (
            <div
              key={i}
              className="absolute flex flex-col items-center text-center"
              style={{ maxWidth: "780px", width: "100%" }}
            >
              {/* ── Eyebrow label ── */}
              <span
                className="sk-title block text-xs tracking-[0.25em] uppercase mb-4 font-medium"
                style={{ color: theme.accent, letterSpacing: "0.3em", fontFamily: "monospace" }}
              >
                — {String(i + 1).padStart(2, "0")} —
              </span>

              {/* ── Main title ── */}
              <h2
                className="sk-title text-3xl md:text-[2.8rem] font-bold mb-10 leading-tight"
                style={{
                  color: theme.text,
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {cat.title}
              </h2>

              {/* ── Skill chips ── */}
              <div className="sk-list flex flex-wrap justify-center gap-3">
                {cat.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="sk-chip flex items-center gap-2.5 px-4 py-2.5 rounded-full"
                    style={{
                      backgroundColor: theme.tag,
                      border: `1px solid ${theme.accent}25`,
                      color: theme.text,
                      opacity: 0,
                      transform: "translateY(16px)",
                      fontFamily: "monospace",
                      fontSize: "0.82rem",
                      letterSpacing: "0.02em",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {/* Logo */}
                    {LOGOS[skill] && (
                      <span
                        className="flex-shrink-0"
                        style={{ width: 18, height: 18 }}
                        dangerouslySetInnerHTML={{ __html: LOGOS[skill] }}
                      />
                    )}
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom label ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase opacity-20"
        style={{ color: "#ffffff", fontFamily: "monospace" }}
      >
        scroll to explore
      </div>
    </section>
  );
}
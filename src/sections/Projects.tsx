import React, { useRef, useState, useMemo } from "react";
import SectionTitle from "../components/SectionTitle";
import ProjectCard, { type ProjectsCardHandle } from "../components/ProjectCard";
import { projectsList } from "../components/constants/constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const tabs = ["web", "mobile", "design"] as const;

function Projects() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("web");

  const projectCardRef = useRef<ProjectsCardHandle>(null);
  const projectSecRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    return projectsList.filter(p => p.category === activeTab);
  }, [activeTab]);

  useGSAP(() => {
    if (!projectCardRef.current || !projectSecRef.current) return;
    const cards = projectCardRef.current.cards;

    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: projectSecRef.current,
    //     start: "top top",
    //     end: `+=${filteredProjects.length * 700}`,
    //     scrub: 3,
    //     pin: true,
    //   }
    // });

    // cards?.forEach((card, index) => {
    //   gsap.set(card, { yPercent: 105 });
    //   tl.to(card, {
    //     yPercent: `${16.5 + index * 16.5}`,
    //     height: 500,
    //     duration: 3,
    //     ease: "none",
    //   });
    // });

    const filterTL = gsap.timeline({
      scrollTrigger: {
        trigger: projectSecRef.current,
        start: "20% top",
        scrub: 2
      }
    })

    filterTL.to(filterRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
    })

  }, [filteredProjects]);

  return (
    <section
      id="projects"
      ref={projectSecRef}
      className="min-h-screen max-w-6xl mx-auto bg-white text-zinc-900 py-12 px-6"
    >
      <SectionTitle title="PROJECTS" theme="black" />

      {/* Tabs */}
      <div className="flex justify-center mt-10 mb-10"
        ref={filterRef}
      >
        <div className="grid grid-cols-3 grid-rows-1 gap-5 w-72">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`uppercase tracking-widest text-sm pb-2 transition-all ease-linear duration-300 
                ${activeTab === tab 
                  ? "text-zinc-900 border-b-2 border-zinc-900" 
                  : "text-zinc-500 hover:text-black border-b-2 border-b-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <ProjectCard
        ref={projectCardRef}
        data={filteredProjects}
      />
    </section>
  );
}

export default Projects;

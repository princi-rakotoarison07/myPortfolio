import React, {useRef} from 'react'
import SectionTitle from '../components/SectionTitle'
import ProjectCard, { type ProjectsCardHandle } from '../components/ProjectCard'
import { projectsList } from '../components/constants/constants';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function Projects() {
  const projectCardRef = useRef<ProjectsCardHandle>(null);
  const projectSecRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!projectCardRef.current || !projectSecRef.current) return;
    const cards = projectCardRef.current.cards;
      // gsap.set(skillSecRef.current, { yPercent: 0})
    // Animate the section title
    const tl = gsap.timeline({
        scrollTrigger: {
          trigger: projectSecRef.current,
          start: 'top top',
          end: `+=${projectsList.length * 700}`,
          scrub: 3,
          pin: true,// Helps with smooth pinning
          smooth: true,
          smoothAmount: 0.5, // Adjust for smoother pinning 
        }
      }
    );
    // Animate each card individually with a staggered effect
    cards?.forEach((card, index) => {
      gsap.set(card, { yPercent: 105,}); // Initial state for each card
      tl.to(card, {
        yPercent: `${ index==0 ? 16.5 : 16.5 + index * 16.5}`,
        height: 500,
        duration: 3,
        ease: 'none', // Stagger effect
      })
    });

  }, []);

  return (
    <section id="projects" className='max-h-screen  max-w-screen flex flex-col overflow-hidden bg-white text-zinc-900 py-4 md:py-6 px-6' ref={projectSecRef}>
      <SectionTitle title="PROJECTS" theme='black'/>
          <ProjectCard ref={projectCardRef} data={projectsList}/>
    </section>
  )
}

export default Projects
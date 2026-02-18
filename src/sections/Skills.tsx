import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { mySkills } from '../components/constants/constants';
import SkillCards from '../components/SkillCard';

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const skillsRef = useRef(null);

  useEffect(() => {
    if (!skillsRef.current) return;

    const cards = skillsRef.current.cards;

    // Animate the section title
    gsap.fromTo(
      '#skills h2',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: '#skills',
          start: 'top center',
          end: 'top 100px',
          scrub: true,
        },

        stagger: 1.6
      }
    );

    // Animate each card individually with a staggered effect
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.2, // Stagger effect
      });
    });
  }, []);

  return (
    <section
      id="skills"
      className="min-h-screen xl:max-w-[1300px] max-w-screen bg-slate-400 flex justify-center inset-0"
    >
      <h2 className="text-8xl">SKILLS</h2>
      <SkillCards ref={skillsRef} data={mySkills} />
    </section>
  );
}

export default Skills;
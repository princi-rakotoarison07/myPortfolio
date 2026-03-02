import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { mySkills } from '../components/constants/constants';
import SkillCards, {type SkillCardsHandle} from '../components/SkillCard';
import { useGSAP } from '@gsap/react';
import SectionTitle from '../components/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const skillsRef = useRef<SkillCardsHandle>(null);
  const skillSecRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!skillsRef.current || !skillSecRef.current) return;
    const cards = skillsRef.current.cards;
      // gsap.set(skillSecRef.current, { yPercent: 0})
    // Animate the section title
    const tl = gsap.timeline({
        scrollTrigger: {
          trigger: skillSecRef.current,
          start: 'top top',
          end: `+=${mySkills.length * 700}`,
          scrub: 3,
          pin: true,// Helps with smooth pinning
          smooth: true,
          smoothAmount: 0.5, // Adjust for smoother pinning 
        }
      }
    );
    // Animate each card individually with a staggered effect
    cards.forEach((card, index) => {
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
    <section
      ref={skillSecRef}
      id="skills"
      className="min-h-screen  max-w-6xl mx-auto flex flex-col overflow-hidden bg-zinc-900 text-white py-4 px-4 md:py-6"
    >
    <SectionTitle title="SKILLS" theme='white' />
      
      <SkillCards ref={skillsRef} data={mySkills} />
    </section>
  );
}

export default Skills;

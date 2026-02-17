import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/src/ScrollTrigger'
import { mySkills } from '../components/constants/constants'
import SkillCards from '../components/SkillCard'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

function Skills() {
  const skillsRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: '#skills',
        start: 'top top',
        end: `+=${mySkills.length * 600}`,
        scrub: true,
        pin: true
      },
    })

    tl.fromTo('#skills h2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: .2 })
    if (!skillsRef.current) return;

    gsap.from(skillsRef.current.cards, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  })

  return (
    <section id="skills" className='min-h-screen xl:max-w-[1300px] max-w-screen bg-slate-400 flex justify-center inset-0'>
      <h2 className='text-8xl'>SKILLS</h2>
      <SkillCards ref={skillsRef} data={mySkills} />
    </section>
  )
}

export default Skills
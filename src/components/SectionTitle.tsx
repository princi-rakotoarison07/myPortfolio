import {useRef} from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

type sectionTitleProps = {
    title: string;
    theme: string;
}
function SectionTitle({title, theme}: sectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const traitGauche = useRef<HTMLDivElement>(null);
  const traitDroit = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if( !containerRef.current || !traitGauche.current || !traitDroit.current || !titleRef.current) return;

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
        end: "top 70%",
        scrub: 2,
      }
    })

    tl3.from(traitGauche.current, {
      scaleX: 0,
      transformOrigin: "right",
      duration: 0.8,
    })
    .from(traitDroit.current, {
      scaleX: 0,
      transformOrigin: "left",
      duration: 0.8
    }, "<")
    .from(titleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, "+=.4")
  })

  return (
    <div className='flex items-center h-fit w-full justify-center mb-4'
      ref={containerRef}
    >
      <div className={`h-[2px] w-10 md:w-48 bg-${theme == 'white' ? 'white':'zinc-900'}`}
        ref={traitGauche}
      ></div>
        <h2 className={`text-2xl mx-5 text-${theme == 'white' ? 'white font-thin':'black font-normal'}`}
          ref={titleRef}
        >{title}</h2>
        <div>

        </div>
        <div className={`h-[2px] w-10 md:w-48 bg-${theme == 'white' ? 'white':'zinc-900'}`}
          ref={traitDroit}
        ></div>
    </div>
  )
}

export default SectionTitle
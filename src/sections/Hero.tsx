import { Download } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// import NeuralBackground from '../components/NeuralBg';
import Statue from '../components/3dStatue';
import { useRef } from 'react';

function Hero() {
  const iconStyle = "p-2 w-12 h-12 text-primary border border-4 border-primary rounded-lg hover:bg-gray-100 transition-colors";
  const statueRef = useRef<HTMLDivElement>(null);

  return (
    <section 
    className='relative z-20 min-h-[300vh] min-w-screen md:overflow-hidden px-6 md:px-10 flex md:flex-row mt-12 justify-between items-center flex-col-reverse'>
      {/* <NeuralBackground /> */}
      {/* <div id="heroGauche" className='h-screen w-full md:w-1/2 flex flex-col gap-10 justify-center md:justify-start md:mt-10'>
        <h2 className='text-5xl text-primary'><span className='font-semibold'>Full-Stack</span> Web and Mobile Developer.</h2>
        <h4 className='text-primary text-4xl relative'><span className='font-semibold relative z-20'>Creative</span> <div className=' relative z-10 -top-3 w-8 h-2.5 bg-red-500'></div>Web Designer.</h4>
        <div>
          <h6 className='text-primary text-2xl mb-2'>My socials:</h6>
          <div className='flex w-[10rem] justify-between'>
            <a href="#" className={iconStyle} aria-label="Facebook">
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a href="#" className={iconStyle} aria-label="LinkedIn">
              <FaLinkedinIn className="w-6 h-6" />
            </a>
            <a href="#" className={iconStyle} aria-label="Github">
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className='flex'>
          <button className='bg-black p-4 text-white text-2xl'>Let's work together</button>
        </div>
      </div> */}
        <div className='z-20 md:h-full absolute overflow-hidden flex flex-col justify-center items-center inset-0'
          ref={statueRef}
        >
            <p className='relative top-56'>Hi! I'm Jonathan Andria</p>
            <Statue />
        </div>
    </section>
  )
}

export default Hero;
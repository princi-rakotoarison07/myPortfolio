import './App.css'
import { MainLayout } from './layouts/MainLayout'
import { Navbar } from './layouts/NavBar'
import Hero from './sections/Hero'
import Skills from './sections/Skills';
import Projects from './sections/Projects'
import { useRef } from 'react'
import Contact from './sections/Contact'

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <>    
     <MainLayout>
      <div className='overflow-hidden' ref={containerRef}>
          <Navbar />
          <Hero/>
          <Skills/>
          <Projects />
          <Contact />
      </div>
    </MainLayout>
    </>
   
  )
}

export default App

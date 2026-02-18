import './App.css'
import NeuralBackground from './components/NeuralBg'
import { MainLayout } from './layouts/MainLayout'
import { Navbar } from './layouts/NavBar'
import Hero from './sections/Hero'
import Skills from './sections/Skills';
import Projects from './sections/Projects'
import { useRef } from 'react'

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <NeuralBackground />
    
     <MainLayout>
      <div className='overflow-hidden' ref={containerRef}>
          <Navbar />
          <Hero/>
          <Skills/>
          <Projects />
      </div>
    </MainLayout>
    </>
   
  )
}

export default App

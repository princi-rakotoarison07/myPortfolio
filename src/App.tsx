import './App.css'
import NeuralBackground from './components/NeuralBg'
import { MainLayout } from './layouts/MainLayout'
import { Navbar } from './layouts/NavBar'
import Hero from './sections/Hero'
import Skills from './sections/Skills';

function App() {

  return (
    <>
      <NeuralBackground />
    
     <MainLayout>
      <div className='overflow-hidden'>
          <Navbar />
          <Hero />
          <Skills/>
      </div>
    </MainLayout>
    </>
   
  )
}

export default App

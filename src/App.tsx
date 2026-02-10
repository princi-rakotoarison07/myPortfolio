import './App.css'
import NeuralBackground from './components/NeuralBg'
import { MainLayout } from './layouts/MainLayout'
import { Navbar } from './layouts/NavBar'
import Hero from './sections/Hero'

function App() {

  return (
    <>
    <div className='md:hidden'>
      <NeuralBackground />
    </div>
    
     <MainLayout>
      <div className='overflow-hidden'>
          <Navbar />
          <Hero />
      </div>
    </MainLayout>
    </>
   
  )
}

export default App

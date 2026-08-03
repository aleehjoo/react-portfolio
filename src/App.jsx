import { useRef } from 'react'
import NavBar from './components/NavBar'
import Lightbulb from './components/Lightbulb'
import Hero from './sections/Hero'
import AboutMe from './sections/AboutMe'
import Projects from './sections/Projects'
import ContactMe from './sections/ContactMe'
import { useScrolledPast } from './hooks/useScrolledPast'

export default function App() {
  const heroBulbRef = useRef(null)
  // Hand over to the fixed bulb only once the hero one is gone, so there is
  // never more than one on screen.
  const heroBulbGone = useScrolledPast(heroBulbRef)

  return (
    <div
      id="top"
      className="min-h-screen bg-void font-hand text-ink transition-colors duration-300"
    >
      <NavBar />

      <div
        className={`transition-opacity duration-300 ${
          heroBulbGone ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!heroBulbGone}
      >
        <Lightbulb variant="side" />
      </div>

      <main className="mx-auto w-full max-w-4xl">
        <Hero bulbRef={heroBulbRef} />
        <AboutMe />
        <Projects />
        <ContactMe />
      </main>

      <footer className="px-6 pb-16 text-center text-sm text-muted">
        EVERYTHING IS GOING TO BE OK.
      </footer>
    </div>
  )
}

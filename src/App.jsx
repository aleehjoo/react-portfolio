import Lightbulb from './components/Lightbulb'
import Hero from './sections/Hero'
import AboutMe from './sections/AboutMe'
import Projects from './sections/Projects'
import ContactMe from './sections/ContactMe'
import { useInView } from './hooks/useInView'

export default function App() {
  const [heroRef, heroInView] = useInView({ once: false, threshold: 0.2 })

  return (
    <div className="min-h-screen bg-void font-pixel text-ink transition-colors duration-300">
      <div
        className={`fixed right-6 top-0 z-10 transition-opacity duration-300 ${
          heroInView ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <Lightbulb variant="corner" />
      </div>

      <main className="mx-auto w-full max-w-4xl">
        <Hero ref={heroRef} />
        <AboutMe />
        <Projects />
        <ContactMe />
      </main>

      <footer className="px-6 pb-16 text-center text-xs tracking-[0.2em] text-muted">
        EVERYTHING IS GOING TO BE OK.
      </footer>
    </div>
  )
}

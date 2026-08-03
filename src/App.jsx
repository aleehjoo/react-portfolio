import NavBar from './components/NavBar'
import Hero from './sections/Hero'
import AboutMe from './sections/AboutMe'
import Projects from './sections/Projects'
import ContactMe from './sections/ContactMe'

export default function App() {
  return (
    <div
      id="top"
      className="min-h-screen bg-void font-hand text-ink transition-colors duration-300"
    >
      <NavBar />

      <main className="mx-auto w-full max-w-4xl">
        <Hero />
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

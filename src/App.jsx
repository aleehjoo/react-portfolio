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

      {/*
        Lowered into place rather than popped in. It starts a full height above
        the viewport (-translate-y-full) and descends on its cord, so it enters
        from off-screen instead of materialising in mid-air. z-10 against the
        navbar's z-20 keeps the cord running up behind the bar throughout.

        Two different durations: the fade is quick (250ms) so it is solid while
        still on its way down, and the travel is slow (900ms) on a curve that
        overshoots slightly and settles, the way something on a cord would.

        Transitioning `translate` rather than `transform`: Tailwind v4's
        translate utilities set the standalone CSS property, so naming
        `transform` here would let the slide snap instead of ease.
      */}
      <div
        className={`fixed right-6 top-0 z-10 transition-[opacity,translate] [transition-duration:250ms,900ms] [transition-timing-function:ease-out,cubic-bezier(.22,1.15,.36,1)] sm:right-10 ${
          heroBulbGone
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-full opacity-0'
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

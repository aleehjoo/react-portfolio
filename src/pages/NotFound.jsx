import { Link } from 'react-router'
import Lightbulb from '../components/Lightbulb'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-void px-6 font-pixel text-ink transition-colors duration-300">
      <Lightbulb variant="hero" />
      <p className="text-center text-2xl tracking-[0.25em]">
        THERE IS NOTHING HERE.
      </p>
      <Link
        to="/"
        className="border-4 border-ink px-6 py-3 text-sm tracking-[0.2em] text-ink no-underline"
      >
        GO BACK
      </Link>
    </div>
  )
}

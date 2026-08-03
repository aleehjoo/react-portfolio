import { Link } from 'react-router'
import Lightbulb from '../components/Lightbulb'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-void px-6 font-hand text-ink transition-colors duration-300">
      <Lightbulb variant="hero" />
      {/* the jagged face, for the one line that should feel wrong */}
      <p className="text-center font-jagged text-3xl tracking-[0.1em] text-blood">
        THERE IS NOTHING HERE.
      </p>
      <Link
        to="/"
        className="border-4 border-ink px-6 py-3 text-base text-ink no-underline"
      >
        GO BACK
      </Link>
    </div>
  )
}

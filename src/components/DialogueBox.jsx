import { useInView } from '../hooks/useInView'
import { useTypewriter } from '../hooks/useTypewriter'
import ContinueArrow from './ContinueArrow'

export default function DialogueBox({ text }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const { typed, done } = useTypewriter(text, { start: inView })

  return (
    // Black fill with a white border and a black ring outside it — the game's
    // window, which reads the same way against either space.
    <div
      ref={ref}
      className="relative border-4 border-box-ink bg-box px-6 py-5 outline outline-[3px] outline-box"
    >
      {/*
        The animated copy is hidden from assistive tech and the complete text
        is exposed instead, so the effect never delays or garbles screen readers.
      */}
      <p
        aria-hidden="true"
        className="min-h-32 whitespace-pre-wrap text-left text-lg leading-relaxed text-box-ink"
      >
        {typed}
      </p>
      <p className="sr-only">{text}</p>
      {done && (
        <ContinueArrow className="absolute bottom-3 right-4 animate-blink text-box-ink" />
      )}
    </div>
  )
}

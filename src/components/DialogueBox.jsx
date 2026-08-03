import { useInView } from '../hooks/useInView'
import { useTypewriter } from '../hooks/useTypewriter'

export default function DialogueBox({ text }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const { typed, done } = useTypewriter(text, { start: inView })

  return (
    <div ref={ref} className="relative border-4 border-ink bg-void px-6 py-5">
      {/*
        The animated copy is hidden from assistive tech and the complete text
        is exposed instead, so the effect never delays or garbles screen readers.
      */}
      <p
        aria-hidden="true"
        className="min-h-32 whitespace-pre-wrap text-left text-base leading-loose text-ink"
      >
        {typed}
      </p>
      <p className="sr-only">{text}</p>
      {done && (
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-4 animate-blink text-ink"
        >
          ▼
        </span>
      )}
    </div>
  )
}

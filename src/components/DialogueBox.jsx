import { useInView } from '../hooks/useInView'
import { useTypewriter } from '../hooks/useTypewriter'
import ContinueArrow from './ContinueArrow'

export default function DialogueBox({ speaker, text, cycle = 0, onAdvance }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const { typed, done } = useTypewriter(text, { start: inView })

  const interactive = typeof onAdvance === 'function'

  return (
    <div ref={ref} className="relative">
      {speaker && (
        // nameplate, sitting on the top edge of the window
        <p className="absolute -top-3 left-4 z-10 border-4 border-box-ink bg-box px-3 text-sm tracking-[0.1em] text-box-ink">
          {speaker}
        </p>
      )}

      <Wrapper interactive={interactive} onAdvance={onAdvance}>
        {/*
          The animated copy is hidden from assistive tech and the complete text
          exposed beside it, so the effect never delays or garbles a screen
          reader. Each character is its own span so it can land individually,
          the way the game types; keying them by cycle restarts the animation
          when the line changes rather than reusing the previous spans.
        */}
        <p
          aria-hidden="true"
          className="min-h-32 whitespace-pre-wrap pt-2 text-left text-lg leading-relaxed text-box-ink"
        >
          {typed.split('').map((char, i) => (
            <span
              key={`${cycle}-${i}`}
              className="inline-block whitespace-pre animate-char-in"
            >
              {char}
            </span>
          ))}
        </p>
        <p className="sr-only">{text}</p>

        {done && (
          <ContinueArrow className="absolute bottom-3 right-4 animate-blink text-box-ink" />
        )}
      </Wrapper>
    </div>
  )
}

function Wrapper({ interactive, onAdvance, children }) {
  const shell =
    'relative block w-full border-4 border-box-ink bg-box px-6 py-5 text-left outline outline-[3px] outline-box'

  if (!interactive) return <div className={shell}>{children}</div>

  return (
    <button
      type="button"
      onClick={onAdvance}
      aria-label="Next line"
      className={`${shell} cursor-pointer`}
    >
      {children}
    </button>
  )
}

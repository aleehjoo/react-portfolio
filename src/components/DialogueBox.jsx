import { useInView } from '../hooks/useInView'
import { useTypewriter } from '../hooks/useTypewriter'
import HandCursor from './HandCursor'

/*
 * Splits the revealed text into words and the whitespace between them, so
 * each word can be kept on one line.
 *
 * Animating per character means every character is its own inline-block, and
 * a line can break between any two of them — which was chopping words in half
 * mid-word. Wrapping each word in a nowrap box confines breaks to the spaces.
 * `index` keeps each character's key stable as more of them arrive.
 */
function splitIntoWords(text) {
  const tokens = []
  let index = 0
  for (const token of text.split(/(\s+)/)) {
    if (token) tokens.push({ token, index, space: /^\s+$/.test(token) })
    index += token.length
  }
  return tokens
}

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
          reader. Keying the characters by cycle restarts the animation when
          the line changes instead of reusing the previous spans.
        */}
        <p
          aria-hidden="true"
          className="min-h-32 whitespace-pre-wrap pt-2 text-left text-lg leading-relaxed text-box-ink"
        >
          {splitIntoWords(typed).map(({ token, index, space }) =>
            space ? (
              token
            ) : (
              <span
                key={`${cycle}-w${index}`}
                className="inline-block whitespace-nowrap"
              >
                {token.split('').map((char, i) => (
                  <span
                    key={`${cycle}-${index + i}`}
                    className="inline-block animate-char-in"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ),
          )}
        </p>
        <p className="sr-only">{text}</p>

        {done && (
          <HandCursor
            height={18}
            className="absolute bottom-1 right-0 animate-blink"
          />
        )}
      </Wrapper>
    </div>
  )
}

function Wrapper({ interactive, onAdvance, children }) {
  const shell =
    'relative block w-full overflow-hidden border-4 border-box-ink bg-box px-6 py-5 text-left outline outline-[3px] outline-box'

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

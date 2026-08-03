import { useEffect, useState } from 'react'

export function useTypewriter(text, { speed = 26, start = true } = {}) {
  // Read once at mount: this decides whether the effect runs at all, and
  // reading it during render keeps it out of the effect body.
  const [reduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [revealed, setRevealed] = useState(0)

  // Resetting state during render is React's documented way to react to a
  // changed prop. Doing it in an effect would trigger a cascading render.
  const [renderedText, setRenderedText] = useState(text)
  if (renderedText !== text) {
    setRenderedText(text)
    setRevealed(0)
  }

  useEffect(() => {
    if (!start || reduced) return undefined

    // The index lives in the closure so the interval never depends on state,
    // and setState only ever happens inside the async callback.
    let index = 0
    const id = window.setInterval(() => {
      index += 1
      setRevealed(index)
      if (index >= text.length) {
        window.clearInterval(id)
      }
    }, speed)

    return () => window.clearInterval(id)
  }, [text, speed, start, reduced])

  let typed = ''
  if (start) {
    typed = reduced ? text : text.slice(0, revealed)
  }

  return { typed, done: typed.length === text.length }
}

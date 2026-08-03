import { useEffect, useState } from 'react'

/*
 * True once the referenced element has scrolled entirely off the top of the
 * viewport. Used to hand over from the hero lightbulb to the fixed one, so
 * only ever one bulb is on screen.
 */
export function useScrolledPast(ref) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const check = () => setPast(node.getBoundingClientRect().bottom <= 0)

    // Deferred rather than called straight away: a synchronous setState in an
    // effect body triggers a cascading render. This catches a reload that
    // starts part-way down the page. A timeout rather than a frame callback,
    // because a backgrounded tab never runs its rendering steps and so would
    // never fire the frame — leaving the initial state wrong.
    const initial = window.setTimeout(check, 0)
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)

    return () => {
      window.clearTimeout(initial)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [ref])

  return past
}

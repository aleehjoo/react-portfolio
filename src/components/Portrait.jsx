import { useState } from 'react'
import Placeholder from './Placeholder'
import attack from '../assets/Red_hands_attack.gif'

/*
 * The portrait gets attacked on hover: it flinches while the red hands play
 * over it.
 *
 * The GIF is ~1.5MB, so it is mounted only once the portrait is actually
 * hovered — otherwise every visitor pays for it on page load to see something
 * most of them never trigger. Remounting it under a changing key restarts it,
 * so it plays from the first frame on every hover rather than continuing
 * mid-loop.
 */
export default function Portrait() {
  const [attacking, setAttacking] = useState(false)
  const [hits, setHits] = useState(0)

  const strike = () => {
    setHits((n) => n + 1)
    setAttacking(true)
  }

  return (
    <div
      className="group mx-auto aspect-square w-40"
      onMouseEnter={strike}
      onMouseLeave={() => setAttacking(false)}
    >
      <div className="relative h-full w-full group-hover:animate-recoil">
        <Placeholder label="[ PHOTO ]" className="h-full w-full" />

        {attacking && (
          <img
            key={hits}
            src={attack}
            alt=""
            aria-hidden="true"
            /* motion-reduce:hidden — an attack animation is exactly what
               someone asking for reduced motion does not want sprung on them */
            className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-contain motion-reduce:hidden"
          />
        )}
      </div>
    </div>
  )
}

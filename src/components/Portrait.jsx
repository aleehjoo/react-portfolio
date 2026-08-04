import { useState } from 'react'
import photo from '../assets/profile-picture.jpg'
import attack from '../assets/Red_hands_attack.gif'

/*
 * The portrait gets attacked on hover: it flinches while the red hands play
 * over the photo.
 *
 * The GIF is ~1.5MB, so it is mounted only once the portrait is actually
 * hovered — otherwise every visitor pays for it on page load to see something
 * most of them never trigger. Remounting it under a changing key restarts it,
 * so it plays from the first frame on every hover rather than resuming
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
      <div className="relative h-full w-full overflow-hidden border-4 border-ink motion-safe:group-hover:animate-recoil">
        <img
          src={photo}
          alt="Alejandro Umila"
          className="h-full w-full object-cover"
        />

        {attacking && (
          <img
            key={hits}
            src={attack}
            alt=""
            aria-hidden="true"
            /* Scaled past the frame so the hands come in from off the edges.
               Deliberately not gated behind motion-safe: this only ever plays
               because someone chose to hover it, and brief user-triggered
               effects are a different thing from ambient motion. The flinch
               below it stays gated, since that is movement of the page. */
            className="pointer-events-none absolute inset-0 h-full w-full scale-150 object-cover"
          />
        )}
      </div>
    </div>
  )
}

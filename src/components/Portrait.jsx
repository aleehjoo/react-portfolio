import { useCallback, useEffect, useRef, useState } from 'react'
import photo from '../assets/profile-picture.jpg'
import attack from '../assets/Red_hands_attack.gif'
import { useSpace } from '../theme/useSpace'

/*
 * The portrait, dressed as an OMORI battle panel: emotion plate on top, the
 * face over a halftone field, HP and MP underneath.
 *
 * Hovering plays the red hands over the face. Two things make that work:
 *
 * - The GIF is ~1.5MB, so it is only fetched the first time someone hovers.
 * - Pointing a fresh <img> at the same URL does not restart a GIF; the browser
 *   resumes the cached animation wherever it left off. So the bytes are kept
 *   as a Blob and a new object URL is minted per hover, which forces a fresh
 *   decode from frame one without going back to the network.
 */
export default function Portrait() {
  const { space } = useSpace()
  const [attackUrl, setAttackUrl] = useState(null)
  const blob = useRef(null)
  const currentUrl = useRef(null)

  const release = useCallback(() => {
    if (currentUrl.current) {
      URL.revokeObjectURL(currentUrl.current)
      currentUrl.current = null
    }
  }, [])

  const strike = useCallback(async () => {
    if (!blob.current) {
      blob.current = await fetch(attack).then((r) => r.blob())
    }
    release()
    currentUrl.current = URL.createObjectURL(blob.current)
    setAttackUrl(currentUrl.current)
  }, [release])

  const stop = useCallback(() => {
    setAttackUrl(null)
    release()
  }, [release])

  useEffect(() => release, [release])

  return (
    <div
      className="group mx-auto w-44 border-4 border-ink bg-panel p-1.5"
      onMouseEnter={strike}
      onMouseLeave={stop}
    >
      {/* emotion plate */}
      <p className="mb-1.5 border-2 border-black bg-white py-0.5 text-center text-sm tracking-[0.1em] text-black">
        {space === 'white' ? 'NEUTRAL' : 'AFRAID'}
      </p>

      {/* face, over the halftone field */}
      <div className="relative aspect-square w-full overflow-hidden border-2 border-black bg-white">
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(0,0,0,0.28) 1px, transparent 1px)',
            backgroundSize: '5px 5px',
          }}
        />
        <img
          src={photo}
          alt="Alejandro Umila"
          className="relative h-full w-full object-cover motion-safe:group-hover:animate-recoil"
        />
        {attackUrl && (
          <img
            key={attackUrl}
            src={attackUrl}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full scale-150 object-cover"
          />
        )}
      </div>

      {/* stats */}
      <div className="mt-1.5 space-y-1">
        <StatBar label="♥" value="120/120" fill="bg-hp" width="100%" />
        <StatBar label="◆" value="73/73" fill="bg-mp" width="100%" />
      </div>
    </div>
  )
}

function StatBar({ label, value, fill, width }) {
  return (
    <div className="flex items-center gap-1">
      <span aria-hidden="true" className="text-sm leading-none text-black">
        {label}
      </span>
      <span className="relative h-4 flex-1 overflow-hidden rounded-full border-2 border-black bg-white">
        <span className={`absolute inset-y-0 left-0 ${fill}`} style={{ width }} />
        <span className="absolute inset-0 flex items-center justify-center text-xs leading-none text-white">
          {value}
        </span>
      </span>
    </div>
  )
}

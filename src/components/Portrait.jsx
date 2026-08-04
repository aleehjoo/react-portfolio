import { useCallback, useEffect, useRef, useState } from 'react'
import photo from '../assets/profile-picture.jpg'
import attack from '../assets/Red_hands_attack.gif'
import { useSpace } from '../theme/useSpace'

/*
 * The portrait, dressed as an OMORI battle panel: emotion plate on top, the
 * face over a halftone field, HP and MP beneath.
 *
 * Everything here is drawn rather than sprited, so it stays sharp at any size
 * instead of being a scaled screenshot.
 *
 * Hovering plays the red hands over the face. Two things make that work:
 *
 * - The GIF is ~1.5MB, so it is only fetched the first time someone hovers.
 * - Pointing a fresh <img> at the same URL does not restart a GIF; the browser
 *   resumes the cached animation wherever it left off. So the bytes are kept
 *   as a Blob and a new object URL is minted per hover, which forces a fresh
 *   decode from frame one without going back to the network.
 */

// The game renders each emotion in its own face and colour — NEUTRAL in the
// plain lettering, AFRAID in the jagged one.
const EMOTIONS = {
  white: { label: 'NEUTRAL', className: 'font-hand text-white' },
  black: { label: 'AFRAID', className: 'font-jagged text-[#9a9a9a]' },
}

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

  const emotion = EMOTIONS[space]

  return (
    <div
      className="group mx-auto w-44 select-none border-2 border-[#b8b8b8] bg-panel p-2 shadow-[inset_0_0_0_2px_#ffffff]"
      onMouseEnter={strike}
      onMouseLeave={stop}
    >
      {/* emotion plate */}
      <p
        className={`mb-2 border-2 border-black bg-black py-0.5 text-center text-sm tracking-[0.08em] ${emotion.className}`}
      >
        {emotion.label}
      </p>

      {/* face, over the halftone field */}
      <div className="relative aspect-square w-full overflow-hidden border-2 border-black bg-white">
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(0,0,0,0.26) 1px, transparent 1px)',
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
      <div className="mt-2 space-y-1.5">
        <StatBar icon={<Heart />} fill="bg-hp" value="120/120" />
        <StatBar icon={<Droplet />} fill="bg-mp" value="73/73" />
      </div>
    </div>
  )
}

function StatBar({ icon, fill, value }) {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <span className="relative h-[13px] flex-1 overflow-hidden rounded-full border-2 border-black bg-black">
        <span className={`absolute inset-0 rounded-full ${fill}`} />
        <span className="absolute inset-0 flex items-center justify-center font-hand text-[10px] leading-none text-white">
          {value}
        </span>
      </span>
    </div>
  )
}

function Heart() {
  return (
    <svg viewBox="0 0 16 15" className="w-3.5 shrink-0 text-hp" fill="currentColor">
      <path d="M8 14.5S.8 9.6.8 5.3A4.1 4.1 0 0 1 8 2.7a4.1 4.1 0 0 1 7.2 2.6C15.2 9.6 8 14.5 8 14.5Z" />
    </svg>
  )
}

function Droplet() {
  return (
    <svg viewBox="0 0 16 15" className="w-3.5 shrink-0 text-mp" fill="currentColor">
      <path d="M8 .8s5.4 6 5.4 9.1a5.4 5.4 0 0 1-10.8 0C2.6 6.8 8 .8 8 .8Z" />
    </svg>
  )
}

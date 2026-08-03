import { useSpace } from '../theme/useSpace'

const VARIANTS = {
  hero: { cord: 'h-16', bulb: 'h-20 w-16' },
  corner: { cord: 'h-6', bulb: 'h-10 w-8' },
}

export default function Lightbulb({ variant = 'hero' }) {
  const { space, toggleSpace } = useSpace()
  const lit = space === 'white'
  const size = VARIANTS[variant]

  return (
    <button
      type="button"
      onClick={toggleSpace}
      aria-pressed={!lit}
      aria-label={lit ? 'Turn off the light' : 'Turn on the light'}
      className="group flex cursor-pointer flex-col items-center border-0 bg-transparent p-0 text-ink"
    >
      <span aria-hidden="true" className={`w-1 bg-ink ${size.cord}`} />
      <svg
        aria-hidden="true"
        viewBox="0 0 24 32"
        className={`${size.bulb} transition-transform duration-150 group-hover:translate-y-1`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="9" />
        <rect x="8" y="21" width="8" height="4" />
        <rect x="9" y="26" width="6" height="4" />
        {lit && (
          <g strokeLinecap="square">
            <path d="M12 1V0M2 12H1M23 12h-1M4.5 4.5l-1-1M19.5 4.5l1-1" />
          </g>
        )}
        {!lit && (
          <circle cx="12" cy="12" r="7" fill="currentColor" opacity="0.15" />
        )}
      </svg>
    </button>
  )
}

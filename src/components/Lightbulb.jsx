import { useSpace } from '../theme/useSpace'

const VARIANTS = {
  hero: { cord: 'h-20', bulb: 'h-32 w-28' },
  nav: { cord: 'h-2', bulb: 'h-9 w-7' },
}

// Short dashes radiating off the glass. Skipped near the top so they never
// collide with the cord.
const RAYS = [
  'M22 116h12',
  'M106 116h12',
  'M27 86l9 7',
  'M113 86l-9 7',
  'M27 148l9-7',
  'M113 148l-9-7',
  'M70 170v9',
  'M48 164l5-8',
  'M92 164l-5-8',
]

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
      {/* the cord is plain CSS so its length can vary per variant */}
      <span aria-hidden="true" className={`w-[3px] bg-ink ${size.cord}`} />
      <svg
        aria-hidden="true"
        viewBox="0 0 140 182"
        className={`${size.bulb} transition-transform duration-200 group-hover:translate-y-1`}
        fill="none"
        stroke="currentColor"
      >
        {/* the last stretch of cord, meeting the base */}
        <path d="M70 0v52" strokeWidth="3" />

        {/* screw base, with threads knocked out of it */}
        <rect x="60" y="50" width="20" height="30" fill="currentColor" />
        <g stroke="var(--void)" strokeWidth="2.5">
          <path d="M61 58h18" />
          <path d="M61 66h18" />
          <path d="M61 74h18" />
        </g>

        {/* glass */}
        <path
          d="M60 76C60 88 42 96 42 116C42 140 54 156 70 156C86 156 98 140 98 116C98 96 80 88 80 76Z"
          fill="currentColor"
        />

        {/* filament — the one place red shows up while the light is out */}
        <path
          d="M63 96C63 106 77 105 77 114C77 123 63 122 63 131C63 138 69 141 74 138"
          stroke={lit ? 'var(--void)' : 'var(--blood)'}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {lit && (
          <g strokeWidth="3" strokeLinecap="round">
            {RAYS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        )}
      </svg>
    </button>
  )
}

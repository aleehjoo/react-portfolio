import Placeholder from './Placeholder'

/*
 * The portrait gets attacked on hover: it flinches and red slashes are drawn
 * across it.
 *
 * The slashes are a stand-in. To use the red-hands GIF instead, drop it in
 * src/assets/, import it, and replace the <svg> below with:
 *   <img src={hands} alt="" className="h-full w-full object-cover" />
 * Everything else — the hover trigger, the flinch, the reduced-motion
 * handling — stays as it is.
 */
const SLASHES = ['M12 18L86 74', 'M20 74L88 22', 'M8 52L72 96']

export default function Portrait() {
  return (
    <div className="group mx-auto aspect-square w-40">
      <div className="relative h-full w-full group-hover:animate-recoil">
        <Placeholder label="[ PHOTO ]" className="h-full w-full" />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
        >
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            fill="none"
            stroke="var(--blood)"
            strokeWidth="7"
            strokeLinecap="round"
          >
            {SLASHES.map((d) => (
              <path
                key={d}
                d={d}
                pathLength="120"
                strokeDasharray="120"
                className="group-hover:animate-slash"
              />
            ))}
          </svg>
        </span>
      </div>
    </div>
  )
}

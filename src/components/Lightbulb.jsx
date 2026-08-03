import { useSpace } from '../theme/useSpace'
import bulb from '../assets/animated-lightbulb.gif'

/*
 * The bulb is the supplied 128x744 animated GIF, which already swings on its
 * own — no CSS animation needed, and the cord is part of the same artwork so
 * it can never mismatch the way a separate CSS cord did.
 *
 * Within that frame the bulb sits at y 565-731; everything above is cord. The
 * image is anchored to the bottom of a shorter box, so the box height decides
 * how much cord shows and the rest is clipped off the top — which reads as the
 * cord carrying on upward, behind the navbar.
 */
const BULB_TOP = 565
const FRAME = { w: 128, h: 744 }

const VARIANTS = {
  hero: { width: 115, height: 260 },
  // absolute so the navbar's height stays fixed no matter the bulb
  nav: { width: 30, height: 56, position: 'absolute left-0 top-0' },
}

export default function Lightbulb({ variant = 'hero' }) {
  const { space, toggleSpace } = useSpace()
  const lit = space === 'white'
  const { width, height, position = '' } = VARIANTS[variant]

  // How much of the box the bulb itself takes, so callers can reason about it.
  const bulbHeight = Math.round(((FRAME.h - BULB_TOP) * width) / FRAME.w)

  return (
    <button
      type="button"
      onClick={toggleSpace}
      aria-pressed={!lit}
      aria-label={lit ? 'Turn off the light' : 'Turn on the light'}
      title={lit ? 'Turn off the light' : 'Turn on the light'}
      className={`group block cursor-pointer border-0 bg-transparent p-0 ${position}`}
      style={{ width, height }}
    >
      <span
        aria-hidden="true"
        data-bulb-height={bulbHeight}
        className={`block bg-bottom bg-no-repeat transition-transform duration-200 group-hover:scale-105 ${
          // the artwork is drawn for White Space; Black Space inverts it to the
          // dim grey of a bulb that has gone out, not a glaring white one
          lit ? '' : '[filter:invert(1)_brightness(0.82)]'
        }`}
        style={{
          width,
          height,
          backgroundImage: `url(${bulb})`,
          backgroundSize: `${width}px auto`,
          transformOrigin: 'top center',
        }}
      />
    </button>
  )
}

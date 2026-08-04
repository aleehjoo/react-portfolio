import pointer from '../assets/finger-pointer.gif'

/*
 * The menu cursor. The GIF is 800x200 but the hand only occupies x 202-549,
 * y 9-176 — the rest is padding, which would push the cursor miles off the
 * label. So the frame is scaled and offset to show just that content box.
 */
const FRAME = { w: 800, h: 200 }
const CONTENT = { x: 202, y: 9, w: 348, h: 168 }
const HEIGHT = 17

const scale = HEIGHT / CONTENT.h

export default function HandCursor({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 bg-no-repeat ${className}`}
      style={{
        width: `${CONTENT.w * scale}px`,
        height: `${HEIGHT}px`,
        backgroundImage: `url(${pointer})`,
        backgroundSize: `${FRAME.w * scale}px ${FRAME.h * scale}px`,
        backgroundPosition: `${-CONTENT.x * scale}px ${-CONTENT.y * scale}px`,
      }}
    />
  )
}

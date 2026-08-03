/*
 * The menu cursor, drawn rather than typed. The OMORI faces have no ☞ glyph,
 * so a text cursor would fall back to a system font — and render as a colour
 * emoji on some platforms.
 */
export default function HandCursor({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 10"
      className={`w-4 shrink-0 ${className}`}
      fill="currentColor"
    >
      <rect x="0" y="2" width="2" height="6" />
      <rect x="3" y="2" width="5" height="6" />
      <rect x="7" y="4" width="6" height="2" />
    </svg>
  )
}

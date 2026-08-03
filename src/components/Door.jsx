/*
 * A door, drawn rather than built from borders. Divs gave a plain thick
 * rectangle; this gets the thinner outline, the lintel across the top, the
 * two hinges on the jamb and the small square handle.
 */
export default function Door({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 90"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      {/* leaf */}
      <rect x="10" y="6" width="42" height="78" fill="var(--void)" />
      {/* lintel */}
      <path d="M10 14h42" />
      {/* hinges, straddling the jamb */}
      <rect x="6" y="28" width="8" height="11" fill="var(--void)" />
      <rect x="6" y="55" width="8" height="11" fill="var(--void)" />
      {/* handle */}
      <rect x="41" y="46" width="6" height="6" fill="var(--void)" />
    </svg>
  )
}

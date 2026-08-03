/*
 * A door, drawn rather than built from borders. Divs gave a plain thick
 * rectangle; this gets the thinner outline, the lintel across the top, the
 * two square hinges on the jamb and the small handle.
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
      {/* lintel, sitting close under the top edge */}
      <path d="M10 11h42" />
      {/* hinges — two small squares straddling the jamb, not long bars */}
      <rect x="7" y="28" width="6" height="6" fill="var(--void)" />
      <rect x="7" y="56" width="6" height="6" fill="var(--void)" />
      {/* handle */}
      <rect x="42" y="47" width="5" height="5" fill="var(--void)" />
    </svg>
  )
}

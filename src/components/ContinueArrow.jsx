/*
 * The blinking "there is more" arrow. Drawn for the same reason as the
 * cursor: ▼ is not in the OMORI faces.
 */
export default function ContinueArrow({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 8"
      className={`w-3 ${className}`}
      fill="currentColor"
    >
      <path d="M0 0h10L5 8z" />
    </svg>
  )
}

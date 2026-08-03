export default function Placeholder({ label, className = '' }) {
  return (
    <div
      className={`flex items-center justify-center border-4 border-dashed border-ink/40 bg-void text-sm text-muted ${className}`}
    >
      {label}
    </div>
  )
}

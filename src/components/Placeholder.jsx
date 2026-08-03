export default function Placeholder({ label, className = '' }) {
  return (
    <div
      className={`flex items-center justify-center border-4 border-dashed border-ink/40 bg-void text-xs tracking-[0.2em] text-muted ${className}`}
    >
      {label}
    </div>
  )
}

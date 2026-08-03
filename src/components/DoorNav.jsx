const DOORS = [
  { id: 'about-me', label: 'ABOUT ME' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact-me', label: 'CONTACT ME' },
]

export default function DoorNav() {
  return (
    <nav
      aria-label="Sections"
      className="flex flex-wrap justify-center gap-10 sm:gap-16"
    >
      {DOORS.map((door) => (
        <a
          key={door.id}
          href={`#${door.id}`}
          className="group flex flex-col items-center gap-4 no-underline"
        >
          <span className="relative block h-28 w-20 border-4 border-ink bg-void transition-transform duration-200 group-hover:-translate-y-1">
            <span className="absolute right-2 top-1/2 block h-2 w-2 -translate-y-1/2 bg-ink" />
          </span>
          <span className="text-xs tracking-[0.2em] text-ink">{door.label}</span>
        </a>
      ))}
    </nav>
  )
}

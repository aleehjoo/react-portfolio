import { SECTIONS } from '../data/sections'

export default function DoorNav() {
  return (
    <nav
      aria-label="Doors"
      className="flex flex-wrap justify-center gap-10 sm:gap-16"
    >
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group flex flex-col items-center gap-4 no-underline"
        >
          <span className="relative block h-28 w-20 border-4 border-ink bg-void transition-transform duration-200 group-hover:-translate-y-1">
            <span className="absolute right-2 top-1/2 block h-2 w-2 -translate-y-1/2 rounded-full bg-ink" />
          </span>
          <span className="text-sm text-ink">{section.label}</span>
        </a>
      ))}
    </nav>
  )
}

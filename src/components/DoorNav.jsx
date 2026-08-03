import Door from './Door'
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
          <Door className="h-28 w-auto text-ink transition-transform duration-200 group-hover:-translate-y-1" />
          <span className="text-sm text-ink">{section.label}</span>
        </a>
      ))}
    </nav>
  )
}

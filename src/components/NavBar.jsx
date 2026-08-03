import Lightbulb from './Lightbulb'
import { SECTIONS } from '../data/sections'

export default function NavBar() {
  return (
    <header className="sticky top-0 z-20 h-16 border-b-4 border-ink bg-void">
      <div className="mx-auto flex h-full w-full max-w-4xl items-center justify-between gap-4 px-6">
        <a
          href="#top"
          className="text-sm tracking-[0.1em] text-ink no-underline sm:text-base"
        >
          ALEJANDRO UMILA
        </a>

        <div className="flex items-center gap-4 sm:gap-7">
          <nav aria-label="Sections" className="flex items-center gap-4 sm:gap-7">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-xs text-ink no-underline hover:text-blood sm:text-sm"
              >
                {section.label}
              </a>
            ))}
          </nav>

          {/*
            Fixed-size well: the bulb is absolutely positioned inside it and
            hangs off the header's top edge, so it can't change the 64px height
            that the hero's min-height calculation depends on.
          */}
          <div className="relative h-full w-[30px]">
            <Lightbulb variant="nav" />
          </div>
        </div>
      </div>
    </header>
  )
}

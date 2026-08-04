import Placeholder from './Placeholder'

export default function ProjectCard({ title, description, tags, href }) {
  const screenshot = (
    <Placeholder label="[ SCREENSHOT ]" className="aspect-4/3 w-full" />
  )

  return (
    <article className="group flex flex-col gap-4 border-4 border-ink bg-void p-5 transition-transform duration-200 hover:-translate-y-1.5">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title}`}
          className="relative block"
        >
          {screenshot}
          {/* Only the screenshot opens the project, so it says so on hover. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-box/85 text-sm tracking-[0.1em] text-blood opacity-0 transition-opacity duration-150 hover:opacity-100 group-focus-within:opacity-100"
          >
            OPEN PROJECT
          </span>
        </a>
      ) : (
        screenshot
      )}

      <h3 className="text-xl text-ink transition-colors duration-150 group-hover:text-blood">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-muted">{description}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="border-2 border-ink px-2 py-0.5 text-xs text-ink"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  )
}

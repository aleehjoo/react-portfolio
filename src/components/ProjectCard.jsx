import Placeholder from './Placeholder'

export default function ProjectCard({ title, description, tags }) {
  return (
    <article className="flex flex-col gap-4 border-4 border-ink bg-void p-5">
      <Placeholder label="[ SCREENSHOT ]" className="aspect-4/3 w-full" />
      <h3 className="text-lg tracking-[0.15em] text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="border-2 border-ink px-2 py-0.5 text-[0.65rem] tracking-[0.15em] text-ink"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  )
}

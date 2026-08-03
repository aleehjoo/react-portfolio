export default function MenuOption({ label, href, external }) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <li>
      <a
        href={href}
        {...externalProps}
        className="group flex items-center gap-4 px-4 py-3 text-ink no-underline"
      >
        {/* The cursor is driven by :hover / :focus-visible, so no JS state. */}
        <span
          aria-hidden="true"
          className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          ▶
        </span>
        <span className="tracking-[0.2em] transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1">
          {label}
        </span>
      </a>
    </li>
  )
}

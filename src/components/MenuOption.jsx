import HandCursor from './HandCursor'

export default function MenuOption({ label, href, external }) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <li>
      <a
        href={href}
        {...externalProps}
        className="group flex items-center gap-3 px-3 py-2 text-box-ink no-underline"
      >
        {/* The cursor is driven by :hover / :focus-visible, so no JS state. */}
        <HandCursor className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100" />
        <span className="text-lg transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1">
          {label}
        </span>
      </a>
    </li>
  )
}

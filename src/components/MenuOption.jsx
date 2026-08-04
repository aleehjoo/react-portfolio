import HandCursor from './HandCursor'

export default function MenuOption({ label, href, external }) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <li>
      {/* No flex gap: the cursor carries its own negative margins, since its
          artwork has transparent padding baked into the frame. */}
      <a
        href={href}
        {...externalProps}
        className="group flex items-center px-4 py-2 text-box-ink no-underline"
      >
        {/* Driven by :hover / :focus-visible, so no JS state. */}
        <HandCursor className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100" />
        <span className="text-lg transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1">
          {label}
        </span>
      </a>
    </li>
  )
}

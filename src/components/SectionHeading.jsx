export default function SectionHeading({ title, flavor }) {
  return (
    <header className="mb-12 text-center">
      <h2 className="text-3xl tracking-[0.25em] text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-sm tracking-[0.2em] text-muted">{flavor}</p>
    </header>
  )
}

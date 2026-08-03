import SectionHeading from '../components/SectionHeading'
import MenuOption from '../components/MenuOption'
import { contactLinks } from '../data/links'

export default function ContactMe() {
  return (
    <section id="contact-me" className="scroll-mt-16 px-6 py-24">
      <SectionHeading title="CONTACT ME" flavor="SAY SOMETHING." />
      <ul className="mx-auto flex max-w-sm list-none flex-col border-4 border-ink bg-void p-4">
        {contactLinks.map((link) => (
          <MenuOption
            key={link.label}
            label={link.label}
            href={link.href}
            external={link.external}
          />
        ))}
      </ul>
    </section>
  )
}

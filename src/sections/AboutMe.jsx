import SectionHeading from '../components/SectionHeading'
import Placeholder from '../components/Placeholder'
import DialogueBox from '../components/DialogueBox'

const BIO = `PLACEHOLDER BIO.

Write a few sentences here about who you are, what you study, and what you like to build. Replace this text in src/sections/AboutMe.jsx when the real copy is ready.`

export default function AboutMe() {
  return (
    <section id="about-me" className="scroll-mt-16 px-6 py-24">
      <SectionHeading title="ABOUT ME" flavor="A FACE IN THE WHITE." />
      <div className="grid gap-8 sm:grid-cols-[10rem_1fr] sm:items-start">
        <Placeholder label="[ PHOTO ]" className="mx-auto aspect-square w-40" />
        <DialogueBox text={BIO} />
      </div>
    </section>
  )
}

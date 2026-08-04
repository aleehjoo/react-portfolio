import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Portrait from '../components/Portrait'
import DialogueBox from '../components/DialogueBox'

// Three separate things to say, not one thing said three ways. Clicking the
// window moves to the next and wraps around.
const LINES = [
  'A computer science undergraduate. Most of what I build ends up on the web — React on the front, whatever the project actually needs behind it.',
  'I like the part where a rough idea turns into something you can click. Most of my projects started because someone real needed the thing: a gym with no website, a stockroom nobody could count.',
  'This whole site is OMORI’s fault. I have replayed it more times than I will admit, and I had been waiting for an excuse to build something inside White Space.',
]

export default function AboutMe() {
  const [line, setLine] = useState(0)

  return (
    <section id="about-me" className="scroll-mt-20 px-6 py-24">
      <SectionHeading title="ABOUT ME" flavor="A FACE IN THE WHITE." />
      <div className="grid gap-8 sm:grid-cols-[11rem_1fr] sm:items-start">
        <Portrait />
        <DialogueBox
          speaker="ALEJANDRO UMILA"
          text={LINES[line]}
          cycle={line}
          onAdvance={() => setLine((n) => (n + 1) % LINES.length)}
        />
      </div>
    </section>
  )
}

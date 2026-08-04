import Lightbulb from '../components/Lightbulb'
import DoorNav from '../components/DoorNav'

export default function Hero({ bulbRef }) {
  return (
    // The bulb sits flush against the section's top edge so its cord reads as
    // continuing up behind the navbar, rather than starting in mid-air.
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center px-6 pb-12">
      <Lightbulb variant="hero" ref={bulbRef} />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 pt-4">
        <div className="text-center">
          <h1 className="text-4xl tracking-[0.12em] text-ink sm:text-5xl">
            ALEJANDRO UMILA
          </h1>
          <p className="mt-4 text-base tracking-[0.1em] text-muted">
            WAITING FOR SOMETHING TO HAPPEN?
          </p>
        </div>
        <DoorNav />
      </div>
    </section>
  )
}

import Lightbulb from '../components/Lightbulb'
import DoorNav from '../components/DoorNav'

export default function Hero({ ref }) {
  return (
    <section
      ref={ref}
      className="flex min-h-screen flex-col items-center justify-center gap-12 px-6 py-20"
    >
      <Lightbulb variant="hero" />
      <div className="text-center">
        <h1 className="text-4xl tracking-[0.3em] text-ink sm:text-6xl">
          ALEJANDRO UMILA
        </h1>
        <p className="mt-6 text-sm tracking-[0.3em] text-muted">SOMETHING...</p>
      </div>
      <DoorNav />
    </section>
  )
}

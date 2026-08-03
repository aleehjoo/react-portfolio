import Lightbulb from '../components/Lightbulb'
import DoorNav from '../components/DoorNav'

export default function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 px-6 pb-12 pt-2">
      <Lightbulb variant="hero" />
      <div className="text-center">
        <h1 className="text-4xl tracking-[0.12em] text-ink sm:text-5xl">
          ALEJANDRO UMILA
        </h1>
        <p className="mt-4 text-base tracking-[0.1em] text-muted">
          SOMETHING...
        </p>
      </div>
      <DoorNav />
    </section>
  )
}

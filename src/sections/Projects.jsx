import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 px-6 py-24">
      <SectionHeading title="PROJECTS" flavor="PAGES FROM THE SKETCHBOOK." />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags}
            href={project.href}
          />
        ))}
      </div>
    </section>
  )
}

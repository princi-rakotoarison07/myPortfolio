import React from 'react'
import SectionTitle from '../components/SectionTitle'
import ProjectCard from '../components/ProjectCard'
import { projectsList } from '../components/constants/constants'

function Projects() {
  return (
    <section id="projects" className='max-h-screen  max-w-screen flex flex-col overflow-hidden bg-white text-zinc-900 py-4 md:py-6 px-6'>
      <SectionTitle title="PROJECTS" theme='black'/>
      {projectsList.map((project, index) => {
        return (
          <ProjectCard
          key = {index}
            title={project.title}
            desc={project.desc}
            stacks={project.stacks}
            images={project.images}
          />
        )
      })}
    </section>
  )
}

export default Projects
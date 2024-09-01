'use client'

import { useMockUserProjects } from '@/mock-data/store/use-mock-user-projects'
import { ProjectHeader } from './project-header'
import { Tasks } from './tasks'
import { useParams } from 'next/navigation'

export const ProjectInfo = () => {
  const params = useParams()
  const [userProjects] = useMockUserProjects()

  // API使用時には必要なくなる
  const projectId = Number(params.projectId)-1
  const project = userProjects[projectId]

  return (
    <div className='flex-grow flex flex-col'>
      <ProjectHeader
        name={project.name}
        description={project.description}
        dueData={project.dueData}
        status={project.status}
      />
      <Tasks />
    </div>
  )
}

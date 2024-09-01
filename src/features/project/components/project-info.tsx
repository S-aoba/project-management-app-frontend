'use client'

import { useMockUserProjects } from '@/mock-data/store/use-mock-user-projects'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ProjectHeader } from './project-header'
import { Tasks } from './tasks'

export const ProjectInfo = () => {
  const params = useParams()
  const [userProjects] = useMockUserProjects()

  // API使用時には必要なくなる
  const projectId = Number(params.projectId)
  const project = userProjects.filter((project) => project.id === projectId)[0]

  if (!project)
    return (
      <div className='w-full flex items-center justify-center'>
        <Loader2 className='animate-spin size-10 text-muted-foreground' />
      </div>
    )

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

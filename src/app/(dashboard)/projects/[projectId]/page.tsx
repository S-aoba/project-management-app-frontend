'use client'

import { ProjectInfo } from '@/features/project/components/project-info'
import { UserList } from '@/features/project/components/user-list'

const ProjectDetailPage = () => {
  return (
    <div className='h-full flex-grow flex justify-between'>
      <ProjectInfo />
      <UserList />
    </div>
  )
}

export default ProjectDetailPage

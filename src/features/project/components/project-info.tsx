import { ProjectHeader } from './project-header'
import { Tasks } from './tasks'

export const ProjectInfo = () => {
  return (
    <div className='flex-grow flex flex-col'>
      <ProjectHeader />
      <Tasks />
    </div>
  )
}

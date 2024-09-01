'use client'

import Link from 'next/link'

import { Button } from './ui/button'

import { useCreateProjectModal } from '@/features/project/store/use-create-project-modal'
import { useMockUserProjects } from '@/mock-data/store/use-mock-user-projects'

export const Navigation = () => {
  const [mockUserProjects] = useMockUserProjects()
  const [_open, setOpen] = useCreateProjectModal()

  return (
    <div className='h-full flex flex-col space-y-4 py-8 px-2 w-60 border-r'>
      <Button onClick={() => setOpen(true)}>Create Project</Button>
      <hr className='border-foreground ' />
      {mockUserProjects.map((project) => (
        <NavigationItem key={project.id} name={project.name} id={project.id} />
      ))}
    </div>
  )
}

const NavigationItem = ({ name, id }: { name: string; id: number }) => {
  return (
    <Link href={`/projects/${id}`}>
      <div className='p-2 text-center rounded group border hover:cursor-pointer hover:bg-muted transition-colors duration-300'>
        <p className='text-muted-foreground group-hover:text-black text-sm transition-colors duration-300 line-clamp-1'>
          {name}
        </p>
      </div>
    </Link>
  )
}

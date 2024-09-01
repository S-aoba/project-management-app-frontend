'use client'

import { useMockUserProjects } from '@/mock-data/store/use-mock-user-projects'
import Link from 'next/link'

export const Navigation = () => {
  const [mockUserProjects] = useMockUserProjects()

  return (
    <div className='h-full flex flex-col space-y-4 py-8 px-2 w-60 border-r'>
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

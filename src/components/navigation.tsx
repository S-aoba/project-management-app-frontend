'use client'

import Link from 'next/link'

import { Button } from './ui/button'

import { useAuth } from '@/features/auth/api/use-auth'
import { useCreateProjectModal } from '@/features/project/store/use-create-project-modal'
import { useMockUserProjects } from '@/mock-data/store/use-mock-user-projects'
import { useState } from 'react'

export const Navigation = () => {
  const [mockUserProjects] = useMockUserProjects()
  const [_open, setOpen] = useCreateProjectModal()
  const [error, setError] = useState('')

  const { logout, isLogoutPending } = useAuth({ setError })

  return (
    <div className='h-full flex flex-col py-8 px-2 w-60 border-r'>
      <div className='flex flex-col flex-1 space-y-4'>
        <Button onClick={() => setOpen(true)}>Create Project</Button>
        <hr className='border-foreground ' />
        {mockUserProjects.map((project) => (
          <NavigationItem
            key={project.id}
            name={project.name}
            id={project.id}
          />
        ))}
      </div>
      <Button
        variant={'outline'}
        className='mt-auto'
        onClick={() => logout()}
        disabled={isLogoutPending}>
        Logout
      </Button>
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

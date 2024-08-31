'use client'

import { useEffect, useState } from 'react'

import { Project } from '@/mock-data/user-projects'
import { useCreateProjectModal } from '@/features/project/store/use-create-project-modal'

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const [open, setOpen] = useCreateProjectModal()

  const [userProjects, _] = useState<Project[]>([])

  const projectId = userProjects[0]?.id

  useEffect(() => {
    if (projectId) {
      console.log('Transitioning user.')
    } else if (!open) {
      setOpen(true)
    }
  }, [projectId, open, setOpen])
}

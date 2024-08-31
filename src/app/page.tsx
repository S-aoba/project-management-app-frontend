'use client'

import { useEffect, useState } from 'react'

import { Project } from '@/mock-data/user-projects'
import { useCreateProjectModal } from '@/features/project/store/use-create-project-modal'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const [open, setOpen] = useCreateProjectModal()

  const [userProjects, _] = useState<Project[]>([])

  const projectId = userProjects[0]?.id

  useEffect(() => {
    if (projectId) {
      router.replace('/test');
    } else if (!open) {
      setOpen(true)
    }
  }, [projectId, open, setOpen])
}

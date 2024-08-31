'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useCreateProjectModal } from '@/features/project/store/use-create-project-modal'
import { useMockUserProjects } from '@/mock-data/store/use-mock-user-projects'

export default function Home() {
  const router = useRouter()

  const [open, setOpen] = useCreateProjectModal()

  const [mockUserProjects, _] = useMockUserProjects()

  const projectId = mockUserProjects[0]?.id

  useEffect(() => {
    if (projectId) {
      router.replace(`/projects/${projectId}`)
    } else if (!open) {
      setOpen(true)
    }
  }, [projectId, open, setOpen, router])
}

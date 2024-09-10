'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import { useProjects } from '@/features/project/api/use-projects'
import { useCreateProjectModal } from '@/features/project/store/use-create-project-modal'

export default function Home() {
  const router = useRouter()

  const [open, setOpen] = useCreateProjectModal()

  const { userProjects, isUserProjectsPending } = useProjects()
  const projectId = useMemo(() => userProjects?.data[0]?.id, [userProjects])

  useEffect(() => {
    if (isUserProjectsPending) return

    if (projectId) {
      setOpen(false)
      router.replace(`/projects/${projectId}`)
    } else if (!open) {
      setOpen(true)
    }
  }, [projectId, open, setOpen, router, isUserProjectsPending])
}

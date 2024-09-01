'use client'

import { useEffect, useState } from 'react'

import { CreateProjectModal } from '@/features/project/components/create-project-modal'
import { CreateTaskModal } from '@/features/project/components/create-task-modal copy'
import { DeleteProjectModal } from '@/features/project/components/delete-project-modal'
import { EditProjectModal } from '@/features/project/components/edit-project-modal'

export const Modals = () => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CreateProjectModal />
      <EditProjectModal />
      <DeleteProjectModal />

      <CreateTaskModal />
    </>
  )
}

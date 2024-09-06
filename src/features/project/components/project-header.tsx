'use client'

import { useParams } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { useUserProjects } from '../api/use-projects'

import { Skeleton } from '@/components/ui/skeleton'
import { useDeleteProjectModal } from '../store/use-delete-project-modal'
import { useEditProjectModal } from '../store/use-edit-project-modal'

export const ProjectHeader = () => {
  const [_, setDeleteProjectModalOpen] = useDeleteProjectModal()
  const [__, setEditProjectModalOpen] = useEditProjectModal()

  const params = useParams()
  const projectId = Number(params.projectId)

  const { singleProject, isSingleProjectPending } = useUserProjects(projectId)
  const project = singleProject?.data[0]

  const name = project?.name
  const status = project?.status
  const dueData = project?.dueData
  const description = project?.description

  return (
    <>
      {isSingleProjectPending ? (
        <div className='py-8 border-b'>
          <div className='flex items-center justify-start space-x-4 border-b px-2 pb-2'>
            <Skeleton className='w-20 h-4 bg-slate-300' />
            <Skeleton className='w-20 h-4 bg-slate-300' />
            <Skeleton className='w-20 h-4 bg-slate-300' />
            <Button
              disabled={isSingleProjectPending}
              size={'sm'}
              variant={'outline'}>
              Edit Project
            </Button>
            <Button
              disabled={isSingleProjectPending}
              size={'sm'}
              variant={'destructive'}>
              Delete Project
            </Button>
          </div>
          <div className='space-y-2 mt-4 p-2'>
            <h2 className='text-xl font-semibold mb-2'>概要</h2>
            <Skeleton className='w-20 h-4 bg-slate-300' />
            <Skeleton className='w-36 h-4 bg-slate-300' />
            <Skeleton className='w-56 h-4 bg-slate-300' />
          </div>
        </div>
      ) : (
        <div className='py-8 border-b'>
          <div className='flex items-center justify-start space-x-4 border-b px-2 pb-2'>
            <h1 className='text-2xl text-foreground'>{name}</h1>
            <Badge variant={'default'}>{status}</Badge>
            <p className='text-sm text-muted-foreground'>{dueData}</p>
            <Button
              size={'sm'}
              variant={'outline'}
              onClick={() => setEditProjectModalOpen(true)}>
              Edit Project
            </Button>
            <Button
              size={'sm'}
              variant={'destructive'}
              onClick={() => setDeleteProjectModalOpen(true)}>
              Delete Project
            </Button>
          </div>
          <div className='mt-4 p-2'>
            <h2 className='text-xl font-semibold mb-2'>概要</h2>
            <p className='text-sm text-foreground'>{description}</p>
          </div>
        </div>
      )}
    </>
  )
}

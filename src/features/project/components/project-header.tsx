'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Project } from '@/mock-data/user-projects'
import { useDeleteProjectModal } from '../store/use-delete-project-modal'

type Props = Pick<Project, 'name' | 'description' | 'dueData' | 'status'>

export const ProjectHeader = ({
  name,
  description,
  dueData,
  status,
}: Props) => {
  const [_open, setOpen] = useDeleteProjectModal()

  return (
    <div className='py-8 border-b'>
      <div className='flex items-center justify-start space-x-4 border-b px-2 pb-2'>
        <h1 className='text-2xl text-foreground'>{name}</h1>
        <Badge variant={'default'}>{status}</Badge>
        <p className='text-sm text-muted-foreground'>{dueData}</p>
        <Button
          size={'sm'}
          variant={'destructive'}
          onClick={() => setOpen(true)}>
          Delete Project
        </Button>
      </div>
      <div className='mt-4 p-2'>
        <h2 className='text-xl font-semibold mb-2'>概要</h2>
        <p className='text-sm text-foreground'>{description}</p>
      </div>
    </div>
  )
}

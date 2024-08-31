'use client'

import { Badge } from '@/components/ui/badge'
import { Project } from '@/mock-data/user-projects'

type Props = Pick<Project, 'name' | 'description' | 'dueData' | 'status'>

export const ProjectHeader = ({
  name,
  description,
  dueData,
  status,
}: Props) => {
  return (
    <div className='flex flex-col py-8 px-2 border-b'>
      <div className='flex items-center justify-start space-x-4 border-b pb-2'>
        <h1 className='text-2xl text-foreground'>{name}</h1>
        <Badge variant={'default'}>{status}</Badge>
        <p className='text-sm text-muted-foreground'>{dueData}</p>
      </div>
      <div className='mt-4 py-2'>
        <h2 className='text-xl font-semibold mb-2'>概要</h2>
        <p className='text-sm text-foreground'>{description}</p>
      </div>
    </div>
  )
}

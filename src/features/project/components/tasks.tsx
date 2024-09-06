'use client'

import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useProjects } from '../api/use-projects'
import { useCreateTaskProjectModal } from '../store/use-create-task-modal'

export const Tasks = () => {
  const params = useParams()
  const projectId = Number(params.projectId)

  const { singleProject, isSingleProjectPending } = useProjects(projectId)

  const [_, setOpen] = useCreateTaskProjectModal()

  return (
    <div className='h-full flex flex-col'>
      <div className='border-b p-2'>
        <h1 className='text-2xl'>Tasks</h1>
      </div>
      <div className='h-full p-4 flex flex-col space-y-4'>
        <Input className='w-60' placeholder='Search Task...' />
        <div>
          <Button onClick={() => setOpen(true)}>Create Task</Button>
        </div>
        {isSingleProjectPending ? (
          <div className='h-full flex items-center justify-center'>
            <Loader2 className='size-8 text-slate-300 animate-spin' />
          </div>
        ) : (
          <DataTable columns={columns} data={singleProject!.tasks} />
        )}
      </div>
    </div>
  )
}

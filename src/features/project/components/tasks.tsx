'use client'

import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMockTask } from '@/mock-data/store/use-mock-task'
import { useCreateTaskProjectModal } from '../store/use-create-task-modal'

export const Tasks = () => {
  const [tasks, setTasks] = useMockTask()
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
        <DataTable columns={columns} data={tasks} />
      </div>
    </div>
  )
}

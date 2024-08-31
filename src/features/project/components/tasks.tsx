'use client'

import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import { useMockTask } from '@/mock-data/store/use-mock-task'

export const Tasks = () => {
  const [task] = useMockTask()

  return (
    <div className='h-full flex flex-col'>
      <div className='border-b p-2'>
        <h1 className='text-2xl'>Tasks</h1>
      </div>
      <div className='h-full p-4 flex flex-col space-y-4'>
        <Input className='w-60' placeholder='Search Task...' />
        <DataTable columns={columns} data={task} />
      </div>
    </div>
  )
}

'use client'

import {
  useEditTaskId,
  useEditTaskModal,
} from '@/features/project/store/use-edit-task-modal'
import { useMockTask } from '@/mock-data/store/use-mock-task'
import { TaskType } from '@/types/type'
import { ColumnDef } from '@tanstack/react-table'
import { useParams, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'

export const columns: ColumnDef<TaskType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'dueDate',
    header: 'DueDate',
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
  },
  {
    accessorKey: 'assignedUserId',
    header: 'AssignedUser',
  },
  {
    accessorKey: 'createdBy',
    header: 'CreatedBy',
  },
  {
    accessorKey: 'createdAt',
    header: 'CreatedAt',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const router = useRouter()
      const params = useParams()
      const projectId = Number(params.projectId)

      const [_, setTasks] = useMockTask()
      const [__, setOpen] = useEditTaskModal()
      const [___, setEditTaskId] = useEditTaskId()

      const id = row.original.id

      // const onClick = () => {
      //   setTasks((prev) => prev.filter((task) => task.id !== id))
      // }

      const onEdit = () => {
        setEditTaskId(Number(id))
        setOpen(true)
      }

      return (
        <div className='flex space-x-2'>
          <Button size={'sm'} variant='outline' onClick={onEdit}>
            Edit
          </Button>
          <Button size={'sm'} variant='destructive'>
            Delete
          </Button>
        </div>
      )
    },
  },
]

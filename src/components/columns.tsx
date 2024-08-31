'use client'

import { Task } from '@/mock-data/task'
import { ColumnDef } from '@tanstack/react-table'



export const columns: ColumnDef<Task>[] = [
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
]

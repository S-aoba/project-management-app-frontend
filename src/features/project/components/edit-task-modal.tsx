'use client'

import React, { useState } from 'react'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useMockTask } from '@/mock-data/store/use-mock-task'
import { useEditTaskId, useEditTaskModal } from '../store/use-edit-task-modal'

export const EditTaskModal = () => {
  const [taskId, _] = useEditTaskId()

  const [open, setOpen] = useEditTaskModal()

  const [mockTask, setMockTask] = useMockTask()
  const task = mockTask.filter((task) => Number(task.id) === taskId)[0]

  const [name, setName] = useState(task?.name)
  const [description, setDescription] = useState(task?.description)
  const [status, setStatus] = useState<'progress' | 'is_pending' | 'completed'>(
    task?.status,
  )
  const [date, setDate] = useState<Date | undefined>(
    task?.dueDate ? new Date(task?.dueDate) : new Date(),
  )

  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(
    task?.priority,
  )

  // assignedUserIdに関しては処理が少し複雑なので後ほど実装する
  // const [assignedUserId, setAssignedUserId] = useState(task?.assignedUserId)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: API連携に切り替える
    const updatedTask = mockTask.map((task) => {
      if (Number(task.id) === taskId) {
        return {
          ...task,
          name: name === undefined ? task.name : name,
          description:
            description === undefined ? task.description : description,
          status: status === undefined ? task.status : status,
          priority: priority === undefined ? task.priority : priority,
          dueDate: date ? format(date, 'yyyy-MM-dd') : task.dueDate,
        }
      }
      return task
    })

    setMockTask(updatedTask)

    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription />
          <form className='space-y-4' onSubmit={handleSubmit}>
            <Input
              defaultValue={task?.name}
              onChange={(e) => setName(e.target.value)}
              name={name}
              disabled={false}
              required
              autoFocus
              minLength={3}
              placeholder='Task name'
            />
            <Input
              defaultValue={task?.description}
              onChange={(e) => setDescription(e.target.value)}
              name={description}
              disabled={false}
              required
              minLength={3}
              placeholder='Task Description'
            />
            <Select
              defaultValue={task?.status}
              name={status}
              onValueChange={(e) =>
                setStatus(e as 'progress' | 'is_pending' | 'completed')
              }>
              <SelectTrigger>
                <SelectValue placeholder='Task Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='progress'>progress</SelectItem>
                <SelectItem value='is_pending'>is_pending</SelectItem>
                <SelectItem value='completed'>completd</SelectItem>
              </SelectContent>
            </Select>
            <Select
              defaultValue={task?.priority}
              name={priority}
              onValueChange={(e) =>
                setPriority(e as 'low' | 'medium' | 'high')
              }>
              <SelectTrigger>
                <SelectValue placeholder='Task Priority' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='low'>low</SelectItem>
                <SelectItem value='medium'>medium</SelectItem>
                <SelectItem value='high'>high</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={false}
                  variant={'outline'}
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}>
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {task?.dueDate ? (
                    format(task?.dueDate, 'yyyy-MM-dd')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={task?.dueDate ? new Date(task?.dueDate) : date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className='flex justify-end space-x-4'>
              <Button
                variant={'outline'}
                type='button'
                disabled={false}
                onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button disabled={false}>Edit</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

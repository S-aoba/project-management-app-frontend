'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
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

import { cn } from '@/lib/utils'
import { useCreateTaskProjectModal } from '../store/use-create-task-modal'

export const CreateTaskModal = () => {
  const [mockTasks, setMockTasks] = useMockTask()
  const [open, setOpen] = useCreateTaskProjectModal()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'progress' | 'is_pending' | 'completed'>(
    'progress',
  )
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low')
  const [date, setDate] = useState<Date | undefined>(new Date())

  const handleClose = () => {
    setName('')
    setDescription('')
    setStatus('progress')

    setOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const id = String(mockTasks.length + 1)
    // TODO: API連携に切り替える
    setMockTasks([
      ...mockTasks,
      {
        id,
        name,
        description,
        dueDate: format(date!, 'yyyy-MM-dd'),
        status,
        priority,
        createdBy: 1,
        updatedBy: 1,
        createdAt: '2024-08-31',
        updatedAt: '2024-08-31',
        assignedUserId: 1,
      },
    ])

    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription />
          <form className='space-y-4' onSubmit={handleSubmit}>
            <Input
              onChange={(e) => setName(e.target.value)}
              name={name}
              disabled={false}
              required
              autoFocus
              minLength={3}
              placeholder='Task name'
            />
            <Input
              onChange={(e) => setDescription(e.target.value)}
              name={description}
              disabled={false}
              required
              minLength={3}
              placeholder='Task Description'
            />
            <Select
              required
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
                <SelectItem value='completd'>completd</SelectItem>
              </SelectContent>
            </Select>
            <Select
              required
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
                  {date ? format(date, 'yyyy-MM-dd') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={date}
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
              <Button disabled={false}>Create</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

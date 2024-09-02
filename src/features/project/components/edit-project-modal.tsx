'use client'

import { useParams } from 'next/navigation'
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

import { useMockUserProjects } from '@/mock-data/store/use-mock-user-projects'

import { useEditProjectModal } from '../store/use-edit-project-modal'

export const EditProjectModal = () => {
  const { projectId } = useParams()

  const [open, setOpen] = useEditProjectModal()
  const [mockUserProjects, setMockUserProjects] = useMockUserProjects()
  const userProject = mockUserProjects.filter(
    (project) => project.id === Number(projectId),
  )[0]

  const [name, setName] = useState(userProject.name)
  const [description, setDescription] = useState(userProject.description)
  const [status, setStatus] = useState<'progress' | 'is_pending' | 'completed'>(
    userProject.status,
  )
  const [date, setDate] = useState<Date | undefined>(
    userProject.dueData ? new Date(userProject.dueData) : new Date(),
  )

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: API連携に切り替える
    const updatedUser = mockUserProjects.map((project) => {
      if (project.id === Number(projectId)) {
        return {
          ...project,
          name,
          description,
          status,
          dueData: date ? format(date, 'yyyy-MM-dd') : userProject.dueData,
        }
      }
      return project
    })

    setMockUserProjects(updatedUser)

    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription />
          <form className='space-y-4' onSubmit={handleSubmit}>
            <Input
              defaultValue={userProject.name}
              onChange={(e) => setName(e.target.value)}
              name={name}
              disabled={false}
              required
              autoFocus
              minLength={3}
              placeholder='Project name'
            />
            <Input
              defaultValue={userProject.description}
              onChange={(e) => setDescription(e.target.value)}
              name={description}
              disabled={false}
              required
              minLength={3}
              placeholder='Project Description'
            />
            <Select
              defaultValue={'progress'}
              name={status}
              onValueChange={(e) =>
                setStatus(e as 'progress' | 'is_pending' | 'completed')
              }>
              <SelectTrigger>
                <SelectValue placeholder='Project Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='progress'>progress</SelectItem>
                <SelectItem value='is_pending'>is_pending</SelectItem>
                <SelectItem value='completed'>completd</SelectItem>
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
              <Button disabled={false}>Edit</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

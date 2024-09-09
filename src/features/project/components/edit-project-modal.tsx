'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useProjects } from '../api/use-projects'
import { useEditProjectModal } from '../store/use-edit-project-modal'

export const EditProjectModal = () => {
  const params = useParams()
  const projectId = Number(params.projectId)

  // TODO:projectIdが存在していない場合NotFoundPageに遷移させる処理を後で実装

  const { singleProject, editProject } = useProjects(projectId)

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [status, setStatus] = useState<'pending' | 'is_progress' | 'completed'>('pending')
  const [date, setDate] = useState<Date | undefined>(undefined)

  const [open, setOpen] = useEditProjectModal()

  useEffect(() => {
    if (singleProject) {
      setName(singleProject.project.name)
      setDescription(singleProject.project.description)
      setStatus(singleProject.project.status)
      setDate(new Date(singleProject.project.dueDate))
    }
  }, [singleProject, setDate, setName, setDescription, setStatus])

  const handleClose = () => {
    setName('')
    setDescription('')
    setStatus('pending')
    setDate(undefined)

    setOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (date === undefined) return
    const dueDate = format(date, 'yyyy-MM-dd')

    editProject({
      name,
      description,
      status,
      dueDate,
      imagePath: null,
    })

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
              defaultValue={singleProject?.project.name}
              onChange={(e) => setName(e.target.value)}
              name={name}
              disabled={false}
              required
              autoFocus
              minLength={3}
              placeholder='Project name'
            />
            <Input
              defaultValue={singleProject?.project.description}
              onChange={(e) => setDescription(e.target.value)}
              name={description}
              disabled={false}
              required
              minLength={3}
              placeholder='Project Description'
            />
            <Select
              defaultValue={singleProject?.project.status}
              name={status}
              onValueChange={(e) => setStatus(e as 'pending' | 'is_progress' | 'completed')}>
              <SelectTrigger>
                <SelectValue placeholder='Project Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='pending'>pending</SelectItem>
                <SelectItem value='is_progress'>is_progress</SelectItem>
                <SelectItem value='completed'>completed</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={false}
                  variant={'outline'}
                  className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'yyyy-MM-dd') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <div className='flex justify-end space-x-4'>
              <Button variant={'outline'} type='button' disabled={false} onClick={() => handleClose()}>
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

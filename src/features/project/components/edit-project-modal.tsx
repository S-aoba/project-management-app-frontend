'use client'

import { useParams } from 'next/navigation'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMockUserProjects } from '@/mock-data/store/use-mock-user-projects'
import { useEditProjectModal } from '../store/use-edit-project-modal copy'

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
    'progress',
  )

  const handleClose = () => {
    setName('')
    setDescription('')
    setStatus('progress')

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
              defaultValue={userProject.status}
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
                <SelectItem value='completd'>completd</SelectItem>
              </SelectContent>
            </Select>
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

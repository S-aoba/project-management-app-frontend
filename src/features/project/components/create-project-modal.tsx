'use client'

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

import { useMockUserProjects } from '@/mock-data/store/use-mock-user-projects'
import { useCreateProjectModal } from '../store/use-create-project-modal'

export const CreateProjectModal = () => {
  const [mockUserProjects, setMockUserProjects] = useMockUserProjects()

  const [open, setOpen] = useCreateProjectModal()

  const [name, setName] = useState('')

  const handleClose = () => {
    setOpen(false)
    setName('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: API連携に切り替える
    setMockUserProjects([
      ...mockUserProjects,
      {
        id: 11,
        name: 'Project 1',
        description: 'test data',
        dueData: '2024-09-01',
        status: 'progress',
        createdBy: 1,
        updatedBy: 1,
        createdAt: '2024-08-31',
        updatedAt: '2024-08-31',
      },
    ])

    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription />
          <form className='space-y-4' onSubmit={handleSubmit}>
            <Input
              name={name}
              disabled={false}
              required
              autoFocus
              minLength={3}
              placeholder='Project name'
            />
            <div className='flex justify-end'>
              <Button disabled={false}>Create</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useParams } from 'next/navigation'
import { useProjects } from '../api/use-projects'
import { useDeleteProjectModal } from '../store/use-delete-project-modal'

export const DeleteProjectModal = () => {
  const params = useParams()
  const projectId = Number(params.projectId)

  const [open, setOpen] = useDeleteProjectModal()

  const { deleteProject } = useProjects(projectId)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    deleteProject()

    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>Are you ok ?</DialogDescription>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='flex justify-end space-x-4'>
              <Button type='button' variant={'outline'} disabled={false} onClick={handleClose}>
                Cancel
              </Button>
              <Button variant={'destructive'} disabled={false}>
                Delete
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { useCreateProjectModal } from '../store/use-create-project-modal'

export const CreateProjectModal = () => {
  const [open, setOpen] = useCreateProjectModal()

  const [name, setName] = useState('')

  const handleClose = () => {
    setOpen(false)
    setName('')
  }

  const handleSubmit = () => {
    // backendにデータを送信する
    setOpen(false)
    return
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

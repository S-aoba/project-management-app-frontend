'use client'

import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export const InputError = ({ message }: { message: string }) => {
  return (
    <Alert variant='destructive' className='mb-4'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

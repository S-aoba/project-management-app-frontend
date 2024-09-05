import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

import { useCsrfToken } from './use-csrf-token'

type AuthProps = {
  setError: Dispatch<SetStateAction<string>>
}

type LoginProps = {
  email: string
  password: string
}

export const useAuth = ({ setError }: AuthProps) => {
  const router = useRouter()
  const { csrfToken, getCsrfToken } = useCsrfToken()

  const { mutate: login, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: async ({ email, password }: LoginProps) => {
      await csrfToken()

      const csrf = getCsrfToken('XSRF-TOKEN')

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })

      if (!res.ok) {
        throw new Error('Authentication failed.')
      }
    },
    onSuccess: () => {
      router.push('/')
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })

  return { login, isPending }
}

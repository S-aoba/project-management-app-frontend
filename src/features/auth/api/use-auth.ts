import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

import { useCsrfToken } from './use-csrf-token'

type LoginProps = {
  setError: Dispatch<SetStateAction<string>>
  email: string
  password: string
}

export const useAuth = () => {
  const { csrfToken, getCsrfToken } = useCsrfToken()
  const router = useRouter()

  const login = async ({ setError, ...props }: LoginProps) => {
    try {

      setError('')

      await csrfToken()

      const csrf = getCsrfToken('XSRF-TOKEN')

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(props),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })

      if (!res.ok) {
        throw new Error('Authentication failed.')
      }
      router.push('/')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  return { login }
}

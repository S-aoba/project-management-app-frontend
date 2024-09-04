import { useCsrfToken } from './use-csrf-token'

export const useAuth = () => {
  const { csrfToken, getCsrfToken } = useCsrfToken()

  const login = async ({ ...props }) => {
    try {
      await csrfToken()

      const csrf = getCsrfToken('XSRF-TOKEN')

      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(props),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })
    } catch (error) {
      throw new Error('Do not login. something wrong.')
    }
  }

  return { login }
}

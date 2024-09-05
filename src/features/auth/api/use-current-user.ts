import { useQuery } from '@tanstack/react-query'

import { useCsrfToken } from './use-csrf-token'

export const useCurrentUser = () => {
  const { csrfToken, getCsrfToken } = useCsrfToken()

  const fetchCurrentUser = async () => {
    try {
      await csrfToken()

      const csrf = getCsrfToken('XSRF-TOKEN')

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/user`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-XSRF-TOKEN': csrf!,
          },
        },
      )

      return res.json()
    } catch (error) {
      throw new Error('something wrong.')
    }
  }

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
  })

  return { data }
}

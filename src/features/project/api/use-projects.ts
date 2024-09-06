import { useCsrfToken } from '@/features/auth/api/use-csrf-token'
import { Project } from '@/types/type'
import { useQuery } from '@tanstack/react-query'

type ResponseType = {
  data: Project[]
}

export const useUserProjects = (projectId?: number) => {
  const { csrfToken, getCsrfToken } = useCsrfToken()

  const { data: userProjects, isPending: isUserProjectsPending } =
    useQuery<ResponseType>({
      queryKey: ['userProjects'],
      queryFn: async () => {
        await csrfToken()

        const csrf = getCsrfToken('XSRF-TOKEN')

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/projects`,
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

        if (!res.ok) {
          throw new Error('Unauthenticated.')
        }

        return await res.json()
      },
    })

  // singleProject
  const { data: singleProject, isPending: isSingleProjectPending } = useQuery<ResponseType>({
    queryKey: ['userProjects'],
    queryFn: async () => {
      await csrfToken()

      const csrf = getCsrfToken('XSRF-TOKEN')

      if (projectId === undefined) throw new Error('projectId is undefined.')

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/projects/${projectId}`,
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

      if (!res.ok) {
        throw new Error('Unauthenticated.')
      }

      return await res.json()
    },
  })

  return { userProjects, isUserProjectsPending, singleProject, isSingleProjectPending }
}

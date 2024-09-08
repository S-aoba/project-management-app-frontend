import { useCsrfToken } from '@/features/auth/api/use-csrf-token'
import { Project, TaskType, UserType } from '@/types/type'
import { useMutation, useQuery } from '@tanstack/react-query'

type UserProjectsResponseType = {
  data: Project[]
}

type SingleProjectResponseType = {
  project: Project
  tasks: TaskType[]
  users: UserType[]
}

type CreateProjectRequestType = Pick<
  Project,
  'name' | 'description' | 'status' | 'due_date' | 'image_path'
>

export const useProjects = (projectId?: number) => {
  const { csrfToken, getCsrfToken } = useCsrfToken()

  const { data: userProjects, isPending: isUserProjectsPending } =
    useQuery<UserProjectsResponseType>({
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
  const { data: singleProject, isPending: isSingleProjectPending } =
    useQuery<SingleProjectResponseType>({
      queryKey: ['singleProject', projectId],
      enabled: !!projectId,
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

  const { mutate: createProject, isPending: isCreateProjectPending } = useMutation({
    mutationKey: ['creatProject'],
    mutationFn: async ({ ...props }: CreateProjectRequestType) => {
      await csrfToken()

      const csrf = getCsrfToken('XSRF-TOKEN')

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/projects`,
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(props),
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
    onSuccess(data) {
      console.log(data)
    },
  })

  return {
    userProjects,
    isUserProjectsPending,
    singleProject,
    isSingleProjectPending,
    createProject,
    isCreateProjectPending
  }
}

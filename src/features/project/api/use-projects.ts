import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'

import { Project, TaskType, UserType } from '@/types/type'

type UserProjectsResponseType = {
  data: Project[]
}

type SingleProjectResponseType = {
  project: Project
  tasks: TaskType[]
  users: UserType[]
}

type CreateProjectRequestType = Pick<Project, 'name' | 'description' | 'status' | 'dueDate' | 'imagePath'>

export const useProjects = (projectId?: number) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const { data: userProjects, isPending: isUserProjectsPending } = useQuery<UserProjectsResponseType>({
    queryKey: ['userProjects'],
    queryFn: async () => {
      await csrfToken()

      const csrf = getCsrfToken('XSRF-TOKEN')

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/projects`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })

      if (!res.ok) {
        throw new Error('Unauthenticated.')
      }

      return await res.json()
    },
  })

  // singleProject
  const { data: singleProject, isPending: isSingleProjectPending } = useQuery<SingleProjectResponseType>({
    queryKey: ['singleProject', projectId],
    enabled: !!projectId,
    queryFn: async () => {
      await csrfToken()

      const csrf = getCsrfToken('XSRF-TOKEN')

      if (projectId === undefined) throw new Error('projectId is undefined.')

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/projects/${projectId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })

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

      const projectData = {
        name: props.name,
        description: props.description,
        due_date: props.dueDate,
        status: props.status,
        image_path: props.imagePath,
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/projects`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(projectData),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })

      if (!res.ok) {
        throw new Error('Unauthenticated.')
      }

      return await res.json()
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['userProjects'],
      })

      const id = data.data.id

      router.push(`/projects/${id}`)
    },
  })

  const { mutate: editProject, isPending: isEditProjectPending } = useMutation({
    mutationKey: ['editProject'],
    mutationFn: async ({ ...props }: CreateProjectRequestType) => {
      await csrfToken()

      const csrf = getCsrfToken('XSRF-TOKEN')

      const projectData = {
        name: props.name,
        description: props.description,
        due_date: props.dueDate,
        status: props.status,
        image_path: props.imagePath,
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/projects/${projectId}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(projectData),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })

      if (!res.ok) {
        throw new Error('Unauthenticated.')
      }

      return await res.json()
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['userProjects'],
      })
      queryClient.invalidateQueries({
        queryKey: ['singleProject', projectId],
      })
    },
  })

  const { mutate: deleteProject, isPending: isDeleteProjectPending } = useMutation({
    mutationKey: ['deleteProject'],
    mutationFn: async () => {
      await csrfToken()

      const csrf = getCsrfToken('XSRF-TOKEN')

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/projects/${projectId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })

      if (!res.ok) {
        throw new Error('Unauthenticated.')
      }

      return await res.json()
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['userProjects'],
      })

      router.push('/')

      queryClient.removeQueries({ queryKey: ['singleProject', projectId] })
    },
  })

  return {
    userProjects,
    isUserProjectsPending,
    singleProject,
    isSingleProjectPending,
    createProject,
    isCreateProjectPending,
    editProject,
    isEditProjectPending,
    deleteProject,
    isDeleteProjectPending,
  }
}

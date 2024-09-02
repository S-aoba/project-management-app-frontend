import { atom, useAtom } from 'jotai'

const modalState = atom(false)

export const useCreateTaskProjectModal = () => {
  return useAtom(modalState)
}

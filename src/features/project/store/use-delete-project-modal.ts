import { atom, useAtom } from 'jotai'

const modalState = atom(false)

export const useDeleteProjectModal = () => {
  return useAtom(modalState)
}

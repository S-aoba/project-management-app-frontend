import { atom, useAtom } from 'jotai'

const modalState = atom(false)

export const useEditProjectModal = () => {
  return useAtom(modalState)
}

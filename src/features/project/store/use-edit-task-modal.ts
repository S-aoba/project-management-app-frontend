import { atom, useAtom } from 'jotai'

const modalState = atom(false)
const taskIdState = atom(0)

export const useEditTaskModal = () => {
  return useAtom(modalState)
}

export const useEditTaskId = () => {
  return useAtom(taskIdState)
}

import { atom, useAtom } from 'jotai'

import { Project } from '../user-projects'

const mockProjectDataAtom = atom<Project[]>([])

export const useMockUserProjects = () => {
  return useAtom(mockProjectDataAtom)
}

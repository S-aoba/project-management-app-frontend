import { atom, useAtom } from 'jotai'

import { mockUserProjects, Project } from '../user-projects'

const mockProjectDataAtom = atom<Project[]>(mockUserProjects)

export const useMockUserProjects = () => {
  return useAtom(mockProjectDataAtom)
}

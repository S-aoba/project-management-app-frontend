import { atom, useAtom } from 'jotai'

import { mockParticipationgUserList, User } from '../participating-user-list'

const mockParticipationgUserListAtom = atom<User[]>(mockParticipationgUserList)

export const useMockParticipatingUserList = () => {
  return useAtom(mockParticipationgUserListAtom)
}

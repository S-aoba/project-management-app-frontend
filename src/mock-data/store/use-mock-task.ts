import { atom, useAtom } from "jotai";

import { mockTask, Task } from "../task";

const mockTaskAtom = atom<Task[]>(mockTask)

export const useMockTask = () => {
  return useAtom(mockTaskAtom)
}
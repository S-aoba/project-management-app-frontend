export type Project = {
  id: number
  name: string
  description: string
  dueData: string
  status: 'progress' | 'is_pending' | 'completed'
  createdBy: number
  updatedBy: number
  createdAt: string
  updatedAt: string
}

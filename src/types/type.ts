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

export type TaskType = {
  id: number
  name: string
  description: string
  dueDate: string
  status: 'progress' | 'is_pending' | 'completed'
  priority: 'low' | 'medium' | 'high'
  imagePath: string
  createdBy: number
  updatedBy: number
  createdAt: string
  updatedAt: string
  assignedUserId: number
}

export type UserType = {
  id: number
  name: string
}

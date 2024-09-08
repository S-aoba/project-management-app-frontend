export type Project = {
  id: number
  name: string
  description: string
  dueDate: string
  status: 'pending' | 'is_progress' | 'completed'
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
  status: 'pending' | 'is_progress' | 'completed'
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

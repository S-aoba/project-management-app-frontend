export type Project = {
  id: number
  name: string
  description: string
  dueDate: string
  status: 'pending' | 'is_progress' | 'completed'
  imagePath: string | null
  createdBy: number
  updatedBy: number
  createdAt: string
  updatedAt: string
}

export type TaskType = {
  id: number
  name: string
  description: string
  due_date: string
  status: 'pending' | 'is_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  image_path: string | null
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

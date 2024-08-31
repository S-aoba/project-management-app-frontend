export type Task = {
  id: string
  name: string
  description: string
  dueDate: string
  status: 'progress' | 'is_pending' | 'completed'
  priority: 'low' | 'medium' | 'high'
  createdBy: number
  updatedBy: number
  createdAt: string
  updatedAt: string
  assignedUserId: number
}

export const mockTask: Task[] = [
  {
    id: '1',
    name: 'Project Kickoff Meeting',
    description:
      'Kickoff meeting with the team to discuss project goals and milestones.',
    dueDate: '2024-09-05',
    status: 'is_pending',
    priority: 'high',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2024-08-01',
    updatedAt: '2024-08-01',
    assignedUserId: 2,
  },
  {
    id: '2',
    name: 'Design Phase Completion',
    description:
      'Complete the design phase of the project and prepare the design document.',
    dueDate: '2024-09-10',
    status: 'progress',
    priority: 'medium',
    createdBy: 1,
    updatedBy: 2,
    createdAt: '2024-08-02',
    updatedAt: '2024-08-15',
    assignedUserId: 3,
  },
  {
    id: '3',
    name: 'Code Review',
    description:
      'Review the code submitted by the development team and provide feedback.',
    dueDate: '2024-09-15',
    status: 'is_pending',
    priority: 'high',
    createdBy: 2,
    updatedBy: 2,
    createdAt: '2024-08-05',
    updatedAt: '2024-08-10',
    assignedUserId: 4,
  },
  {
    id: '4',
    name: 'Testing Phase',
    description:
      'Start the testing phase to ensure all features are working as expected.',
    dueDate: '2024-09-20',
    status: 'is_pending',
    priority: 'medium',
    createdBy: 3,
    updatedBy: 3,
    createdAt: '2024-08-10',
    updatedAt: '2024-08-12',
    assignedUserId: 5,
  },
  {
    id: '5',
    name: 'User Documentation',
    description:
      'Prepare the user documentation and guide for the project deliverables.',
    dueDate: '2024-09-25',
    status: 'progress',
    priority: 'low',
    createdBy: 1,
    updatedBy: 4,
    createdAt: '2024-08-12',
    updatedAt: '2024-08-18',
    assignedUserId: 6,
  },
  {
    id: '6',
    name: 'Deployment Plan',
    description:
      'Create a deployment plan and schedule for the project release.',
    dueDate: '2024-09-30',
    status: 'is_pending',
    priority: 'high',
    createdBy: 2,
    updatedBy: 5,
    createdAt: '2024-08-15',
    updatedAt: '2024-08-20',
    assignedUserId: 7,
  },
  {
    id: '7',
    name: 'Client Feedback',
    description:
      'Collect feedback from the client regarding the project progress and deliverables.',
    dueDate: '2024-10-05',
    status: 'is_pending',
    priority: 'medium',
    createdBy: 3,
    updatedBy: 6,
    createdAt: '2024-08-20',
    updatedAt: '2024-08-25',
    assignedUserId: 8,
  },
  {
    id: '8',
    name: 'Bug Fixes',
    description:
      'Fix any bugs identified during the testing phase and retest the application.',
    dueDate: '2024-10-10',
    status: 'progress',
    priority: 'high',
    createdBy: 4,
    updatedBy: 7,
    createdAt: '2024-08-25',
    updatedAt: '2024-08-28',
    assignedUserId: 9,
  },
  {
    id: '9',
    name: 'Final Review',
    description:
      'Conduct a final review of the project to ensure all deliverables meet the requirements.',
    dueDate: '2024-10-15',
    status: 'is_pending',
    priority: 'medium',
    createdBy: 5,
    updatedBy: 8,
    createdAt: '2024-08-28',
    updatedAt: '2024-08-30',
    assignedUserId: 10,
  },
  {
    id: '10',
    name: 'Project Closure',
    description:
      'Close the project, complete all administrative tasks, and archive the documentation.',
    dueDate: '2024-10-20',
    status: 'is_pending',
    priority: 'low',
    createdBy: 1,
    updatedBy: 9,
    createdAt: '2024-09-01',
    updatedAt: '2024-09-05',
    assignedUserId: 1,
  },
]

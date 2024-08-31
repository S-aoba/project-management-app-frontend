type Project = {
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

export const userProjects: Project[] = [
  {
    id: 1,
    name: '新しいウェブサイトの立ち上げ',
    description: '最新の技術を使って新しいウェブサイトを開発します。',
    dueData: '2024-09-05',
    status: 'progress',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2024-08-01',
    updatedAt: '2024-08-10',
  },
  {
    id: 2,
    name: 'マーケティングキャンペーンの策定',
    description: '次の四半期に向けたマーケティングキャンペーンを計画します。',
    dueData: '2024-09-08',
    status: 'is_pending',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2024-08-05',
    updatedAt: '2024-08-12',
  },
  {
    id: 3,
    name: '製品の品質改善プロジェクト',
    description: '既存製品の品質を向上させるための改良を実施します。',
    dueData: '2024-09-12',
    status: 'completed',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2024-08-10',
    updatedAt: '2024-08-20',
  },
  {
    id: 4,
    name: '新しいアプリのユーザビリティテスト',
    description:
      '新しく開発したアプリケーションのユーザビリティをテストします。',
    dueData: '2024-09-15',
    status: 'progress',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2024-08-12',
    updatedAt: '2024-08-18',
  },
  {
    id: 5,
    name: '社員向けトレーニングプログラム',
    description: '社員のスキル向上のためのトレーニングプログラムを実施します。',
    dueData: '2024-09-18',
    status: 'is_pending',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2024-08-15',
    updatedAt: '2024-08-22',
  },
  {
    id: 6,
    name: 'クライアント向けレポートの作成',
    description: 'クライアントに提供するための詳細なレポートを作成します。',
    dueData: '2024-09-20',
    status: 'completed',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2024-08-18',
    updatedAt: '2024-08-25',
  },
  {
    id: 7,
    name: '業務プロセスの自動化',
    description: '日常業務の効率を高めるためにプロセスを自動化します。',
    dueData: '2024-09-22',
    status: 'progress',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2024-08-20',
    updatedAt: '2024-08-28',
  },
  {
    id: 8,
    name: '顧客フィードバックの分析',
    description: '顧客からのフィードバックを収集し、分析を行います。',
    dueData: '2024-09-25',
    status: 'is_pending',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-30',
  },
  {
    id: 9,
    name: '新製品の市場調査',
    description: '新製品の市場性を調査し、レポートを作成します。',
    dueData: '2024-09-28',
    status: 'completed',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2024-08-25',
    updatedAt: '2024-08-31',
  },
  {
    id: 10,
    name: 'イベントの企画と実施',
    description: '社内イベントを企画し、実施します。',
    dueData: '2024-09-30',
    status: 'progress',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2024-08-28',
    updatedAt: '2024-08-31',
  },
]

'use clietn'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks/use-confirm'

import { useMockParticipatingUserList } from '@/mock-data/store/use-mock-participating-user-list'
import { Trash } from 'lucide-react'

export const UserList = () => {
  const [users, setUsers] = useMockParticipatingUserList()
  const [ConfirDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to perform a delete action.',
  )
  const onDelete = async (id: number) => {
    const ok = await confirm()

    if (ok) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  return (
    <div className='h-full flex flex-col space-y-4 py-8 px-2 w-40 border-l'>
      <ConfirDialog />
      <h1 className='text-muted-foreground text-sm'>Participating User List</h1>
      {users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

type Props = {
  id: number
  name: string
  onDelete: (id: number) => void
}
export const UserItem = ({ id, name, onDelete }: Props) => {
  return (
    <div className='flex items-center p-2 text-center rounded group hover:cursor-pointer hover:bg-muted transition-colors duration-300'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className='size-6 border border-slate-500'>
            <AvatarImage src='/user-icon2.svg' />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <p className='ml-2 text-muted-foreground group-hover:text-black text-sm transition-colors duration-300 line-clamp-1'>
          {name}
        </p>
        <DropdownMenuContent>
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onDelete(id)}>
            <Trash className='size-4 mr-2' />
            remove user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

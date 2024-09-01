'use clietn'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { useMockParticipatingUserList } from '@/mock-data/store/use-mock-participating-user-list'
import Link from 'next/link'

export const UserList = () => {
  const [users] = useMockParticipatingUserList()

  return (
    <div className='h-full flex flex-col space-y-4 py-8 px-2 w-40 border-l'>
      <h1 className='text-muted-foreground text-sm'>Participating User List</h1>
      {users.map((user) => (
        <Link href={'/'} key={user.id}>
          <div
            key={user.id}
            className='flex items-center p-2 text-center rounded group hover:cursor-pointer hover:bg-muted transition-colors duration-300'>
            <Avatar className='size-6 mr-2'>
              <AvatarImage src='/user-icon2.svg' />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <p className='text-muted-foreground group-hover:text-black text-sm transition-colors duration-300 line-clamp-1'>
              {user.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

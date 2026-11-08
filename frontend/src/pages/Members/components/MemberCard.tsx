import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Edit, Trash2, Crown, User as UserIcon } from 'lucide-react'
import type { User } from '@/types'

interface MemberCardProps {
  member: User
  isCurrentUser: boolean
  onEdit: () => void
  onDelete: () => void
}

export function MemberCard({
  member,
  isCurrentUser,
  onEdit,
  onDelete,
}: MemberCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const isAdmin = member.role === 'admin' || member.role === 'owner'

  return (
    <Card className='hover:shadow-md transition-shadow'>
      <CardContent className='p-4'>
        <div className='flex items-start gap-4'>
          <Avatar className='h-12 w-12 flex-shrink-0'>
            <AvatarFallback className='bg-zinc-950 text-white'>
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between gap-2'>
              <div className='flex-1 min-w-0'>
                <p className='font-semibold text-base truncate'>
                  {member.name}
                </p>
                <p className='text-sm text-muted-foreground truncate'>
                  {member.email}
                </p>
                {member.role && (
                  <div className='flex items-center gap-2 mt-2 flex-wrap'>
                    {isAdmin ? (
                      <span className='inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full'>
                        <Crown className='h-3 w-3' />
                        Admin
                      </span>
                    ) : (
                      <span className='inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full'>
                        <UserIcon className='h-3 w-3' />
                        Membro
                      </span>
                    )}
                    {isCurrentUser && (
                      <span className='inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full'>
                        Você
                      </span>
                    )}
                  </div>
                )}
                {isCurrentUser && !member.role && (
                  <div className='flex items-center gap-2 mt-2 flex-wrap'>
                    <span className='inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full'>
                      Você
                    </span>
                  </div>
                )}
              </div>
              <div className='flex gap-2 flex-shrink-0'>
                <Button
                  variant='outline'
                  size='icon'
                  className='h-8 w-8'
                  onClick={onEdit}
                >
                  <Edit className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  className='h-8 w-8'
                  onClick={onDelete}
                  disabled={isCurrentUser}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

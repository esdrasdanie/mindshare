import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, ThumbsUp } from 'lucide-react'
import type { Idea } from '@/types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatRelativeDate } from '@/lib/utils'

interface IdeaCardProps {
  idea: Idea
  onClick: () => void
}

export function IdeaCard({ idea, onClick }: IdeaCardProps) {
  return (
    <Card
      key={idea.id}
      onClick={onClick}
      className='hover:shadow-lg transition-shadow cursor-pointer'
    >
      <CardHeader>
        <CardTitle className='line-clamp-2'>
          <div className='flex items-center gap-2'>
            <Avatar className='h-8 w-8'>
              <AvatarFallback className='bg-zinc-950 text-primary-foreground text-sm'>
                {idea.author?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className='text-sm font-medium line-clamp-1'>
              {idea.author?.name || 'Usuário'}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-1'>
        <div className='hover:text-primary transition-colors text-xl line-clamp-2 text-zinc-950'>
          {idea.title}
        </div>
        <p className='text-sm text-muted-foreground line-clamp-3'>
          {idea.description || ''}
        </p>
        <div className='flex items-center justify-between pt-6'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-3 text-sm text-muted-foreground py-1 px-3 border border-zinc-200 rounded-md'>
              <MessageSquare className='h-4 w-4 text-primary' />
              <span>{idea.comments?.length || 0}</span>
            </div>
            <div className='flex items-center gap-3 text-sm text-muted-foreground py-1 px-3 border border-zinc-200 rounded-md'>
              <ThumbsUp className='h-4 w-4 text-green-500' />
              <span>{idea.countVotes || 0}</span>
            </div>
          </div>
          <span className='text-sm text-muted-foreground'>
            {formatRelativeDate(idea.createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

import { Avatar, AvatarFallback } from '../../../components/ui/avatar'
import type { Comment } from '../../../types'

interface CommentsListProps {
  comments: Comment[]
  loading: boolean
}

export function CommentsList({ comments, loading }: CommentsListProps) {
  return (
    <div>
      {loading ? (
        <p className='text-muted-foreground'>Carregando comentários...</p>
      ) : comments.length > 0 ? (
        <div className='space-y-8 p-2'>
          {comments.map((comment) => (
            <div key={comment.id} className='flex items-start gap-4'>
              <div className='flex items-center gap-2'>
                <Avatar className='h-8 w-8 flex-shrink-0'>
                  <AvatarFallback className='bg-blue-600 text-white'>
                    {comment.author?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex-1'>
                    <p className='font-semibold text-base'>
                      {comment.author?.name || 'Usuário'}
                    </p>

                    <p className='text-sm text-muted-foreground mt-1 whitespace-pre-wrap'>
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

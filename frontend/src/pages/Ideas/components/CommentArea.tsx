import { ThumbsUp } from 'lucide-react'
import { Avatar, AvatarFallback } from '../../../components/ui/avatar'
import { Button } from '../../../components/ui/button'
import { Textarea } from '../../../components/ui/textarea'
import type { Idea } from '../../../types'
import { useAuthStore } from '../../../stores/auth'

interface CommentAreaProps {
  commentContent: string
  setCommentContent: (value: string) => void
  handleAddComment: () => void
  handleVote: () => void
  idea?: Idea
}

export function CommentArea({
  commentContent,
  setCommentContent,
  handleAddComment,
  handleVote,
  idea,
}: CommentAreaProps) {
  const { user } = useAuthStore()

  return (
    <div className='flex-shrink-0 border-t p-6'>
      <div className='flex items-start gap-4'>
        <Avatar className='h-8 w-8 flex-shrink-0'>
          <AvatarFallback className='bg-blue-600 text-white'>
            {user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className='flex-1 space-y-3'>
          <Textarea
            placeholder='Digite um comentário'
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            rows={3}
            className='resize-none'
          />
          <div className='flex items-center justify-between'>
            <Button
              variant='outline'
              onClick={handleVote}
              disabled={!user}
              className={`${
                idea?.votes?.some((v) => v.userId === user?.id)
                  ? 'bg-green-100 border-green-600 text-green-800'
                  : 'bg-green-50 border-green-500 text-green-700'
              } hover:bg-green-100`}
            >
              <ThumbsUp className='mr-2 h-4 w-4' />
              {idea?.countVotes || 0}
            </Button>
            <Button
              onClick={handleAddComment}
              disabled={!commentContent.trim()}
              className='bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50'
            >
              Comentar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

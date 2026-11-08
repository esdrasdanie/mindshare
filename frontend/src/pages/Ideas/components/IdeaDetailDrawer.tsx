import { Drawer, DrawerContentRight } from '../../../components/ui/drawer'
import { useMutation } from '@apollo/client/react'
import { LIST_IDEAS } from '../../../lib/graphql/queries/Idea'
import { useState } from 'react'
import type { Idea } from '../../../types'
import { Button } from '../../../components/ui/button'
import { X } from 'lucide-react'
import { CommentsList } from './CommentsList'
import { CommentArea } from './CommentArea'
import { CREATE_COMMENT } from '../../../lib/graphql/mutations/Comment'
import { toast } from 'sonner'
import { TOGGLE_VOTE } from '../../../lib/graphql/mutations/Vote'

interface IdeaDetailDrawerProps {
  idea: Idea | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function IdeaDetailDrawer({
  open,
  onOpenChange,
  idea,
}: IdeaDetailDrawerProps) {
  const [commentContent, setCommentContent] = useState('')

  const ideaId = idea?.id

  const [createCommentMutation] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: LIST_IDEAS }],
    onCompleted: () => {
      setCommentContent('')
      toast.success('Comentário adicionado!')
    },
  })

  const [toggleVoteMutation] = useMutation(TOGGLE_VOTE, {
    refetchQueries: [{ query: LIST_IDEAS }],
  })

  const handleToggleVote = () => {
    if (!ideaId) return
    toggleVoteMutation({
      variables: {
        ideaId,
      },
    })
  }

  const handleAddComment = () => {
    if (!commentContent.trim()) {
      toast.error('Por favor insira um comentário')
      return
    }

    if (!ideaId) return

    createCommentMutation({
      variables: {
        ideaId,
        data: {
          content: commentContent,
        },
      },
    })
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction='right'>
      <DrawerContentRight className='flex flex-col rounded-l-2xl'>
        <div className='flex-shrink-0 p-6 bg-slate-100 rounded-l-2xl'>
          <div className='flex items-start justify-between'>
            <h2 className='text-2xl font-bold pr-4 flex-1'>
              {idea?.title || ''}
            </h2>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => onOpenChange(false)}
              className='flex-shrink-0'
            >
              <X className='h-5 w-5' />
            </Button>
          </div>
          {idea && (
            <p className='text-sm text-muted-foreground leading-relaxed mt-2'>
              {idea?.description || ''}
            </p>
          )}
        </div>

        <div className='flex-1 overflow-y-auto p-6 space-y-8'>
          <CommentsList comments={idea?.comments || []} loading={false} />
        </div>

        {idea && (
          <CommentArea
            commentContent={commentContent || ''}
            setCommentContent={setCommentContent}
            handleAddComment={handleAddComment}
            handleVote={handleToggleVote}
            idea={idea}
          />
        )}
      </DrawerContentRight>
    </Drawer>
  )
}

import { useMutation } from '@apollo/client/react'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import type { User } from '../../../types'
import { DELETE_USER } from '../../../lib/graphql/mutations/Members'
import { LIST_MEMBERS } from '../../../lib/graphql/queries/Members'

interface DeleteMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: User | null
}

export function DeleteMemberDialog({
  open,
  onOpenChange,
  member,
}: DeleteMemberDialogProps) {
  const [deleteUserMutation, { loading }] = useMutation(DELETE_USER, {
    onCompleted: () => {
      onOpenChange(false)
    },
    refetchQueries: [LIST_MEMBERS],
  })

  const handledeleteUser = async () => {
    if (!member) return
    await deleteUserMutation({
      variables: {
        id: member.id,
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover Usuário</DialogTitle>
        </DialogHeader>
        <p className='text-sm text-muted-foreground'>
          Tem certeza que deseja remover
          <span className='font-medium'> {member?.name}</span>? Essa ação não
          poderá ser desfeita.
        </p>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant='destructive'
            onClick={handledeleteUser}
            disabled={loading}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { useMutation } from '@apollo/client/react'
import { CREATE_USER } from '../../../lib/graphql/mutations/Members'

interface InviteMemberProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: () => void
}

export function InviteMemberDialog({
  open,
  onOpenChange,
  onCreated,
}: InviteMemberProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [createUserMutation, { loading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      onOpenChange(false)
      setName('')
      setEmail('')
      onCreated?.()
    },
  })

  const handleSubmit = async () => {
    await createUserMutation({
      variables: {
        data: {
          name,
          email,
        },
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convidar usuário</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='invite-name'>Nome</Label>
            <Input
              id='invite-name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Nome do usuário'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='invite-email'>E-mail</Label>
            <Input
              id='invite-email'
              value={email}
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='email@exemplo.com'
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            Convidar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

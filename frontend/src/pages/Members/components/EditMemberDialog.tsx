import { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import type { User } from '../../../types'
import { useMutation } from '@apollo/client/react'
import { UPDATE_USER } from '../../../lib/graphql/mutations/Members'

interface EditMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: User | null
  onUpdated?: (user: User) => void
}

const ROLE_OPTIONS = [
  { value: 'owner', label: 'Owner' },
  { value: 'admin', label: 'Admin' },
  { value: 'member', label: 'Membro' },
  { value: 'viewer', label: 'Leitor' },
]

export function EditMemberDialog({
  open,
  onOpenChange,
  member,
  onUpdated,
}: EditMemberDialogProps) {
  const [name, setName] = useState('')
  const [role, setRole] = useState<string>('member')

  useEffect(() => {
    setName(member?.name ?? '')
    setRole(member?.role ?? 'member')
  }, [member])

  type UpdateUserMudationData = { updateUser: User }
  type UpdateUserVariables = {
    id: string
    data: { name?: string; role?: string }
  }

  const [updateUserMutation, { loading }] = useMutation<
    UpdateUserMudationData,
    UpdateUserVariables
  >(UPDATE_USER, {
    onCompleted: (res: UpdateUserMudationData) => {
      setName('')
      setRole('member')
      const updated = res.updateUser
      if (updated) {
        onUpdated?.(updated)
      }
      onOpenChange(false)
    },
  })

  const handleSubmit = async () => {
    if (!member) return
    await updateUserMutation({
      variables: {
        id: member.id,
        data: {
          name,
          role,
        },
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='edit-name'>Nome</Label>
            <Input
              id='edit-name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Nome'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='edit-role'>Papel</Label>
            <select
              id='edit-role'
              className='w-full border rounded-md h-10 px-3 bg-background'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className='space-y-2'>
            <Label>E-mail</Label>
            <Input value={member?.email ?? ''} disabled />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

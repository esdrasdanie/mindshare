import { Plus, Search } from 'lucide-react'
import { Page } from '../../components/Page'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { LIST_MEMBERS } from '../../lib/graphql/queries/Members'
import type { User } from '../../types'
import { MemberCard } from './components/MemberCard'
import { useAuthStore } from '../../stores/auth'
import { InviteMemberDialog } from './components/InviteMemberDialog'
import { EditMemberDialog } from './components/EditMemberDialog'
import { DeleteMemberDialog } from './components/DeleteMemberDialog'

export function Members() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openInviteDialog, setOpenInviteDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openEditMemberDialog, setOpenEditMemberDialog] = useState(false)
  const [member, setMember] = useState<User | null>(null)

  const currentUserId = useAuthStore((state) => state.user?.id)
  const { data, loading, refetch } = useQuery<{ listUsers: User[] }>(
    LIST_MEMBERS,
  )

  const handleAddUser = () => {
    setOpenInviteDialog(true)
  }
  const handleEditUser = (editMember: User) => {
    setMember(editMember)
    setOpenEditMemberDialog(true)
  }
  const handleDeleteUser = (deleteMember: User) => {
    setMember(deleteMember)
    setOpenDeleteDialog(true)
  }

  const members = data?.listUsers ?? []

  return (
    <Page>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-medium text-purple-600'>Usuários</h1>
            <p className='text-muted-foreground'>
              Gerencie os membros e suas permissões
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-4 justify-end'>
              <Label htmlFor='search' className='text-sm whitespaces-nowrap'>
                Busque membros:
              </Label>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  id='search'
                  placeholder='Nome ou e-mail'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-9 max-w-[200px]'
                />
              </div>
            </div>
            <Button onClick={handleAddUser}>
              <Plus className='mr-2 h-4 w-4' />
              Novo usuário
            </Button>
          </div>
        </div>
        <div className='grid gap-4 xl:grid-cols-4'>
          {!loading &&
            members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                isCurrentUser={member.id === currentUserId}
                onEdit={() => handleEditUser(member)}
                onDelete={() => handleDeleteUser(member)}
              />
            ))}
        </div>
      </div>

      <InviteMemberDialog
        open={openInviteDialog}
        onOpenChange={setOpenInviteDialog}
        onCreated={() => refetch()}
      />

      <EditMemberDialog
        open={openEditMemberDialog}
        onOpenChange={setOpenEditMemberDialog}
        onUpdated={() => refetch()}
        member={member}
      />

      <DeleteMemberDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        member={member}
      />
    </Page>
  )
}

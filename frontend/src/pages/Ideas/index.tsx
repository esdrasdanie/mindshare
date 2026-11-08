import { Page } from '../../components/Page'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Plus } from 'lucide-react'
import { CreateIdeaDialog } from './components/CreateIdeaDialog'
import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { LIST_IDEAS } from '../../lib/graphql/queries/Idea'
import type { Idea } from '../../types'
import { IdeaCard } from './components/IdeaCard'
import { IdeaDetailDrawer } from './components/IdeaDetailDrawer'

export function IdeasPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const { data, loading, refetch } = useQuery<{ listIdeas: Idea[] }>(LIST_IDEAS)
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null)

  const ideas = data?.listIdeas || []

  // Busca o objeto completo da ideia selecionada no array da lista
  const selectedIdea = ideas.find((idea) => idea.id === selectedIdeaId) || null

  const handleIdeaClick = (ideaId: string) => {
    setSelectedIdeaId(ideaId)
    setOpenDrawer(true)
  }

  return (
    <Page>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <Label className='text-3xl font-medium text-purple-600'>Ideias</Label>
          <Button onClick={() => setOpenDialog(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Nova ideia
          </Button>
        </div>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-6'>
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`idea-skeleton-${i}`}
              className='h-32 rounded-lg border border-dashed border-muted-foreground/30'
            />
          ))}
        {!loading &&
          ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onClick={() => handleIdeaClick(idea.id)}
            />
          ))}
      </div>
      <IdeaDetailDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        idea={selectedIdea}
        // ideaId={selectedIdeaId}
      />
      <CreateIdeaDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => refetch()}
      />
    </Page>
  )
}

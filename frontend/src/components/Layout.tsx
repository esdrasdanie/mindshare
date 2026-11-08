import { Toaster } from '@/components/ui/sonner'
import { Header } from './Header'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen bg-gray-200'>
      <Header />
      <main className='mx-auto px-16 py-4'>{children}</main>
      <Toaster />
    </div>
  )
}

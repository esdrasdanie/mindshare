import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import logo from '@/assets/logo.svg'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'sonner'

export function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signup = useAuthStore((state) => state.signup)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const signupMutate = await signup({
        name,
        email,
        password,
      })
      if (signupMutate) {
        toast.success('Cadastro realizado com sucesso!')
      }
    } catch (error: any) {
      toast.error('Erro ao realizar o cadastro')
    } finally {
      setLoading(false)
    }
}

  return (
    <div className='flex items-center min-h-[calc(100vh-4rem)] justify-center flex-col gap-6'>
      <img src={logo} className='w-64 h-22' />
      <Card className='w-full max-w-md rounded-xl'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Crie sua conta</CardTitle>
          <CardDescription>
            Informe seu nome, e-email e senha de acesso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Nome</Label>
              <Input
                id='name'
                placeholder='Seu nome'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='email@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='*******'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type='submit' className='w-full' disabled={loading}>
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className='w-full max-w-md rounded-xl'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Já tem uma conta?
          </CardTitle>
          <CardDescription>Entre agora mesmo</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant='outline' className='w-full' asChild>
            <Link to='/login'>Acessar conta</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

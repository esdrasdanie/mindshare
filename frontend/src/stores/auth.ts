import type { LoginInput, RegisterInput, User } from '@/types'
import { create } from 'zustand'
import { apolloClient } from '@/lib/graphql/apollo'
import { persist } from 'zustand/middleware'
import { REGISTER } from '@/lib/graphql/mutations/Register'
import { LOGIN } from '@/lib/graphql/mutations/Login'

type RegisterMutatonData = {
  register: {
    token: string
    refreshToken: string
    user: User
  }
}

type LoginMutatonData = {
  login: {
    token: string
    refreshToken: string
    user: User
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  signup: (data: RegisterInput) => Promise<boolean>
  login: (data: LoginInput) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (loginData: LoginInput) => {
        try {
          const { data } = await apolloClient.mutate<
            LoginMutatonData,
            { data: LoginInput }
          >({
            mutation: LOGIN,
            variables: {
              data: {
                email: loginData.email,
                password: loginData.password,
              },
            },
          })

          if (data?.login) {
            const { user, token } = data.login
            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            })
            return true
          }
          return false
        } catch (error) {
          console.log('Erro ao fazer o login')
          throw error
        }
      },
      signup: async (registerData: RegisterInput) => {
        try {
          const { data } = await apolloClient.mutate<
            RegisterMutatonData,
            { data: RegisterInput }
          >({
            mutation: REGISTER,
            variables: {
              data: {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
              },
            },
          })
          if (data?.register) {
            const { token, user } = data.register

            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            })
            return true
          }
          return false
        } catch (error) {
          console.log('Erro ao fazer o cadastro')
          throw error
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        })
        apolloClient.clearStore()
      }
    }),
    {
      name: 'auth-storage',
    },
  ),
)

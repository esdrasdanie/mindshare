export interface User {
  id: string
  name: string
  email: string
  role?: string
  createdAt?: string
  updatedAt?: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface Idea {
  id: string
  title: string
  description?: string | null
  authorId: string
  author?: User
  countVotes?: number
  comments?: Comment[]
  votes?: Vote[]
  createdAt: string
  updatedAt?: string
}

export interface Comment {
  id: string
  ideaId: string
  authorId: string
  author?: User
  content: string
  createdAt: string
  updatedAt: string
}

export interface Vote {
  id: string
  ideaId: string
  userId: string
  createdAt: string
}

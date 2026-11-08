import { prismaClient } from '../../prisma/prisma'
import { CreateCommentInput } from '../dtos/input/comment.input'

export class CommentService {
  async create(ideaId: string, authorId: string, data: CreateCommentInput) {
    const findIdea = await prismaClient.idea.findUnique({
      where: {
        id: ideaId,
      },
    })
    if (!findIdea) throw new Error('Idea not found')
    return prismaClient.comment.create({
      data: {
        ideaId,
        authorId,
        content: data.content,
      },
    })
  }

  async listCommentsByIdea(ideaId: string) {
    return prismaClient.comment.findMany({
      where: {
        ideaId,
      },
    })
  }
}

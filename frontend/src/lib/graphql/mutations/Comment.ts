import { gql } from '@apollo/client'

export const CREATE_COMMENT = gql`
  mutation CreateComment($ideaId: String!, $data: CreateCommentInput!) {
    createComment(ideaId: $ideaId, data: $data) {
      id
      ideaId
      authorId
      author {
        id
        name
        email
      }
      content
      createdAt
      updatedAt
    }
  }
`

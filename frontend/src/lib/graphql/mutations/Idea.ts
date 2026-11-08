import { gql } from '@apollo/client'

export const CREATE_IDEA = gql`
  mutation CreateIdea($data: CreateIdeaInput!) {
    createIdea(data: $data) {
      id
      title
      description
      authorId
      author {
        id
        name
        email
      }
      countVotes
      createdAt
      updatedAt
    }
  }
`

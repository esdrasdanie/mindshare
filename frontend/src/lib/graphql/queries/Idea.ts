import { gql } from '@apollo/client'

export const LIST_IDEAS = gql`
  query ListIdeas {
    listIdeas {
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
      comments {
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
      }
      votes {
        id
        userId
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_IDEA = gql`
  query GetIdea($ideaId: String!) {
    getIdea(id: $ideaId) {
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
      comments {
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
      votes {
        id
        userId
      }
      createdAt
      updatedAt
    }
  }
`

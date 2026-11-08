import { gql } from '@apollo/client'

export const LIST_MEMBERS = gql`
  query ListMembers {
    listUsers {
      id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
`

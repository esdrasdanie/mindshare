import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id)
  }
`

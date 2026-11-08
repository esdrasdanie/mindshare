import { gql } from '@apollo/client'

export const TOGGLE_VOTE = gql`
  mutation ToggleVote($ideaId: String!) {
    toggleVote(ideaId: $ideaId)
  }
`

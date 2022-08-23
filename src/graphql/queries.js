import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                    fullName
                    description
                    reviewCount
                    ownerAvatarUrl
                    ratingAverage
                    forksCount
                    language
                }
            }
        }
    }
`

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`

import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
    query (
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
    ) {
        repositories(
            orderBy: $orderBy
            orderDirection: $orderDirection
            searchKeyword: $searchKeyword
        ) {
            edges {
                node {
                    id
                    fullName
                    description
                    reviewCount
                    stargazersCount
                    ownerAvatarUrl
                    ratingAverage
                    forksCount
                    language
                }
            }
        }
    }
`

export const GET_REPOSITORY = gql`
    query ($repositoryId: ID!) {
        repository(id: $repositoryId) {
            id
            fullName
            description
            reviewCount
            stargazersCount
            ownerAvatarUrl
            ratingAverage
            forksCount
            language
            url
        }
    }
`

export const GET_REVIEWS = gql`
    query ($repositoryId: ID!) {
        repository(id: $repositoryId) {
            id
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
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

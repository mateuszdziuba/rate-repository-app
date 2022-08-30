import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
    query (
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
        $after: String
        $first: Int
    ) {
        repositories(
            orderBy: $orderBy
            orderDirection: $orderDirection
            searchKeyword: $searchKeyword
            after: $after
            first: $first
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
                cursor
            }
            pageInfo {
                hasNextPage
                endCursor
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
    query ($repositoryId: ID! $after: String $first: Int) {
        repository(id: $repositoryId) {
            id
            reviews(after: $after first: $first) {
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
                    cursor
                }
                pageInfo {
                    hasNextPage
                    endCursor
                  }
            }
        }
    }
`

export const ME = gql`
    query getCurrentUser($includeReviews: Boolean = false){
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        repositoryId
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                    cursor
                }
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`

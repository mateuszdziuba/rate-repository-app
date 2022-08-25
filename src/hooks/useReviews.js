import { useQuery } from '@apollo/client'

import { GET_REVIEWS } from '../graphql/queries'

const useReviews = (id) => {
    const { data } = useQuery(GET_REVIEWS, {
        variables: { repositoryId: id },
        fetchPolicy: 'cache-and-network',
    })

    return {
        reviews: data?.repository.reviews.edges.map((r) => r.node),
    }
}

export default useReviews

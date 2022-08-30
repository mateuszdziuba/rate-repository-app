import { useApolloClient, useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = () => {
    const apolloClient = useApolloClient()
    const [mutate] = useMutation(DELETE_REVIEW)

    const deleteReview = async (id) => {
        await mutate({ variables: { deleteReviewId: id } })
        apolloClient.resetStore()
    }

    return deleteReview
}

export default useDeleteReview

import { useApolloClient, useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = () => {
    const apolloClient = useApolloClient()
    const [deleteReview] = useMutation(DELETE_REVIEW)

    const handleDeleteReview = async (id) => {
        await deleteReview({ variables: { deleteReviewId: id } })
        apolloClient.resetStore()
    }

    return handleDeleteReview
}

export default useDeleteReview

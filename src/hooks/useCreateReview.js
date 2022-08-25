import { useApolloClient, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
    const apolloClient = useApolloClient()
    const [mutate, result] = useMutation(CREATE_REVIEW)
    const navigate = useNavigate()

    const createReview = async ({
        ownerName,
        repositoryName,
        rating,
        text,
    }) => {
        const review = { ownerName, repositoryName, rating, text }
        const res = await mutate({
            variables: { review },
        })
        const id = res.data.createReview.repository.id
        apolloClient.resetStore()

        navigate(id)
    }

    return [createReview, result]
}

export default useCreateReview

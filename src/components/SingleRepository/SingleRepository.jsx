const { default: RepositoryItem } = require('../RepositoryItem')
import * as Linking from 'expo-linking'
import { useParams } from 'react-router-native'
import useRepository from '../../hooks/useRepository'
import useReviews from '../../hooks/useReviews'
import Button from '../Button'

const RepositoryInfo = ({ repository }) => (
    <RepositoryItem
        button={
            <Button
                label="Open in GitHub"
                onPress={() => Linking.openURL(repository.url)}
            />
        }
        {...repository}
    />
)

// const ReviewItem = ({ review }) => {
//     const {} = review
//     return <View></View>
// }

const SingleRepository = () => {
    const { repoId } = useParams()
    const { repository } = useRepository(repoId)
    const { reviews } = useReviews(repoId)
    console.log(reviews)

    return <RepositoryInfo repository={repository} />
}

export default SingleRepository

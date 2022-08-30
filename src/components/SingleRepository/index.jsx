import RepositoryItem from '../RepositoryItem'
import * as Linking from 'expo-linking'
import { StyleSheet, View, FlatList, Alert } from 'react-native'
import { useNavigate, useParams } from 'react-router-native'
import useRepository from '../../hooks/useRepository'
import useReviews from '../../hooks/useReviews'
import theme from '../../theme'
import Button from '../Common/Button'
import Text from '../Text'
import ItemSeparator from '../Common/ItemSeparator'
import useDeleteReview from '../../hooks/useDeleteReview'

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

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#fff',
        padding: 14,
    },
    reviewBox: {
        display: 'flex',
        flexDirection: 'row',
        fontFamily: theme.fonts.main,
        alignItems: 'flex-start',
    },
    innerLeft: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        borderStyle: 'solid',
        color: theme.colors.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    user: {
        fontSize: 16,
    },
    date: {
        marginBottom: 10,
    },
    innerRight: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        flexWrap: 'wrap',
    },
})

export const ReviewItem = ({ review, my = false }) => {
    const { id, repositoryId, text, user, createdAt, rating } = review
    const navigate = useNavigate()
    const deleteReview = useDeleteReview()
    return (
        <View style={styles.box}>
            <View style={styles.reviewBox}>
                <View style={styles.innerLeft}>
                    <Text>{rating}</Text>
                </View>
                <View style={styles.innerRight}>
                    <Text fontWeight="bold" style={styles.user}>
                        {my ? repositoryId : user?.username}
                    </Text>
                    <Text
                        fontSize="subheading"
                        color="secondary"
                        style={styles.date}
                    >
                        {createdAt}
                    </Text>
                    <View>
                        <Text>{text}</Text>
                    </View>
                </View>
            </View>
            {my && (
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button
                        label="View repository"
                        onPress={() => navigate(`/${repositoryId}`)}
                    />
                    <Button
                        label="Delete review"
                        color="red"
                        onPress={() =>
                            Alert.alert(
                                'Delete review',
                                'Are you sure you want to delete this review?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () =>
                                            console.log('cancel pressd'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Delete',
                                        onPress: () => deleteReview(id),
                                    },
                                ]
                            )
                        }
                    />
                </View>
            )}
        </View>
    )
}

const SingleRepository = () => {
    const { repoId } = useParams()
    const { repository } = useRepository(repoId)
    const { reviews, fetchMore } = useReviews({
        repositoryId: repoId,
        first: 3,
    })

    const onEndReach = () => {
        fetchMore()
    }

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => (
                <View>
                    <RepositoryInfo repository={repository} />
                    <ItemSeparator />
                </View>
            )}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    )
}

export default SingleRepository

import RepositoryItem from '../RepositoryItem'
import * as Linking from 'expo-linking'
import { StyleSheet, View, FlatList } from 'react-native'
import { useParams } from 'react-router-native'
import useRepository from '../../hooks/useRepository'
import useReviews from '../../hooks/useReviews'
import theme from '../../theme'
import Button from '../Common/Button'
import Text from '../Text'
import ItemSeparator from '../Common/ItemSeparator'

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

const ReviewItem = ({ review }) => {
    const { text, user, createdAt, rating } = review
    return (
        <View style={styles.box}>
            <View style={styles.innerLeft}>
                <Text>{rating}</Text>
            </View>
            <View style={styles.innerRight}>
                <Text fontWeight="bold" style={styles.user}>
                    {user.username}
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
    )
}

const SingleRepository = () => {
    const { repoId } = useParams()
    const { repository } = useRepository(repoId)
    const { reviews } = useReviews(repoId)

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
        />
    )
}

export default SingleRepository

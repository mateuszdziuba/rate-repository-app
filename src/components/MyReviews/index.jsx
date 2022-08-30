import { FlatList } from 'react-native'
import useUser from '../../hooks/useUser'
import ItemSeparator from '../Common/ItemSeparator'
import { ReviewItem } from '../SingleRepository'

const MyReviews = () => {
    const { data } = useUser({ includeReviews: true })

    const reviews = data?.me?.reviews.edges

    return (
        <FlatList
            data={reviews?.map((r) => r.node)}
            renderItem={({ item }) => <ReviewItem review={item} my={true} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
            // onEndReached={onEndReach}
            // onEndReachedThreshold={0.5}
        />
    )
}

export default MyReviews

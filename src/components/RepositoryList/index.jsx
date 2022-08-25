import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import RepositoryItem from '../RepositoryItem'
import useRepositories from '../../hooks/useRepositories'
import { useNavigate, useParams } from 'react-router-native'

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : []

    const navigate = useNavigate()

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <Pressable onPress={() => navigate(item.id)}>
                    <RepositoryItem key={item.id} {...item} />
                </Pressable>
            )}
        />
    )
}

const RepositoryList = () => {
    const { repositories } = useRepositories()
    const { repoId } = useParams()
    console.log(repoId)

    return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList

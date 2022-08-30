import { FlatList, Pressable, TextInput, View } from 'react-native'
import RepositoryItem from '../RepositoryItem'
import useRepositories from '../../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import ItemSeparator from '../Common/ItemSeparator'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useDebounce } from 'use-debounce'

const orderingPrinciples = [
    {
        label: 'Latest repositories',
        value: 'CREATED_AT:DESC',
    },
    {
        label: 'Highest rated repositories',
        value: 'RATING_AVERAGE:DESC',
    },
    {
        label: 'Lowest rated repositories',
        value: 'RATING_AVERAGE:ASC',
    },
]

const RepositoryListHeader = ({
    searchKeyword,
    setSearchKeyword,
    order,
    setOrder,
}) => (
    <View>
        <TextInput
            style={{
                backgroundColor: 'white',
                paddingHorizontal: 10,
            }}
            value={searchKeyword}
            onChangeText={setSearchKeyword}
        />
        <Picker
            selectedValue={order}
            onValueChange={(itemValue) => setOrder(itemValue)}
        >
            {orderingPrinciples.map((op) => (
                <Picker.Item key={op.label} label={op.label} value={op.value} />
            ))}
        </Picker>
    </View>
)

export class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        const { searchKeyword, setSearchKeyword, order, setOrder } = this.props

        return (
            <RepositoryListHeader
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                order={order}
                setOrder={setOrder}
            />
        )
    }

    render() {
        const { repositories, onEndReach, navigate } = this.props
        const repositoryNodes = repositories
            ? repositories.edges.map((edge) => edge.node)
            : []

        return (
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                ListHeaderComponent={this.renderHeader}
                renderItem={({ item }) => (
                    <Pressable onPress={() => navigate(item.id)}>
                        <RepositoryItem key={item.id} {...item} />
                    </Pressable>
                )}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
            />
        )
    }
}

const RepositoryList = () => {
    const [order, setOrder] = useState('CREATED_AT:DESC')
    const [orderBy, orderDirection] = order?.split(':') || [null, null]
    const [searchKeyword, setSearchKeyword] = useState('')
    const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)
    const { repositories, fetchMore } = useRepositories({
        first: 8,
        orderBy,
        orderDirection,
        searchKeyword: debouncedSearchKeyword,
    })

    const onEndReach = () => {
        fetchMore()
    }

    const navigate = useNavigate()
    // const pickerRef = useRef()

    // function open() {
    //     pickerRef.current.focus()
    // }

    // function close() {
    //     pickerRef.current.blur()
    // }

    return (
        <>
            <RepositoryListContainer
                repositories={repositories}
                order={order}
                setOrder={setOrder}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                navigate={navigate}
                onEndReach={onEndReach}
            />
        </>
    )
}

export default RepositoryList

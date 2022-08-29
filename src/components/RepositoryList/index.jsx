import { FlatList, Pressable, StyleSheet, TextInput } from 'react-native'
import RepositoryItem from '../RepositoryItem'
import useRepositories from '../../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import ItemSeparator from '../Common/ItemSeparator'
import React, { useState, useRef } from 'react'
import Text from '../Text'
import { Picker } from '@react-native-picker/picker'
import { View } from 'react-native-web'
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
    header: {
        height: 30,
        padding: 10,
    },
})

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
    open,
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
        <Pressable style={styles.header} onPress={open}>
            <Text>
                {orderingPrinciples.find((op) => op.value === order).label}
            </Text>
        </Pressable>
    </View>
)

export class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        const { searchKeyword, setSearchKeyword, order, open } = this.props

        return (
            <RepositoryListHeader
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                order={order}
                open={open}
            />
        )
    }

    render() {
        const { repositories, navigate } = this.props
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
            />
        )
    }
}

const RepositoryList = () => {
    const [order, setOrder] = useState('CREATED_AT:DESC')
    const [orderBy, orderDirection] = order?.split(':') || [null, null]
    const [searchKeyword, setSearchKeyword] = useState('')
    const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)
    const { repositories } = useRepositories({
        orderBy,
        orderDirection,
        searchKeyword: debouncedSearchKeyword,
    })

    const navigate = useNavigate()
    const pickerRef = useRef()

    function open() {
        pickerRef.current.focus()
    }

    // function close() {
    //     pickerRef.current.blur()
    // }

    return (
        <>
            <Picker
                ref={pickerRef}
                selectedValue={order}
                onValueChange={(itemValue) => setOrder(itemValue)}
            >
                {orderingPrinciples.map((op) => (
                    <Picker.Item
                        key={op.label}
                        label={op.label}
                        value={op.value}
                    />
                ))}
            </Picker>
            <RepositoryListContainer
                repositories={repositories}
                order={order}
                open={open}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                navigate={navigate}
            />
        </>
    )
}

export default RepositoryList

import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import Text from '../Text'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
    },
})

const Stat = ({ label, count }) => {
    const formattedCount = useMemo(() => {
        if (count < 1000) return count
        return `${parseFloat(count / 1000).toFixed(1)}k`
    })

    return (
        <View style={styles.container}>
            <Text color="secondary" fontSize="subheading">
                {label}
            </Text>
            <Text fontWeight="bold">{formattedCount}</Text>
        </View>
    )
}

export default Stat

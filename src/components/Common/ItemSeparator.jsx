const { StyleSheet, View } = require('react-native')

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
})

const ItemSeparator = () => <View style={styles.separator} />

export default ItemSeparator

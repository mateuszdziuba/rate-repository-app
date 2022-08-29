import { Image, StyleSheet, View } from 'react-native'
import theme from '../../theme'
import Stat from '../RepositoryList/Stat'
import Text from '../Text'

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#fff',
        padding: 14,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 20,
    },
    upperSection: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
    },
    innerUpperSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        maxWidth: 300,
    },
    languageBox: {
        backgroundColor: theme.colors.primary,
        padding: 6,
        borderRadius: 5,
    },
    lowerSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
    },
})

const RepositoryItem = (props) => {
    return (
        <View testID="repositoryItem" style={styles.box}>
            <View style={styles.upperSection}>
                <Image
                    source={{ uri: props.ownerAvatarUrl }}
                    style={styles.image}
                />
                <View style={styles.innerUpperSection}>
                    <Text style={{ fontWeight: '600' }}>{props.fullName}</Text>
                    <Text color="secondary">{props.description}</Text>
                    <View style={styles.languageBox}>
                        <Text style={{ color: 'white' }}>{props.language}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.lowerSection}>
                <Stat label="Stars" count={props.stargazersCount} />
                <Stat label="Forks" count={props.forksCount} />
                <Stat label="Reviews" count={props.reviewCount} />
                <Stat label="Rating" count={props.ratingAverage} />
            </View>
            {props.button ?? <></>}
        </View>
    )
}

export default RepositoryItem

import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import { Link } from 'react-router-native'
import Constants from 'expo-constants'
import Text from '../Text'
import useUser from '../../hooks/useUser'
import useSignOut from '../../hooks/useSignOut'

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#24292e',
    },
    // contentContainer: {
    //   padding: 20,
    // },
    menuItem: {
        color: 'white',
        padding: 20,
    },
})

const AppBar = () => {
    const user = useUser()
    const signOut = useSignOut()

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                contentContainerStyle={styles.contentContainer}
            >
                <Link to="/">
                    <Text style={styles.menuItem}>Repositories</Text>
                </Link>
                {user?.me ? (
                    <>
                        <Link to="review">
                            <Text style={styles.menuItem}>Create a review</Text>
                        </Link>
                        <Pressable onPress={signOut}>
                            <Text style={styles.menuItem}>Sign out</Text>
                        </Pressable>
                    </>
                ) : (
                    <Link to="signin">
                        <Text style={styles.menuItem}>Sign in</Text>
                    </Link>
                )}
            </ScrollView>
        </View>
    )
}

export default AppBar

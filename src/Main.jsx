import { StyleSheet, View } from 'react-native'
import AppBar from './components/AppBar'

import { Route, Routes, Navigate } from 'react-router-native'

import RepositoryList from './components/RepositoryList'
import SignIn from './components/SignIn'
import SingleRepository from './components/SingleRepository'

SingleRepository

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: '#e1e5e8',
    },
})

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} exact />
                <Route path="/:repoId" element={<SingleRepository />} />
                <Route path="/signin" element={<SignIn />} exact />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    )
}

export default Main

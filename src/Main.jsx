import { StyleSheet, View } from 'react-native'
import AppBar from './components/AppBar'

import { Route, Routes, Navigate } from 'react-router-native'

import RepositoryList from './components/RepositoryList'
import SignIn from './components/SignIn'
import SingleRepository from './components/SingleRepository'
import Review from './components/ReviewForm'
import SignUp from './components/SignUp'
import MyReviews from './components/MyReviews'

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
                <Route path="/signup" element={<SignUp />} exact />
                <Route path="/review" element={<Review />} exact />
                <Route path="/myreviews" element={<MyReviews />} exact />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    )
}

export default Main

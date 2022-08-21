import { StyleSheet, View } from 'react-native';
import AppBar from './components/AppBar';

import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './components/RepositoryList';
import SignIn from './components/SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;

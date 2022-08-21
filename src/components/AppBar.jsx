import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';

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
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
        <Link to="/">
          <Text style={styles.menuItem}>Repositories</Text>
        </Link>
        <Link to="signin">
          <Text style={styles.menuItem}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;

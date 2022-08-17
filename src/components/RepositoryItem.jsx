import { Image, StyleSheet, View } from 'react-native'
import theme from '../theme'
import Stat from './Stat'
import Text from './Text'

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
    maxWidth: '40ch',
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
  },
})

const RepositoryItem = (props) => {
  const {
    // id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = props

  return (
    <View style={styles.box}>
      <View style={styles.upperSection}>
        <Image source={{ uri: ownerAvatarUrl }} style={styles.image} />
        <View style={styles.innerUpperSection}>
          <Text style={{ fontWeight: 600 }}>{fullName}</Text>
          <Text color="secondary">{description}</Text>
          <View style={styles.languageBox}>
            <Text style={{ color: 'white' }}>{language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.lowerSection}>
        <Stat label="Stars" count={stargazersCount} />
        <Stat label="Forks" count={forksCount} />
        <Stat label="Reviews" count={reviewCount} />
        <Stat label="Rating" count={ratingAverage} />
      </View>
    </View>
  )
}

export default RepositoryItem

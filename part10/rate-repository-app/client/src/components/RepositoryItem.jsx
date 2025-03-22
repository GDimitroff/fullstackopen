import { Image, StyleSheet, View } from 'react-native'

import Text from './Text'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  info: {
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  name: {
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
    color: 'gray',
    fontSize: 16,
    flexShrink: 1,
  },
  language: {
    backgroundColor: '#0366d6',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  languageText: {
    color: 'white',
  },
  stat: {
    alignItems: 'center',
  },
  statText: {
    marginBottom: 5,
  },
})

const RepositoryItem = ({ repository }) => {
  const formatNumber = (number) => {
    if (number < 1000) {
      return number
    } else {
      return `${(number / 1000).toFixed(1)}k`
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} src={repository.ownerAvatarUrl} />
        <View style={styles.info}>
          <Text fontSize='heading' fontWeight='bold'>
            {repository.fullName}
          </Text>
          <Text style={styles.description}>{repository.description}</Text>
          <View style={styles.language}>
            <Text style={styles.languageText}>{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text fontSize='subheading' color='textSecondary' style={styles.statText}>
            Stars
          </Text>
          <Text fontSize='subheading' fontWeight='bold'>
            {formatNumber(repository.stargazersCount)}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text fontSize='subheading' color='textSecondary' style={styles.statText}>
            Forks
          </Text>
          <Text fontSize='subheading' fontWeight='bold'>
            {formatNumber(repository.forksCount)}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text fontSize='subheading' color='textSecondary' style={styles.statText}>
            Reviews
          </Text>
          <Text fontSize='subheading' fontWeight='bold'>
            {formatNumber(repository.reviewCount)}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text fontSize='subheading' color='textSecondary' style={styles.statText}>
            Rating
          </Text>
          <Text fontSize='subheading' fontWeight='bold'>
            {formatNumber(repository.ratingAverage)}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem

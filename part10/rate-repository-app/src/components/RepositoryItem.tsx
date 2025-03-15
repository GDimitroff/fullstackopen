import { Image, StyleSheet, Text, View } from 'react-native'
import { Repository } from '../interfaces'

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
    fontWeight: 'bold',
    fontSize: 18,
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
    color: 'gray',
    fontSize: 16,
    marginBottom: 5,
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})

const RepositoryItem = ({ repository }: { repository: Repository }) => {
  const formatNumber = (number: number) => {
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
          <Text style={styles.name}>{repository.fullName}</Text>
          <Text style={styles.description}>{repository.description}</Text>
          <View style={styles.language}>
            <Text style={styles.languageText}>{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statText}>Stars</Text>
          <Text style={styles.statValue}>{formatNumber(repository.stargazersCount)}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statText}>Forks</Text>
          <Text style={styles.statValue}>{formatNumber(repository.forksCount)}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statText}>Reviews</Text>
          <Text style={styles.statValue}>{formatNumber(repository.reviewCount)}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statText}>Rating</Text>
          <Text style={styles.statValue}>{formatNumber(repository.ratingAverage)}</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem

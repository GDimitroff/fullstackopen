import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useParams } from 'react-router-native'
import * as Linking from 'expo-linking'
import { format } from 'date-fns'

import Text from './Text'
import useRepository from '../hooks/useRepository'
import { formatNumber } from '../helpers/repository-helpers'

const styles = StyleSheet.create({
  repositoryContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 120,
    height: 120,
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
    marginTop: 10,
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
  githubButton: {
    backgroundColor: '#0366d6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  githubButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  noReviews: {
    padding: 15,
    alignItems: 'center',
  },
  separator: {
    height: 5,
  },
  reviewContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  reviewRating: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderColor: '#0366d6',
    borderWidth: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  reviewRatingText: {
    color: '#0366d6',
    fontSize: 20,
    fontWeight: 'bold',
  },
  reviewContent: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
  },
  reviewUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewTimestamp: {
    color: 'gray',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
  },
})

const RepositoryInfo = ({ repository }) => {
  const handleOpenLink = () => {
    Linking.openURL(repository.url)
  }

  return (
    <View style={styles.repositoryContainer} testID='repositoryItem'>
      <View style={styles.header}>
        <Image style={styles.avatar} src={repository.ownerAvatarUrl} />
        <View style={styles.info}>
          <View>
            <Text fontSize='heading' fontWeight='bold'>
              {repository.fullName}
            </Text>
            <Text style={styles.description}>{repository.description}</Text>
          </View>
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
      <TouchableOpacity onPress={handleOpenLink} style={styles.githubButton}>
        <Text style={styles.githubButtonText}>GitHub</Text>
      </TouchableOpacity>
    </View>
  )
}

const ReviewItem = ({ review }) => {
  const {
    text,
    rating,
    createdAt,
    user: { username },
  } = review

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewRating}>
        <Text style={styles.reviewRatingText}>{rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.reviewUsername}>{username}</Text>
        <Text style={styles.reviewTimestamp}>{format(createdAt, 'dd MMMM yyyy HH:mm')}</Text>
        <Text style={styles.reviewText}>{text}</Text>
      </View>
    </View>
  )
}

const SingleRepository = () => {
  const { id } = useParams()
  const { data: repository, loading, error } = useRepository(id)

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node) || []

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ListEmptyComponent={() => (
        <View style={styles.noReviews}>
          <Text>No reviews just yet...</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}

export default SingleRepository

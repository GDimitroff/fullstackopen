import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Navigate } from 'react-router-native'
import { format } from 'date-fns'

import Text from './Text'
import useUser from '../hooks/useUser'

const styles = StyleSheet.create({
  noReviews: {
    padding: 15,
    alignItems: 'center',
  },
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: 'white',
  },
  reviewInfo: {
    flexDirection: 'row',
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
    paddingRight: 15,
  },
  reviewTimestamp: {
    color: 'gray',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    margin: 15,
  },
  viewRepositoryButton: {
    backgroundColor: '#0366d6',
    padding: 15,
    flex: 1,
    borderRadius: 5,
  },
  viewRepositoryText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteReviewButton: {
    backgroundColor: '#d73a4a',
    padding: 15,
    flex: 1,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

const MyReviewItem = ({ review }) => {
  const { text, rating, createdAt, repositoryId } = review

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewInfo}>
        <View style={styles.reviewRating}>
          <Text style={styles.reviewRatingText}>{rating}</Text>
        </View>
        <View style={styles.reviewContent}>
          <Text
            fontSize='heading'
            fontWeight='bold'
            style={{
              marginBottom: 5,
            }}
          >
            {repositoryId.replace('.', '/')}
          </Text>
          <Text style={styles.reviewTimestamp}>{format(createdAt, 'dd MMMM yyyy HH:mm')}</Text>
          <Text style={styles.reviewText}>{text}</Text>
        </View>
      </View>
      <View style={styles.reviewActions}>
        <TouchableOpacity
          onPress={() => console.log('View repository')}
          style={styles.viewRepositoryButton}
        >
          <Text style={styles.viewRepositoryText}>View repository</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Delete review')}
          style={styles.deleteReviewButton}
        >
          <Text style={styles.deleteButtonText}>Delete review</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const MyReviewsList = () => {
  const { data: user, loading, error } = useUser({ includeReviews: true })

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  if (!user.me) {
    return <Navigate to='/' replace={true} />
  }

  const reviews = user.me.reviews?.edges?.map((edge) => edge.node) ?? []

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <MyReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListEmptyComponent={() => (
        <View style={styles.noReviews}>
          <Text>No reviews just yet...</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}

export default MyReviewsList

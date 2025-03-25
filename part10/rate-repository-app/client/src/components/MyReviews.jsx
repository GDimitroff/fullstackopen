import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Navigate, useNavigate } from 'react-router-native'
import { format } from 'date-fns'

import Text from './Text'
import useUser from '../hooks/useUser'
import useDeleteReview from '../hooks/useDeleteReview'

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

const MyReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate()
  const [deleteUser] = useDeleteReview()

  const { id, text, rating, createdAt, repositoryId } = review
  const formattedRepositoryId = repositoryId.replace('.', '/')

  const handleDeleteReview = (id) => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteUser(id)
          await refetch()
        },
      },
    ])
  }

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
            {formattedRepositoryId}
          </Text>
          <Text style={styles.reviewTimestamp}>{format(createdAt, 'dd MMMM yyyy HH:mm')}</Text>
          <Text style={styles.reviewText}>{text}</Text>
        </View>
      </View>
      <View style={styles.reviewActions}>
        <TouchableOpacity
          onPress={() => navigate(`/${repositoryId}`)}
          style={styles.viewRepositoryButton}
        >
          <Text style={styles.viewRepositoryText}>View repository</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteReview(id)} style={styles.deleteReviewButton}>
          <Text style={styles.deleteButtonText}>Delete review</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const MyReviewsList = () => {
  const { data: user, loading, error, refetch } = useUser({ includeReviews: true })

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
      renderItem={({ item }) => <MyReviewItem review={item} refetch={refetch} />}
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

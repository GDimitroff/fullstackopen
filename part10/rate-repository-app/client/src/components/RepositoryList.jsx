import { useQuery } from '@apollo/client'
import { FlatList, View, StyleSheet } from 'react-native'

import RepositoryItem from './RepositoryItem'
import { GET_REPOSITORIES } from '../graphql/queries'
import Text from './Text'

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES)

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  const repositoryNodes = data ? data.repositories.edges.map((edge) => edge.node) : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
    />
  )
}

export default RepositoryList

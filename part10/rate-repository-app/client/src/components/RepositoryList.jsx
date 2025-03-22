import { FlatList, View, StyleSheet } from 'react-native'

import RepositoryItem from './RepositoryItem'
import Text from './Text'
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ data, loading, error }) => {
  const repositoryNodes = data ? data.repositories.edges.map((edge) => edge.node) : []

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
    />
  )
}

const RepositoryList = () => {
  const { data, error, loading } = useRepositories()

  return <RepositoryListContainer data={data} loading={loading} error={error} />
}

export default RepositoryList

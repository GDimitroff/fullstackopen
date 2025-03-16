import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryItem'
import { useEffect, useState } from 'react'

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const [repositories, setRepositories] = useState()

  const fetchRepositories = async () => {
    const response = await fetch('http://192.168.0.222:5000/api/repositories')
    const data = await response.json()

    setRepositories(data)
  }

  useEffect(() => {
    fetchRepositories(repositories)
  }, [])

  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : []

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

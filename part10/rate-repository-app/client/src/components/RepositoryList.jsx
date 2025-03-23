import { useState } from 'react'
import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Menu, Button, PaperProvider } from 'react-native-paper'

import RepositoryItem from './RepositoryItem'
import Text from './Text'
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
  sortByMenu: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
})

const sortItems = [
  {
    label: 'Latest repositories',
    value: 'latest',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  {
    label: 'Highest rated repositories',
    value: 'highest',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  {
    label: 'Lowest rated repositories',
    value: 'lowest',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
]

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ data, loading, error, sortItem, setSortItem }) => {
  const navigate = useNavigate()

  const [visible, setVisible] = useState(false)

  const repositoryNodes = data ? data.repositories.edges.map((edge) => edge.node) : []

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <PaperProvider>
      <View style={styles.sortByMenu}>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Button onPress={() => setVisible(true)}>
              {visible ? '▼' : '▶'} {sortItem.label || 'Select language'}
            </Button>
          }
        >
          {sortItems.map((item) => (
            <Menu.Item
              key={item.value}
              onPress={() => {
                setSortItem(item)
                setVisible(false)
              }}
              title={item.label}
            />
          ))}
        </Menu>
      </View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/${item.id}`)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
      />
    </PaperProvider>
  )
}

const RepositoryList = () => {
  const [sortItem, setSortItem] = useState(sortItems[0])
  const { data, error, loading } = useRepositories(sortItem)

  return (
    <RepositoryListContainer
      data={data}
      loading={loading}
      error={error}
      sortItem={sortItem}
      setSortItem={setSortItem}
    />
  )
}

export default RepositoryList

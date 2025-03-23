import { useState } from 'react'
import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Menu, Button, PaperProvider, Searchbar } from 'react-native-paper'
import { useDebounce } from 'use-debounce'

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
    paddingTop: 0,
  },
  searchQueryInput: {
    margin: 10,
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

export const RepositoryListContainer = ({
  data,
  loading,
  error,
  searchQuery,
  setSearchQuery,
  sortItem,
  setSortItem,
}) => {
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
      <Searchbar
        placeholder='Search'
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchQueryInput}
      />
      {repositoryNodes.length > 0 && (
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
      )}
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/${item.id}`)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: 'center',
              padding: 10,
            }}
          >
            No repositories
          </Text>
        }
      />
    </PaperProvider>
  )
}

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
  const [sortItem, setSortItem] = useState(sortItems[0])
  const { data, error, loading } = useRepositories(debouncedSearchQuery, sortItem)

  return (
    <RepositoryListContainer
      data={data}
      loading={loading}
      error={error}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      sortItem={sortItem}
      setSortItem={setSortItem}
    />
  )
}

export default RepositoryList

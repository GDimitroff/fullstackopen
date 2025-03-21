import Constants from 'expo-constants'
import { useApolloClient } from '@apollo/client'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigate } from 'react-router-native'
import useMe from '../hooks/useMe'
import useAuthStorage from '../hooks/useAuthStorage'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
})

const AppBar = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const navigate = useNavigate()
  const { data } = useMe()

  const handleLogout = async () => {
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
    navigate('/', { replace: true })
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <TouchableOpacity onPress={() => navigate('/', { replace: true })}>
          <Text style={styles.text}>Repositories</Text>
        </TouchableOpacity>
        {data.me ? (
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigate('/auth')}>
            <Text style={styles.text}>Sign In</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar

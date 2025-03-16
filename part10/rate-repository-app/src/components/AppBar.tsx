import Constants from 'expo-constants'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Link, useNavigate } from 'react-router-native'

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
  const navigate = useNavigate()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('/', { replace: true })}>
        <Text style={styles.text}>Repositories</Text>
      </TouchableOpacity>
      <Link to='/auth'>
        <Text style={styles.text}>Sign In</Text>
      </Link>
    </View>
  )
}

export default AppBar

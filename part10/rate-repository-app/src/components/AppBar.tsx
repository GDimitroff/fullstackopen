import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  container: {
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
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log('Repositories')}>
        <Text style={styles.text}>Repositories</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AppBar

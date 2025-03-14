import { View, Text, StyleSheet } from 'react-native'

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Auth screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
})

export default AuthScreen

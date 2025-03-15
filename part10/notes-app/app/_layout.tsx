import { Stack } from 'expo-router'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import { AuthProvider, useAuth } from '@/contexts/AuthContext'

const HeaderLogout = () => {
  const { user, logout } = useAuth()

  return user ? (
    <TouchableOpacity onPress={logout} style={styles.logoutButton}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ) : null
}

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          contentStyle: {
            paddingTop: 10,
            paddingHorizontal: 10,
            backgroundColor: '#fff',
          },
          headerRight: () => <HeaderLogout />,
        }}
      >
        <Stack.Screen
          name='index'
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name='notes'
          options={{
            headerTitle: 'Notes',
          }}
        />
        <Stack.Screen
          name='auth'
          options={{
            headerTitle: 'Login',
          }}
        />
      </Stack>
    </AuthProvider>
  )
}

export default RootLayout

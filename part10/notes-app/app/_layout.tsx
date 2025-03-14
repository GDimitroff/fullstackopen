import { Stack } from 'expo-router'

import { AuthProvider } from '@/contexts/AuthContext'

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
      </Stack>
    </AuthProvider>
  )
}

export default RootLayout

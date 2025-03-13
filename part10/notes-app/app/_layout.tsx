import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
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
  )
}

export default RootLayout

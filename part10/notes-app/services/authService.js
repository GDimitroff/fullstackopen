import { ID } from 'react-native-appwrite'

import { account } from './appwrite'

const authService = {
  async register(email, password) {
    try {
      return await account.create(ID.unique(), email, password)
    } catch (error) {
      console.error('Error registering user', error.message)
      return { error: error.message || 'Registration failed. Please try again...' }
    }
  },
  async login(email, password) {
    try {
      return await account.createEmailPasswordSession(email, password)
    } catch (error) {
      console.error('Error registering user', error.message)
      return { error: error.message || 'Login failed. Please check your credentials...' }
    }
  },
  async gerUser() {
    try {
      return await account.get()
    } catch (error) {
      return null
    }
  },
  async logout() {
    try {
      return await account.deleteSession('current')
    } catch (error) {
      console.error('Error logging out', error.message)
      return { error: error.message || 'Logout failed. Please try again...' }
    }
  },
}

export default authService

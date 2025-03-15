import { ID, Query } from 'react-native-appwrite'

import databaseService from './databaseService'
import { config } from './appwrite'

const noteService = {
  async getNotes(userId) {
    if (!userId) {
      console.error('Error: Missing userId in getNotes()')
      return {
        data: [],
        error: 'Missing userId',
      }
    }

    try {
      const response = await databaseService.listDocuments(config.db, config.col.notes, [
        Query.equal('user_id', userId),
      ])

      return response
    } catch (error) {
      console.error('Error: getNotes()', error)
      return {
        data: [],
        error: 'Error fetching notes',
      }
    }
  },
  async addNote(user_id, text) {
    if (!text) {
      return { error: 'Note text is required' }
    }

    const data = {
      text,
      createdAt: new Date().toISOString(),
      user_id,
    }

    const response = await databaseService.createDocument(
      config.db,
      config.col.notes,
      data,
      ID.unique(),
    )

    if (response.error) {
      return { error: response.error }
    }

    return { data: response }
  },
  async updateNote(id, text) {
    const response = await databaseService.updateDocument(config.db, config.col.notes, id, {
      text,
    })

    if (response.error) {
      return { error: response.error }
    }

    return { data: response }
  },
  async deleteNote(id) {
    const response = await databaseService.deleteDocument(config.db, config.col.notes, id)

    if (response.error) {
      return { error: response.error }
    }

    return { success: true }
  },
}

export default noteService

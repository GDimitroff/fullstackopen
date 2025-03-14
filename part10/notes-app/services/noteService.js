import { ID } from 'react-native-appwrite'

import databaseService from './databaseService'
import { config } from './appwrite'

const noteService = {
  async getNotes() {
    const response = await databaseService.listDocuments(config.db, config.col.notes)

    if (response.error) {
      return { error: response.error }
    }

    return { data: response }
  },
  async addNote(text) {
    if (!text) {
      return { error: 'Note text is required' }
    }

    const data = {
      text,
      createdAt: new Date().toISOString(),
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
  async deleteNote(id) {
    const response = await databaseService.deleteDocument(config.db, config.col.notes, id)

    if (response.error) {
      return { error: response.error }
    }

    return { success: true }
  },
}

export default noteService

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
}

export default noteService

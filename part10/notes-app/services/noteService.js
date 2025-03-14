import { ID } from 'react-native-appwrite'

import databaseService from './databaseService'
import { config } from './appwrite'

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID

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

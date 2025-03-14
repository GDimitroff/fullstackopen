import { database } from './appwrite'

const databaseService = {
  async listDocuments(dbId, colId) {
    try {
      const response = await database.listDocuments(dbId, colId)
      return response.documents || []
    } catch (error) {
      console.error('Error fetching documents', error.message)
      return { error: error.message }
    }
  },
}

export default databaseService

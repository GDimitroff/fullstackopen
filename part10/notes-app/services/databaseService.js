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
  async createDocument(dbId, colId, data, id = null) {
    try {
      return await database.createDocument(dbId, colId, id || undefined, data)
    } catch (error) {
      console.error('Error creating document', error.message)
      return { error: error.message }
    }
  },
  async deleteDocument(dbId, colId, docId) {
    try {
      await database.deleteDocument(dbId, colId, docId)
      return { success: true }
    } catch (error) {
      console.error('Error deleting document', error.message)
      return { error: error.message }
    }
  },
}

export default databaseService

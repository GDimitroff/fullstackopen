import { database } from './appwrite'

const databaseService = {
  async listDocuments(dbId, colId, queries = []) {
    try {
      const response = await database.listDocuments(dbId, colId, queries)
      return { data: response.documents || [], error: null }
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
  async updateDocument(dbId, colId, id, data) {
    try {
      return await database.updateDocument(dbId, colId, id, data)
    } catch (error) {
      console.error('Error updating document', error.message)
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

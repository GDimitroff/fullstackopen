import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import noteService from '@/services/noteService'
import { useAuth } from '@/contexts/AuthContext'
import NoteList from '@/components/NoteList'
import AddNoteModal from '@/components/AddNoteModal'
import { Note } from '@/interfaces/notes'

const NoteScreen = () => {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [notes, setNotes] = useState<Array<Note>>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  async function init() {
    setLoading(true)

    const response = await noteService.getNotes(user.$id)

    if (response.error) {
      setError(response.error)
      Alert.alert('Error', response.error)
    } else {
      setNotes(response.data as unknown as Array<Note>)
      setError(null)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!user && !authLoading) {
      router.replace('/auth')
    }
  }, [user, authLoading])

  useEffect(() => {
    if (user) {
      init()
    }
  }, [user])

  const handleAddNote = async () => {
    if (newNote.trim() === '') return

    const response = await noteService.addNote(user.$id, newNote)

    if (response.error) {
      Alert.alert('Error', response.error)
    } else {
      setNotes([...notes, response.data as unknown as Note])
    }

    setNewNote('')
    setModalVisible(false)
  }

  const handleEditNote = async (id: string, newText: string) => {
    if (!newText.trim()) {
      Alert.alert('Error', 'Note cannot be empty')
      return
    }

    const response = await noteService.updateNote(id, newText)
    if (response.error) {
      Alert.alert('Error', response.error)
    } else {
      setNotes((prev) => prev.map((note) => (note.$id === id ? { ...note, text: newText } : note)))
    }
  }

  const handleDeleteNote = async (id: string) => {
    Alert.alert('Delete note', 'Are you sure you want to delete this note?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const response = await noteService.deleteNote(id)

          if (response.error) {
            Alert.alert('Error', response.error)
          } else {
            setNotes(notes.filter((note) => note.$id !== id))
          }
        },
      },
    ])
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' color='tomato' />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {notes.length === 0 ? (
            <Text style={styles.noNotesText}>No notes found</Text>
          ) : (
            <NoteList notes={notes} onDelete={handleDeleteNote} onEdit={handleEditNote} />
          )}
        </>
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>

      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={handleAddNote}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  noNotesText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 20,
  },
})

export default NoteScreen

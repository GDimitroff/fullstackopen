import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'

import noteService from '@/services/noteService'
import NoteList from '@/components/NoteList'
import AddNoteModal from '@/components/AddNoteModal'
import { Note } from '@/interfaces/notes'

const NoteScreen = () => {
  const [notes, setNotes] = useState<Array<Note>>([])

  const [modalVisible, setModalVisible] = useState(false)
  const [newNote, setNewNote] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  async function init() {
    setLoading(true)

    const response = await noteService.getNotes()

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
    init()
  }, [])

  const handleAddNote = async () => {
    if (newNote.trim() === '') return

    const response = await noteService.addNote(newNote)

    if (response.error) {
      Alert.alert('Error', response.error)
    } else {
      setNotes([...notes, response.data as unknown as Note])
    }

    setNewNote('')
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' color='tomato' />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <NoteList notes={notes} />
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
})

export default NoteScreen

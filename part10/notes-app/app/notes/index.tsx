import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import NoteList from '@/components/NoteList'
import AddNoteModal from '@/components/AddNoteModal'

const NoteScreen = () => {
  const [notes, setNotes] = useState([
    {
      id: '1',
      text: 'First Note',
    },
    {
      id: '2',
      text: 'Second Note',
    },
    {
      id: '3',
      text: 'Third Note',
    },
  ])

  const [modalVisible, setModalVisible] = useState(false)
  const [newNote, setNewNote] = useState('')

  const handleAddNote = () => {
    if (newNote.trim() === '') return

    setNotes([
      ...notes,
      {
        id: Date.now().toString(),
        text: newNote,
      },
    ])

    setNewNote('')
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <NoteList notes={notes} />

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
})

export default NoteScreen

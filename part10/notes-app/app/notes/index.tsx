import { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

type NoteProps = { title: string; content: string }

const Note = ({ title }: NoteProps) => {
  return (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{title}</Text>
    </View>
  )
}

const NoteScreen = () => {
  const [notes, setNotes] = useState([
    {
      id: '1',
      title: 'First Note',
      content: 'This is the',
    },
    {
      id: '2',
      title: 'Second Note',
      content: 'Second Note',
    },
    {
      id: '3',
      title: 'Third Note',
      content: 'Third Note',
    },
  ])

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({ item }) => <Note title={item.title} content={item.content} />}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'tomato',
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

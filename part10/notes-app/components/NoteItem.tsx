import { useState, useRef } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { Note } from '@/interfaces/notes'

interface Props {
  note: Note
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const NoteItem = ({ note, onDelete, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(note.text)
  const inputRef = useRef<TextInput | null>(null)

  const onSave = async () => {
    if (editedText.trim() === '') return

    onEdit(note.$id, editedText)
    setIsEditing(false)
    inputRef.current?.blur()
  }

  return (
    <View style={styles.noteItem}>
      {isEditing ? (
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={editedText}
          onChangeText={setEditedText}
          autoFocus
          onSubmitEditing={onSave}
          returnKeyType='done'
        />
      ) : (
        <Text style={styles.noteText}>{note.text}</Text>
      )}
      <View style={styles.actions}>
        {isEditing ? (
          <TouchableOpacity onPress={onSave}>
            <Text style={styles.edit}>💾</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.edit}>✏️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => onDelete(note.$id)}>
          <Text style={styles.delete}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  delete: {
    fontSize: 18,
    color: 'red',
  },
  input: {},
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  edit: {
    fontSize: 18,
    marginRight: 10,
    color: 'blue',
  },
})

export default NoteItem

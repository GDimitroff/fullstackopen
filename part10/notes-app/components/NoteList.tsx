import { FlatList, View } from 'react-native'

import NoteItem from '@/components/NoteItem'
import { Note } from '@/interfaces/notes'

interface Props {
  notes: Array<Note>
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const NoteList = ({ notes, onDelete, onEdit }: Props) => {
  return (
    <View>
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />}
        keyExtractor={(item) => item.$id}
      />
    </View>
  )
}

export default NoteList

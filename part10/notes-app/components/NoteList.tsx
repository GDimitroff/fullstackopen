import { FlatList, View } from 'react-native'

import NoteItem from '@/components/NoteItem'
import { Note } from '@/interfaces/notes'

interface Props {
  notes: Array<Note>
  onDelete: (id: string) => void
}

const NoteList = ({ notes, onDelete }: Props) => {
  return (
    <View>
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteItem note={item} onDelete={onDelete} />}
        keyExtractor={(item) => item.$id}
      />
    </View>
  )
}

export default NoteList

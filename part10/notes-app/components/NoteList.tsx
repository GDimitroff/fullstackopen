import { FlatList, View } from 'react-native'

import NoteItem from '@/components/NoteItem'
import { Note } from '@/interfaces/notes'

interface Props {
  notes: Array<Note>
}

const NoteList = ({ notes }: Props) => {
  return (
    <View>
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteItem note={item} />}
        keyExtractor={(item) => item.$id}
      />
    </View>
  )
}

export default NoteList

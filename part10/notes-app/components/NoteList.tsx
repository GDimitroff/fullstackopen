import { FlatList, View } from 'react-native'

import NoteItem from '@/components/NoteItem'

interface Props {
  notes: Array<{
    id: string
    text: string
  }>
}

const NoteList = ({ notes }: Props) => {
  return (
    <View>
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteItem note={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default NoteList

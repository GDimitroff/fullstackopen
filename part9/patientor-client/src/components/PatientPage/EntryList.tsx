import { Entry } from '../../types'
import EntryItem from './EntryItem'

interface EntryListProps {
  entries: Array<Entry> | undefined
}

const EntryList = ({ entries }: EntryListProps) => {
  if (!entries || entries.length === 0) return null

  return (
    <div>
      <h3>entries</h3>
      {entries.map((entry) => {
        return (
          <EntryItem
            key={entry.id}
            entry={entry}
          />
        )
      })}
    </div>
  )
}

export default EntryList

import { IEntry } from '../../types'
import EntryItem from './EntryItem'

interface Props {
  entries: Array<IEntry> | undefined
}

const EntryList = ({ entries }: Props) => {
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

import { IDiagnosis, IEntry } from '../../types'
import EntryItem from './EntryItem'

interface Props {
  entries: Array<IEntry> | undefined
  diagnoses: Array<IDiagnosis>
}

const EntryList = ({ entries, diagnoses }: Props) => {
  if (!entries || entries.length === 0 || !diagnoses) return null

  return (
    <div>
      <h3>entries</h3>
      {entries.map((entry) => {
        return (
          <EntryItem
            key={entry.id}
            entry={entry}
            diagnoses={diagnoses}
          />
        )
      })}
    </div>
  )
}

export default EntryList

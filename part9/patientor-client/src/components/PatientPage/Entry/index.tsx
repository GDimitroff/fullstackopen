import { IDiagnosis, IEntry } from '../../../types'
import EntryItem from './EntryItem'

interface Props {
  entries: Array<IEntry> | undefined
  diagnoses: Array<IDiagnosis>
}

const Entries = ({ entries, diagnoses }: Props) => {
  if (!entries || entries.length === 0 || !diagnoses) return null

  return (
    <div>
      <h3>entries</h3>
      <div
        style={{
          display: 'grid',
          gap: '10px',
        }}
      >
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
    </div>
  )
}

export default Entries

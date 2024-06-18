import { IEntry } from '../../types'
import EntryDetails from './EntryDetails'

interface Props {
  entry: IEntry
}

const EntryItem = ({ entry }: Props) => {
  return (
    <div>
      <p>
        {entry.date} {entry.description}
      </p>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      )}
      <EntryDetails entry={entry} />
    </div>
  )
}

export default EntryItem

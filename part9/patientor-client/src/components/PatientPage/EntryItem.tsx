import { Entry, EntryType } from '../../types'
import { assertNever } from '../../utils'

interface EntryProps {
  entry: Entry
}

const EntryItem = ({ entry }: EntryProps) => {
  switch (entry.type) {
    case EntryType.HealthCheck: {
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
        </div>
      )
    }
    case EntryType.Hospital: {
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
        </div>
      )
    }
    case EntryType.OccupationalHealthcare: {
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
        </div>
      )
    }
    default: {
      return assertNever(entry.type)
    }
  }
}

export default EntryItem

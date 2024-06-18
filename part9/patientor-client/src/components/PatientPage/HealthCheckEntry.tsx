import { Entry } from '../../types'

interface HealthCheckEntryProps {
  entry: Entry
}

const HealthCheckEntry = ({ entry }: HealthCheckEntryProps) => {
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

export default HealthCheckEntry

import { Entry } from '../../types'

interface OccupationalHealthcareEntryProps {
  entry: Entry
}

const OccupationalHealthcareEntry = ({
  entry,
}: OccupationalHealthcareEntryProps) => {
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

export default OccupationalHealthcareEntry

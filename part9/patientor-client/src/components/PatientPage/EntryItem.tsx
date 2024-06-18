import { IDiagnosis, IEntry } from '../../types'
import EntryDetails from './EntryDetails'
import EntryDiagnoses from './EntryDiagnoses'

interface Props {
  entry: IEntry
  diagnoses: Array<IDiagnosis>
}

const EntryItem = ({ entry, diagnoses }: Props) => {
  const style = {
    border: '1px solid',
    padding: '10px',
    margin: '10px 0',
  }

  const getEntryTypeIcon = () => {
    switch (entry.type) {
      case 'HealthCheck':
        return '❤️'
      case 'OccupationalHealthcare':
        return '🏥'
      case 'Hospital':
        return '🚑'
      default:
        return '🤷'
    }
  }

  return (
    <div style={style}>
      <p>
        {entry.date} {getEntryTypeIcon()}
      </p>
      <p>{entry.description}</p>
      {entry.diagnosisCodes && (
        <EntryDiagnoses
          diagnosisCodes={entry.diagnosisCodes}
          diagnoses={diagnoses}
        />
      )}
      <EntryDetails entry={entry} />
    </div>
  )
}

export default EntryItem

import { IOccupationalHealthcareEntry } from '../../../types'

interface Props {
  entry: IOccupationalHealthcareEntry
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
  return (
    <div>
      <p>employer name: {entry.employerName}</p>
      {entry.sickLeave && (
        <p>
          sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
        </p>
      )}
    </div>
  )
}

export default OccupationalHealthcareEntry

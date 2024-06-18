import { IOccupationalHealthcareEntry } from '../../types'

interface Props {
  entry: IOccupationalHealthcareEntry
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
  return <div>{entry.type}</div>
}

export default OccupationalHealthcareEntry

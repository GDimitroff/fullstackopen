import { IHospitalEntry } from '../../types'

interface Props {
  entry: IHospitalEntry
}

const HospitalEntry = ({ entry }: Props) => {
  return <div>{entry.type}</div>
}

export default HospitalEntry

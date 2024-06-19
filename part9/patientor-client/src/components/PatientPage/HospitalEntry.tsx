import { IHospitalEntry } from '../../types'

interface Props {
  entry: IHospitalEntry
}

const HospitalEntry = ({ entry }: Props) => {
  return (
    <div>
      <strong>discharge</strong>
      <ul>
        <li>date: {entry.discharge.date}</li>
        <li>criteria: {entry.discharge.criteria}</li>
      </ul>
    </div>
  )
}

export default HospitalEntry

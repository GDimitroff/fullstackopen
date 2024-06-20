import { IDiagnosis } from '../../../types'

interface Props {
  diagnosisCodes: Array<string>
  diagnoses: Array<IDiagnosis>
}

const EntryDiagnoses = ({ diagnosisCodes, diagnoses }: Props) => {
  const filteredDiagnoses = diagnoses.filter((d) => {
    return diagnosisCodes.includes(d.code)
  })

  if (filteredDiagnoses.length === 0) return null

  return (
    <ul>
      {filteredDiagnoses.map((d) => (
        <li key={d.code}>
          {d.code}: {d.name}
          {d.latin && <i> ({d.latin})</i>}
        </li>
      ))}
    </ul>
  )
}

export default EntryDiagnoses

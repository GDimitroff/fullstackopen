import { IDiagnosis, IEntryWithoutId, IType } from '../../types'
import { assertNever } from '../../utils'
import EntryFormHospital from './EntryFormHospital'

interface Props {
  type: IType
  patientId: string
  diagnoses: Array<IDiagnosis>
}

const TypeForm = ({ type, patientId, diagnoses }: Props) => {
  const handleSubmit = (values: IEntryWithoutId) => {
    console.log(values, patientId)
  }

  switch (type) {
    case IType.Hospital:
      return (
        <EntryFormHospital
          onSubmit={handleSubmit}
          diagnoses={diagnoses}
        />
      )
    case IType.HealthCheck:
      return <div>health check</div>
    case IType.OccupationalHealthcare:
      return <div>occupational healthcare</div>
    default:
      return assertNever(type)
  }
}

export default TypeForm

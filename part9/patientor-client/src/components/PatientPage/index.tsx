import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Male, Female, Transgender } from '@mui/icons-material'

import patientService from '../../services/patients'
import diagnoseService from '../../services/diagnoses'
import { IDiagnosis, IGender, IPatient } from '../../types'
import { assertNever } from '../../utils'
import EntryList from './EntryList'
import EntryFormDefiner from './EntryFormDefiner'

const PatientPage = () => {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<IPatient | null>(null)
  const [diagnoses, setDiagnoses] = useState<Array<IDiagnosis> | null>(null)

  const getIcon = (input: IGender) => {
    switch (input) {
      case IGender.Male: {
        return <Male />
      }
      case IGender.Female: {
        return <Female />
      }
      case IGender.Other: {
        return <Transgender />
      }
      default: {
        return assertNever(input)
      }
    }
  }

  useEffect(() => {
    if (!id) return

    const fetchPatient = async () => {
      const patient = await patientService.getById(id)
      setPatient(patient)
    }

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll()
      setDiagnoses(diagnoses)
    }

    void fetchPatient()
    void fetchDiagnoses()
  }, [id])

  if (!patient || !diagnoses) return null

  return (
    <div>
      <h2>
        {patient.name} {getIcon(patient.gender)}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <EntryFormDefiner
        patientId={patient.id}
        diagnoses={diagnoses}
      />
      <EntryList
        entries={patient.entries}
        diagnoses={diagnoses}
      />
    </div>
  )
}

export default PatientPage

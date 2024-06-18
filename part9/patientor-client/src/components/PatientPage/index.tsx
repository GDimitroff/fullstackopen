import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Male, Female, Transgender } from '@mui/icons-material'

import patientService from '../../services/patients'
import { IGender, IPatient } from '../../types'
import { assertNever } from '../../utils'
import EntryList from './EntryList'

const PatientPage = () => {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<IPatient | null>(null)

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
    void fetchPatient()
  }, [id])

  if (!patient) return null

  return (
    <div>
      <h2>
        {patient.name} {getIcon(patient.gender)}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <EntryList entries={patient.entries} />
    </div>
  )
}

export default PatientPage

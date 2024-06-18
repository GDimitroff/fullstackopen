import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Male, Female, Transgender } from '@mui/icons-material'

import patientService from '../../services/patients'
import { Gender, Patient } from '../../types'
import { assertNever } from '../../utils'

const PatientPage = () => {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | null>(null)

  const getIcon = (input: Gender) => {
    switch (input) {
      case Gender.Male: {
        return <Male />
      }
      case Gender.Female: {
        return <Female />
      }
      case Gender.Other: {
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
    </div>
  )
}

export default PatientPage

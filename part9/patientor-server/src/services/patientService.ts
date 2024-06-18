import { v4 as uuid } from 'uuid'

import patients from '../data/patients'
import { NewPatientEntry, NonSensitivePatientEntry, Patient } from '../types'

const getEntries = (): Array<Patient> => {
  return patients
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }
  })
}

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((patient) => patient.id === id)
  return entry
}

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry
  }

  patients.push(newPatientEntry)
  return newPatientEntry
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById
}

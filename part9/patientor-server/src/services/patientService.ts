import { v4 as uuid } from 'uuid'

import patients from '../data/patients'
import {
  Entry,
  NewPatient,
  NewEntry,
  NonSensitivePatient,
  Patient
} from '../types'

const getEntries = (): Array<Patient> => {
  return patients
}

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
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

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry
  }

  patients.push(newPatientEntry)
  return newPatientEntry
}

const addEntry = (patientId: string, entry: NewEntry): Entry | undefined => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  }

  const patient = patients.find((p) => p.id === patientId)
  if (patient) {
    patient.entries.push(newEntry)
  }

  return newEntry
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
}

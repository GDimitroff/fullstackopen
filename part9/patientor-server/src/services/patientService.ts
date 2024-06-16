import patientData from '../data/patients'
import { NonSensitivePatientEntry, PatientEntry } from '../types'

const patients: Array<PatientEntry> = patientData

const getEntries = (): Array<PatientEntry> => {
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

const addDiary = () => {
  return null
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary
}

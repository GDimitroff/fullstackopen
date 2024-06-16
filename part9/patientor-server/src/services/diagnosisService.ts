import diagnosesData from '../data/diagnoses'
import { DiagnosisEntry } from '../types'

const diagnoses: Array<DiagnosisEntry> = diagnosesData

const getEntries = (): Array<DiagnosisEntry> => {
  return diagnoses
}

const addDiary = () => {
  return null
}

export default {
  getEntries,
  addDiary
}

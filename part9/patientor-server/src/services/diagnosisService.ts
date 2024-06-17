import diagnoses from '../data/diagnoses'
import { DiagnosisEntry } from '../types'

const getEntries = (): Array<DiagnosisEntry> => {
  return diagnoses
}

const addDiagnosis = () => {
  return null
}

export default {
  getEntries,
  addDiagnosis
}

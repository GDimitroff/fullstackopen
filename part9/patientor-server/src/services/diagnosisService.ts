import diagnoses from '../data/diagnoses'
import { DiagnosisEntry } from '../types'

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

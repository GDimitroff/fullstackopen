import axios from 'axios'
import { IDiagnosis } from '../types'

import { apiBaseUrl } from '../constants'

const getAll = async () => {
  const { data } = await axios.get<IDiagnosis[]>(`${apiBaseUrl}/diagnoses`)

  return data
}

export default {
  getAll,
}

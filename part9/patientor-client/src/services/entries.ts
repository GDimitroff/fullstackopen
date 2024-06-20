import axios from 'axios'

import { apiBaseUrl } from '../constants'
import { IEntry, IEntryWithoutId } from '../types'

const create = async (patientId: string, entry: IEntryWithoutId) => {
  const { data } = await axios.post<IEntry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry
  )

  return data
}

export default {
  create,
}

import axios from 'axios'

import { apiBaseUrl } from '../constants'
import { DiaryEntry, NewDiaryEntry } from '../types'

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`)

  return data
}

const create = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(`${apiBaseUrl}/diaries`, object)

  return data
}

export default {
  getAll,
  create,
}

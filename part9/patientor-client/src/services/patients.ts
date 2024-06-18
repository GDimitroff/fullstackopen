import axios from 'axios'
import { IPatient, IPatientFormValues } from '../types'

import { apiBaseUrl } from '../constants'

const getAll = async () => {
  const { data } = await axios.get<IPatient[]>(`${apiBaseUrl}/patients`)

  return data
}

const getById = async (id: string) => {
  const { data } = await axios.get<IPatient>(`${apiBaseUrl}/patients/${id}`)

  return data
}

const create = async (object: IPatientFormValues) => {
  const { data } = await axios.post<IPatient>(`${apiBaseUrl}/patients`, object)

  return data
}

export default {
  getAll,
  getById,
  create,
}

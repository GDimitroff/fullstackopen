import { Gender, NewPatientEntry } from './types'

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String
}

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param))
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param)
}

const parseString = (string: unknown): string => {
  if (!isString(string)) {
    throw new Error('Incorrect or missing name: ' + string)
  }

  return string
}

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date)
  }

  return date
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing weather: ' + gender)
  }

  return gender
}

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation)
    }

    return newEntry
  }

  throw new Error('Incorrect data: some fields are missing')
}

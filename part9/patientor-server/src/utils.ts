import {
  Gender,
  NewPatient,
  NewEntry,
  Diagnosis,
  BaseEntry,
  HealthCheckRating
} from './types'

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

const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param)
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>
}

const parseRating = (rating: unknown): HealthCheckRating => {
  if (!isString(rating) || isNaN(Number(rating)) || !isRating(Number(rating))) {
    throw new Error(
      `Incorrect rating number: ${Object.values(HealthCheckRating).join(' | ')}`
    )
  }

  return parseInt(rating)
}

export const toNewPatient = (object: unknown): NewPatient => {
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
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: []
    }

    return newPatient
  }

  throw new Error('Incorrect data: some fields are missing')
}

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (
    !('description' in object) ||
    !('date' in object) ||
    !('specialist' in object) ||
    !('type' in object)
  ) {
    throw new Error('Incorrect or missing data')
  }

  const baseEntry: Omit<BaseEntry, 'id'> = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist)
  }

  if ('diagnosisCodes' in object) {
    baseEntry.diagnosisCodes = parseDiagnosisCodes(object)
  }

  if (!isString(object.type)) {
    throw new Error(`Missing or invalid entry type`)
  }

  switch (object.type) {
    case 'HealthCheck': {
      if (!('healthCheckRating' in object)) {
        throw new Error(`Missing or invalid health check rating`)
      }

      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseRating(object.healthCheckRating)
      }
    }
    case 'Hospital': {
      if (
        !('discharge' in object) ||
        !object.discharge ||
        typeof object.discharge !== 'object'
      ) {
        throw new Error(`Missing or invalid discharge data`)
      }

      if (!('date' in object.discharge) || !('criteria' in object.discharge)) {
        throw new Error(`Missing or invalid discharge data`)
      }

      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseString(object.discharge.criteria)
        }
      }
    }
    case 'OccupationalHealthcare': {
      if (!('employerName' in object)) {
        throw new Error(`Missing or invalid employer name`)
      }

      let sickLeave

      if (
        'sickLeave' in object &&
        object.sickLeave &&
        typeof object.sickLeave === 'object' &&
        'startDate' in object.sickLeave &&
        'endDate' in object.sickLeave
      ) {
        sickLeave = {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate)
        }
      }

      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(object.employerName),
        sickLeave
      }
    }
    default: {
      throw new Error(`Incorrect entry type`)
    }
  }
}

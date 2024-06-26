import {
  Gender,
  NewPatient,
  NewEntry,
  Diagnosis,
  BaseEntry,
  HealthCheckRating,
  Discharge,
  SickLeave,
  OccupationalHealthcareEntry,
  Type
} from './types'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String
}

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number' || param instanceof Number
}

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param))
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param)
}

const isType = (param: string): param is Type => {
  return Object.values(Type)
    .map((e) => e.toString())
    .includes(param)
}

const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param)
}

const parseString = (string: unknown, fieldName: string): string => {
  if (!string || !isString(string)) {
    throw new Error('Incorrect or missing name: ' + fieldName)
  }

  return string
}

const parseDate = (date: unknown, fieldName: string): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + fieldName)
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

const parseType = (type: unknown): Type => {
  if (!isString(type) || !isType(type)) {
    throw new Error('Incorrect or missing entry type')
  }

  return type
}

const parseRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || isNaN(Number(rating)) || !isRating(Number(rating))) {
    throw new Error(
      `Incorrect rating number: ${Object.values(HealthCheckRating)
        .filter((v) => !isNaN(Number(v)))
        .join(' | ')}`
    )
  }

  return rating
}

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing discharge data')
  }

  if (!('date' in object) || !('criteria' in object)) {
    throw new Error('Incorrect or missing discharge data')
  }

  return {
    date: parseDate(object.date, 'discharge date'),
    criteria: parseString(object.criteria, 'criteria')
  }
}

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing sick leave data')
  }

  if (!('startDate' in object) || !('endDate' in object)) {
    throw new Error('Incorrect or missing sick leave data')
  }

  return {
    startDate: parseDate(object.startDate, 'sick leave: start date'),
    endDate: parseDate(object.endDate, 'sick leave: end date')
  }
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
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth, 'date of birth'),
      ssn: parseString(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
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
    description: parseString(object.description, 'description'),
    date: parseDate(object.date, 'date'),
    specialist: parseString(object.specialist, 'specialist'),
    type: parseType(object.type)
  }

  if ('diagnosisCodes' in object) {
    baseEntry.diagnosisCodes = parseDiagnosisCodes(object)
  }

  switch (baseEntry.type) {
    case Type.HealthCheck: {
      if (!('healthCheckRating' in object)) {
        throw new Error(`Missing or invalid health check rating`)
      }

      return {
        ...baseEntry,
        healthCheckRating: parseRating(object.healthCheckRating)
      }
    }
    case Type.Hospital: {
      if (
        !('discharge' in object) ||
        !object.discharge ||
        typeof object.discharge !== 'object'
      ) {
        throw new Error(`Missing or invalid discharge data`)
      }

      return {
        ...baseEntry,
        discharge: parseDischarge(object.discharge)
      }
    }
    case Type.OccupationalHealthcare: {
      if (!('employerName' in object)) {
        throw new Error(`Missing or invalid employer name`)
      }

      const newOccupationalEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
        ...baseEntry,
        employerName: parseString(object.employerName, 'employer name')
      }

      if ('sickLeave' in object) {
        newOccupationalEntry.sickLeave = parseSickLeave(object)
      }

      return newOccupationalEntry
    }
    default: {
      return assertNever(baseEntry.type)
    }
  }
}

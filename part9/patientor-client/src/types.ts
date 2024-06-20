type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never

export enum IType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

interface IBaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<IDiagnosis['code']>
}

export enum IHealthCheckRating {
  'Healthy' = 'Healthy',
  'LowRisk' = 'LowRisk',
  'HighRisk' = 'HighRisk',
  'CriticalRisk' = 'CriticalRisk',
}

export interface IHealthCheckEntry extends IBaseEntry {
  type: 'HealthCheck'
  healthCheckRating: IHealthCheckRating
}

export interface IOccupationalHealthcareEntry extends IBaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

export interface IHospitalEntry extends IBaseEntry {
  type: 'Hospital'
  discharge: {
    date: string
    criteria: string
  }
}

export type IEntry =
  | IHospitalEntry
  | IOccupationalHealthcareEntry
  | IHealthCheckEntry

export type IEntryWithoutId = UnionOmit<IEntry, 'id'>

export interface IDiagnosis {
  code: string
  name: string
  latin?: string
}

export enum IGender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface IPatient {
  id: string
  name: string
  occupation: string
  gender: IGender
  dateOfBirth: string
  entries?: IEntry[]
  ssn?: string
}

export type IPatientFormValues = Omit<IPatient, 'id' | 'entries'>

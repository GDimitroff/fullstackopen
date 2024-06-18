import { IEntry } from '../../types'
import { assertNever } from '../../utils'
import HealthCheckEntry from './HealthCheckEntry'
import HospitalEntry from './HospitalEntry'
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry'

interface Props {
  entry: IEntry
}

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case 'HealthCheck': {
      return <HealthCheckEntry entry={entry} />
    }
    case 'Hospital': {
      return <HospitalEntry entry={entry} />
    }
    case 'OccupationalHealthcare': {
      return <OccupationalHealthcareEntry entry={entry} />
    }
    default: {
      return assertNever(entry)
    }
  }
}

export default EntryDetails

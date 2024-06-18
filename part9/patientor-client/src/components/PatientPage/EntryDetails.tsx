import { Entry, EntryType } from '../../types'
import { assertNever } from '../../utils'
import HealthCheckEntry from './HealthCheckEntry'
import HospitalEntry from './HospitalEntry'
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry'

interface EntryProps {
  entry: Entry
}

const EntryDetails = ({ entry }: EntryProps) => {
  switch (entry.type) {
    case EntryType.HealthCheck: {
      return <HealthCheckEntry entry={entry} />
    }
    case EntryType.Hospital: {
      return <HospitalEntry entry={entry} />
    }
    case EntryType.OccupationalHealthcare: {
      return <OccupationalHealthcareEntry entry={entry} />
    }
    default: {
      return assertNever(entry.type)
    }
  }
}

export default EntryDetails

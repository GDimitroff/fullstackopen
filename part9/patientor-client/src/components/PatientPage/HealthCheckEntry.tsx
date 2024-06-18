import { IHealthCheckEntry } from '../../types'

interface Props {
  entry: IHealthCheckEntry
}

const HealthCheckEntry = ({ entry }: Props) => {
  return <div>{entry.type}</div>
}

export default HealthCheckEntry

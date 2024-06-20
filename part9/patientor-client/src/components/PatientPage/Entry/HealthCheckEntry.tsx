import { IHealthCheckEntry } from '../../../types'

interface Props {
  entry: IHealthCheckEntry
}

const HealthCheckEntry = ({ entry }: Props) => {
  const getHealthCheckIcon = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return '💚'
      case 1:
        return '💛'
      case 2:
        return '🧡'
      case 3:
        return '❤️'
      default:
        return '🤷'
    }
  }

  return <div>{getHealthCheckIcon()}</div>
}

export default HealthCheckEntry

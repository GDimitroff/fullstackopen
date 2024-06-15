import { parseArguments } from './utils'

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface Rating {
  rating: number
  ratingDescription: string
}

const calculateRating = (average: number, target: number): Rating => {
  if (average >= target) {
    return { rating: 3, ratingDescription: 'great job! you rock!' }
  } else if (average < target && average >= target / 2) {
    return { rating: 2, ratingDescription: 'not too bad but could be better' }
  } else {
    return { rating: 1, ratingDescription: 'good start! keep going!' }
  }
}

const calculateExercises = (
  target: number,
  dailyExercises: Array<number>
): Result => {
  const periodLength = dailyExercises.length
  const average = dailyExercises.reduce((a, b) => a + b, 0) / periodLength
  const targetReached = average >= target

  const { rating, ratingDescription } = calculateRating(average, target)

  return {
    periodLength,
    trainingDays: dailyExercises.filter((d) => d > 0).length,
    success: targetReached,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  if (process.argv.length < 4) throw new Error('Not enough arguments')

  const [target, ...dailyExercises] = parseArguments(process.argv.slice(2))

  console.log(calculateExercises(target, dailyExercises))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }

  console.log(errorMessage)
}

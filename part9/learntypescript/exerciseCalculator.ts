interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateRating = (
  average: number,
  target: number
): { rating: number; ratingDescription: string } => {
  if (average >= target) {
    return { rating: 3, ratingDescription: 'great job! you rock!' }
  } else if (average < target && average >= target / 2) {
    return { rating: 2, ratingDescription: 'not too bad but could be better' }
  } else {
    return { rating: 1, ratingDescription: 'good start! keep going!' }
  }
}

const calculateExercises = (
  dailyExercises: Array<number>,
  target: number
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

console.log(calculateExercises([2.5, 2, 2, 4.5, 0, 1, 1], 2))

import { parseArguments } from './utils'

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2)

  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi < 25) {
    return 'Normal (healthy weight)'
  } else if (bmi < 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

try {
  if (process.argv.length < 4) throw new Error('Not enough arguments')
  if (process.argv.length > 4) throw new Error('Too many arguments')

  const [height, weight] = parseArguments(process.argv.slice(2))

  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }

  console.log(errorMessage)
}

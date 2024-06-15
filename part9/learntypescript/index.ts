import express from 'express'

import { calculateBmi } from './bmiCalculator'
import { calculateExercise } from './exerciseCalculator'

const app = express()

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' })
  }

  const bmi = calculateBmi(height, weight)

  res.json({
    weight,
    height,
    bmi,
  })
})

interface ExercisesBody {
  daily_exercises: number[]
  target: number
}

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExercisesBody

  if (!target || !daily_exercises) {
    res.status(400).json({ error: 'parameters missing' })
  }

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((d) => !isNaN(Number(d))) ||
    isNaN(Number(target))
  ) {
    res.status(400).json({ error: 'malformatted parameters' })
  }

  res.json(
    calculateExercise(
      daily_exercises.map((d) => Number(d)),
      Number(target)
    )
  )

  console.log(target)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`🟢 Server running on port ${PORT}...`)
})

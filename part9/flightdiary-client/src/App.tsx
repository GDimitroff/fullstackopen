import { useEffect, useState } from 'react'
import axios from 'axios'

import diaryService from './services/diaryService'
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from './types'

interface VisibilityOption {
  value: Visibility
  label: string
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(
  (v) => ({
    value: v,
    label: v.toString(),
  })
)

interface WeatherOption {
  value: Weather
  label: string
}

const weatherOptions: WeatherOption[] = Object.values(Weather).map((v) => ({
  value: v,
  label: v.toString(),
}))

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [date, setDate] = useState('')
  const [comment, setComment] = useState('')
  const [visibility, setVisibility] = useState(Visibility.Ok)
  const [weather, setWeather] = useState(Weather.Sunny)

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll()
      setDiaries(diaries)
    }

    void fetchDiaries()
  }, [])

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof e.target.value === 'string') {
      const value = e.target.value
      const visibility = Object.values(Visibility).find(
        (g) => g.toString() === value
      )

      if (visibility) {
        setVisibility(visibility)
      }
    }
  }

  const handleWeatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof e.target.value === 'string') {
      const value = e.target.value
      const weather = Object.values(Weather).find((g) => g.toString() === value)

      if (weather) {
        setWeather(weather)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const newDiaryEntry: NewDiaryEntry = {
        date,
        comment,
        visibility,
        weather,
      }

      const diary = await diaryService.create(newDiaryEntry)
      setDiaries((prev) => (prev ? prev.concat(diary) : [diary]))
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err?.response?.data && typeof err?.response?.data === 'string') {
          const message = err.response.data.replace(
            'Something went wrong. Error: ',
            ''
          )

          console.error(message)
          setError(message)
        } else {
          setError('Unrecognized axios error')
        }
      } else {
        console.error('Unknown error', err)
        setError('Unknown error')
      }
    }
  }

  if (!diaries) return null

  return (
    <div>
      {error && <div>{error}</div>}
      <h2>add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          date:
          <input
            type='date'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility:{'  '}
          {visibilityOptions.map((v) => (
            <label key={v.label}>
              {v.label}
              <input
                type='radio'
                id={v.label}
                name='visibility'
                value={v.value}
                checked={v.value === visibility}
                onChange={handleVisibilityChange}
              />
            </label>
          ))}
        </div>
        <div>
          weather:{'  '}
          {weatherOptions.map((w) => (
            <label key={w.label}>
              {w.label}
              <input
                type='radio'
                id={w.label}
                name='weather'
                value={w.value}
                checked={w.value === weather}
                onChange={handleWeatherChange}
              />
            </label>
          ))}
        </div>
        <div>
          comment:
          <input
            type='text'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>

        <br />
        <button type='submit'>add entry</button>
      </form>
      <h2>diary entries</h2>
      {diaries.map((diary) => {
        return (
          <div key={diary.id}>
            <h2>
              <strong>{diary.date}</strong>
            </h2>
            <p>{diary.comment}</p>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App

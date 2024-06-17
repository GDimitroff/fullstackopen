import { useEffect, useState } from 'react'

import diaryService from './services/diaryService'
import { DiaryEntry } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[] | null>(null)

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll()
      setDiaries(diaries)
    }

    void fetchDiaries()
  }, [])

  if (!diaries) return null

  return (
    <div>
      <h1>Diary entries</h1>
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

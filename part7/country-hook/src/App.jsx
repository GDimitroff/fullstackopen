import React, { useState } from 'react'

import { useCountry, useField } from './hooks'
import Country from './components/Country'

const App = () => {
  const name = useField('text')
  const [submittedName, setSubmittedName] = useState(null)
  const country = useCountry(submittedName)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedName(name.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input {...name} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App

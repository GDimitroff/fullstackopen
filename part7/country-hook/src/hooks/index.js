import { useEffect } from 'react'
import { useState } from 'react'

import countryService from '../services/country'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return

    const fetchCountry = async (name) => {
      try {
        const country = await countryService.getCountry(name)
        setCountry({ data: country, found: true })
      } catch (e) {
        setCountry({ found: false })
      }
    }

    fetchCountry(name)
  }, [name])

  return country
}

export { useField, useCountry }

import axios from 'axios'
import { useEffect, useState } from 'react'

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

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getResources = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }

    getResources()
  }, [baseUrl])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources([...resources, response.data])
  }

  const service = {
    create,
  }

  return [resources, service]
}

export { useField, useResource }

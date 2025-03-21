import { useContext } from 'react'
import AuthStorageContext from '../contexts/authContext'

const useAuthStorage = () => {
  return useContext(AuthStorageContext)
}

export default useAuthStorage

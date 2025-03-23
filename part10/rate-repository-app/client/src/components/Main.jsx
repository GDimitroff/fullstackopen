import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import SingleRepository from './SingleRepository'
import ReviewForm from './ReviewForm'
import SignUp from './SignUp'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/:id' element={<SingleRepository />} />
        <Route path='/auth' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/create-review' element={<ReviewForm />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  )
}

export default Main

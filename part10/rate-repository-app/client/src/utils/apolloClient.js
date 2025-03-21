import { ApolloClient, InMemoryCache } from '@apollo/client'
import Constants from 'expo-constants'

const createApolloClient = () => {
  const apolloUri = Constants.expoConfig.extra.apolloUri

  return new ApolloClient({
    uri: apolloUri,
    cache: new InMemoryCache(),
  })
}

export default createApolloClient

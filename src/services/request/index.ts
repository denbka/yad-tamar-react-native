import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const request = axios.create({
  baseURL: 'https://enolaapp.com/api',
})

request.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token')
  console.log(config.url, token, 'request.interceptors.request')
  if (token) {
    config.headers.common['Authorization'] = token
  }
  return config
})

request.interceptors.response.use(
  (res) => {
    console.log('response use = ', res.data, res.config.url)
    return res
  },
  (error) => {
    console.log(error.response.data, '3213')
    throw error
  },
)

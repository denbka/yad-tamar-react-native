import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const request = axios.create({
  baseURL: 'https://tamar.project-babaev.ru/api',
})

request.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token')
  console.log(token, 'token')
  if (token) {
    config.headers.common['Authorization'] = token
    console.log(token)
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

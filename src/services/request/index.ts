import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://18.197.147.245/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use((config) => config)

request.interceptors.response.use((config) => config)

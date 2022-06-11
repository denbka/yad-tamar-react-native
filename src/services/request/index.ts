import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://tamar.project-babaev.ru/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use((config) => config)

request.interceptors.response.use((config) => config)

import { request } from '@services/request'

const queryKey = '/auth'

const login = async (form: ICredentials) => {
  const response = await request.post(`${queryKey}/login`, form)
  return response.data
}

const register = async (form: ICredentials) => {
  const response = await request.post(`${queryKey}/register`, form)
  return response.data
}

const getUserData = async () => {
  const response = await request.get(`${queryKey}/get-user-data`)
  console.log(response.data)
  return response.data ?? null
}

export const authApi = {
  login,
  register,
  getUserData,
}

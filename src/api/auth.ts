import { request } from '@services/request'

const queryKey = '/v1/entrance'

const login = async (form: ILoginForm) => {
  const response = await request.post(`${queryKey}/login`, form)
  return response.data
}

export const authApi = {
  login,
}

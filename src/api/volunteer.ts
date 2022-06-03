import { request } from '@services/request'

const queryKey = 'volunteer'

const get = async () => {
  const response = await request.get<IVolunteer[]>(queryKey)
  return response.data
}

const post = async (form: TodoForm) => {
  const response = await request.post<IVolunteer[]>(queryKey, form)
  return response.data
}

const remove = async (id: number) => {
  const response = await request.delete<IVolunteer>(`${queryKey}/${id}`)
  return response.data
}

export const taskApi = {
  get,
  post,
  remove,
  queryKey,
}

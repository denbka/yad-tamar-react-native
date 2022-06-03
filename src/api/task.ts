import { request } from '@services/request'

const queryKey = 'tasks'

const get = async () => {
  const response = await request.get<ITodo[]>(queryKey)
  return response.data
}

const post = async (form: TodoForm) => {
  const response = await request.post<ITodo[]>(queryKey, form)
  return response.data
}

const remove = async (id: number) => {
  const response = await request.delete<ITodo>(`${queryKey}/${id}`)
  return response.data
}

export const taskApi = {
  get,
  post,
  remove,
  queryKey,
}

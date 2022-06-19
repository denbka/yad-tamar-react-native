import { request } from '@services/request'

const queryKey = 'tasks'

const get = async (family_id: string) => {
  console.log('family_id', family_id)
  const response = await request.get<ITodo[]>(`${queryKey}/tasks-for-family/${family_id}`)
  return response.data
}

const getProgress = async (family_id: string) => {
  const response = await request.get<ITodo[]>(`${queryKey}/task-percent/${family_id}`)
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
  getProgress,
  post,
  remove,
  queryKey,
}

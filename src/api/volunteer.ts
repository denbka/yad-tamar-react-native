import { request } from '@services/request'

const queryKey = 'volunteers'

const get = async (family_id: string) => {
  const response = await request.get<IVolunteer[]>(`${queryKey}/volunteers-for-family/${family_id}`)
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

export const volunteerApi = {
  get,
  post,
  remove,
  queryKey,
}

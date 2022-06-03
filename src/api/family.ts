import { request } from '@services/request'

const queryKey = 'families'

const get = async () => {
  const response = await request.get<IFamily[]>(queryKey)
  return response.data
}

const post = async (form: Pick<IFamily, 'name_of_family'>) => {
  const data = new FormData()
  data.append('data', form)
  data.append('image', null)

  const response = await request.post<IFamily[]>(queryKey, data)
  return response.data
}

const remove = async (id: number) => {
  const response = await request.delete<IFamily>(`${queryKey}/${id}`)
  return response.data
}

export const familyApi = {
  get,
  post,
  remove,
  queryKey,
}

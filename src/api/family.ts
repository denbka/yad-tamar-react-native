import { request } from '@services/request'

const queryKey = 'families'

const get = async (role) => {
  if (role === 'coordunator' || role === 'coordinator') {
    const response = await request.get<IFamily[]>(`/${queryKey}/coordinator`)
    return response.data
  }
  const response = await request.get<IFamily[]>(queryKey)
  return response.data
}

const getById = async (family_id: string) => {
  const response = await request.get<IFamily>(`${queryKey}/${family_id}`)
  return {
    token: response?.data?.token,
  }
}

const post = async (form: IFamilyForm) => request.post<IFamily[]>(queryKey, form)

const remove = async (id: number) => request.delete<IFamily>(`${queryKey}/${id}`)

export const familyApi = {
  get,
  getById,
  post,
  remove,
  queryKey,
}

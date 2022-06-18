import { request } from '@services/request'

const queryKey = 'families'

const get = async () => {
  const response = await request.get<IFamily[]>(queryKey)
  return response.data
}

const post = async (form: IFamilyForm) => request.post<IFamily[]>(queryKey, form)

const remove = async (id: number) => request.delete<IFamily>(`${queryKey}/${id}`)

export const familyApi = {
  get,
  post,
  remove,
  queryKey,
}

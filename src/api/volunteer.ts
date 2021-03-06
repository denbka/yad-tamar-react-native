import { request } from '@services/request'

const queryKey = 'volunteers'

const get = async (family_id: string) => {
  const response = await request.get<IVolunteer[]>(`${queryKey}/volunteers-for-family/${family_id}`)
  return response.data
}

const getById = async (user_id?: number): Promise<IUser> => {
  const response = await request.get<IUser>(`${queryKey}/volunteers/${user_id}`)
  return response.data
}

const post = async (form: IVolunteerForm) => {
  const response = await request.post<IVolunteer[]>(queryKey, form)
  return response.data
}

const remove = async (id: number) => {
  const response = await request.delete<IVolunteer>(`${queryKey}/${id}`)
  return response.data
}

const sendSMS = async (form: ISMSForm) => {
  // return Promise.resolve('aaaa')
  const response = await request.post<IVolunteer>(`${queryKey}/send-sms`, form)
  return response.data
}

export const volunteerApi = {
  get,
  getById,
  post,
  remove,
  queryKey,
  sendSMS,
}

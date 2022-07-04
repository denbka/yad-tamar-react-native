declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare type IFamily = {
  family_id: number
  last_name: string
  volunteersCount: number
}

declare type IFamilyForm = {
  last_name: string
  cell_phone: string
}

declare type IUserShort = {
  user_id: number
  family_id: number
  role: string
}

declare type ISMSForm = {
  to: string
  message: string
}

declare type IUser = {
  createdAt?: string
  updatedAt?: string
  user_id: number
  first_name?: string
  home_phone?: string
  cell_phone?: string
  adress?: string
  mail?: string
  age: number
  gender?: string
  family_status?: string
  kids_num?: string
  language?: string
  last_name?: string
  city?: string
  uniq_code?: number
  password?: string
}

declare type ITask = {
  task_id: number
  family_id: number
  helper_id?: null | number
  task_name: string
  date: string
  comments?: null | string
  createdAt?: null | string
  updatedAt?: null | string
}

declare type ITodo = {
  family_id: number
  task_name: string
  comments: string
  date: number | Date
  family_id: string
  time_type: string | null
  community_id?: number
  was_completed: boolean
}

declare type IVolunteer = {
  family_id: string
  name: string
  phone: string | null
}

type ICredentials = {
  cell_phone: string
  last_name: string
}

declare type IRegisterForm = ICredentials & {
  role: string
  family_id: string
}

declare type SwitchValue = 'week' | 'todo'

declare type InitialErrors = { [key: string]: ?string }

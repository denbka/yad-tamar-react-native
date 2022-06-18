declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare type IFamily = {
  family_id: number
  name_of_family: string
  volunteersCount: number
}

declare type IFamilyForm = {
  first_name: string
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
  date: Date
}

declare type TodoForm = Omit<ITodo, 'family_id'>

declare type IVolunteer = {
  family_id: string
  name: string
  phone: string | null
}

type ICredentials = {
  email: string
  password: string
}

declare type IRegisterForm = ICredentials & {
  password_confirmation: string
  role: string
  family_id: string
}

declare type SwitchValue = 'week' | 'todo'

declare type InitialErrors = { [key: string]: ?string }

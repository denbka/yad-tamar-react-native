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
  title: string
  phone: string
}

declare type ILoginForm = {
  emailAddress: string
  password: string
}

declare type SwitchValue = 'week' | 'todo'

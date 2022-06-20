import * as Yup from 'yup'

const cell_phone = Yup.string().required()
const last_name = Yup.string().required()

export const registerSchema = () => Yup.object({ cell_phone, last_name })
export const loginSchema = () => Yup.object({ cell_phone, last_name })

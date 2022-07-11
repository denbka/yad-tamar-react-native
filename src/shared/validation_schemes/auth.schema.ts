import * as Yup from 'yup'

const cell_phone = Yup.string().required()
const last_name = Yup.string().required()
const password = Yup.string().min(5).required()
const password_confirmation = Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')

export const registerSchema = () => Yup.object({ cell_phone, last_name, password, password_confirmation })
export const loginSchema = () => Yup.object({ cell_phone, password })

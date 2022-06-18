import * as Yup from 'yup'

const email = Yup.string().email().required()
const password = Yup.string().min(5).required()
const password_confirmation = Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')

export const registerSchema = () => Yup.object({ email, password, password_confirmation })
export const loginSchema = () => Yup.object().shape({ email, password })

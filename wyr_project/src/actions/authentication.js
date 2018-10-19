import { LOGIN, LOGOUT } from './actionTypes'

export const LoginUser = (id) => ({
        type: LOGIN,
        id,
})

export const LogOutUser = () => ({
        type: LOGOUT,
})


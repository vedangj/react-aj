import { SHOW_LOADING , HIDE_LOADING } from './actionTypes'

export const showloading = () => {
    return {
        type: SHOW_LOADING,
        loading: true
    }
}

export const hideloading = () => {
    return {
        type: HIDE_LOADING,
        loading: false
    }
}
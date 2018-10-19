import { SHOW_LOADING , HIDE_LOADING } from '../actions/actionTypes'

const loadingReducer = (state=true, action) =>
{
    switch (action.type)
    {
        case SHOW_LOADING, HIDE_LOADING:
        return {
            ...state,
            loading: action.loading
        }
        default:
        return state
    }

}

export default loadingReducer
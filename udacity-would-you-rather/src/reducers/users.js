import {actionTypes as types} from '../constants'

const users = (state = {}, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return { ...state, all: action.users }
    case types.SELECTED_USER:
      return { ...state, selectedUser: action.user }
    default:
      return state
  }
}

export default users
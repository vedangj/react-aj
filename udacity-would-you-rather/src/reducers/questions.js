import {actionTypes as types} from '../constants'

const questions = (state = {}, action) => {
  switch (action.type) {
    case types.GET_QUESTIONS:
      const questions = action.questions;
      return { ...state, all: questions }
    case types.REGISTER_VOTE:
      const votedQuestion = action.votedQuestion;
      return { ...state, votedQuestion }
    case types.LOGOUT:
        return { ...state, all: '' }
    default:
      return state
  }
}

export default questions
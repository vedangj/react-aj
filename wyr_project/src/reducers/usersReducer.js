import {
  GET_USERS,
  ADD_USER_QUESTION,
  SAVE_QUESTION_ANSWER
} from "../actions/actionTypes";

const usersReducer = (state = null, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_USER_QUESTION:
      return {
        ...state,
        [action.loginUser]: {
          ...state[action.loginUser],
          questions: state[action.loginUser].questions.concat([
            action.questionId
          ])
        }
      };
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        [action.loginUser]: {
          ...state[action.loginUser],
          answers: {
            ...state[action.loginUser].answers,
            [action.questionId]: action.answer
          }
        }
      };
    default:
      return state;
  }
};

export default usersReducer;

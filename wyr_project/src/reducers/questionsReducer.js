import {
  GET_QUESTIONS,
  ADD_QUESTIONS,
  ADD_QUESTION_ANSWER
} from "../actions/actionTypes";

const questionsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_QUESTIONS:
      return {
        ...state,
        [action.question.id]: action.question
      };
    case ADD_QUESTION_ANSWER:
      const { loginUser, questionId, answer } = action;
      return {
        ...state,
        [questionId]: {
          ...state[questionId],
          [answer]: {
            ...state[questionId][answer],
            votes: state[questionId][answer].votes.concat([loginUser])
          }
        }
      };
    default:
      return state;
  }
};

export default questionsReducer;

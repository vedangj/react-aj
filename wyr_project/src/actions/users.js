import {
  GET_USERS,
  ADD_USER_QUESTION,
  SAVE_QUESTION_ANSWER
} from "./actionTypes";

export const getUsers = users => {
  return {
    type: GET_USERS,
    users
  };
};

export const addUserQuestion = (loginUser, questionId) => {
  return {
    type: ADD_USER_QUESTION,
    loginUser,
    questionId
  };
};

export const addUserAnswer = (loginUser, questionId, answer) => {
  return {
    type: SAVE_QUESTION_ANSWER,
    loginUser,
    questionId,
    answer
  };
};

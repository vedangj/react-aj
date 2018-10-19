import {
  GET_QUESTIONS,
  ADD_QUESTIONS,
  ADD_QUESTION_ANSWER
} from "./actionTypes";

export const getQuestions = questions => {
  return {
    type: GET_QUESTIONS,
    questions
  };
};

export const addquestion = question => {
  return {
    type: ADD_QUESTIONS,
    question
  };
};

export const addquestionanswer = (loginUser, questionId, answer) => {
  return {
    type: ADD_QUESTION_ANSWER,
    loginUser,
    questionId,
    answer
  };
};

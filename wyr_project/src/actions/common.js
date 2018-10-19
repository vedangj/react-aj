import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion
} from "./../_DATA";
import { getUsers, addUserQuestion, addUserAnswer } from "./users";
import { getQuestions, addquestion, addquestionanswer } from "./questions";
import { showloading, hideloading } from "./loading";

export const initialData = () => {
  return dispatch => {
    dispatch(showloading());
    return Promise.all([_getUsers(), _getQuestions()])
      .then(([users, questions]) => {
        dispatch(getUsers(users));
        dispatch(getQuestions(questions));
        dispatch(hideloading());
      })
      .catch(error => {
        console.log(error.message);
      });
  };
};

export const handleSaveQuestionAnswer = (questionId, answer) => {
  return (dispatch, getState) => {
    const { loginUser } = getState();
    dispatch(showloading());
    return _saveQuestionAnswer({
      authedUser: loginUser,
      qid: questionId,
      answer: answer
    })
      .then(() => {
        dispatch(addquestionanswer(loginUser, questionId, answer));
        dispatch(addUserAnswer(loginUser, questionId, answer));
      })
      .then(() => dispatch(hideloading()));
  };
};

export const handleQuestion = (optionOneText, optionTwoText) => {
  return (dispatch, getState) => {
    const { loginUser } = getState();

    dispatch(showloading());

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: loginUser
    })
      .then(formatedQuestion => {
        dispatch(addquestion(formatedQuestion));
        dispatch(addUserQuestion(loginUser, formatedQuestion.id));
      })
      .then(() => dispatch(showloading()));
  };
};

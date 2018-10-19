import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA';

export const getAllUsers = () => _getUsers()

export const getAllQuestions = () => _getQuestions()

export const getInitialData = () => {
  return Promise.all([
    getAllUsers(),
    getAllQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }));
}

export const saveQuestion = question => _saveQuestion(question)

export const saveQuestionAnswer = ({ authedUser, qid, answer }) => _saveQuestionAnswer({ authedUser, qid, answer })
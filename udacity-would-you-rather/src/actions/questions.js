import {actionTypes as types} from '../constants'
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { getAllQuestions, saveQuestionAnswer } from '../utils/api';
import { getUsers } from './users';

export const getQuestions = () => dispatch => {
    console.log('res');
  dispatch(showLoading());
  getAllQuestions().then( (res, err) => {
    dispatch({type: types.GET_QUESTIONS, questions: res });
    dispatch(hideLoading());
  });
}



export const registerVote = ({ authedUser, qid, answer }) => dispatch => {
  dispatch(showLoading());
  const data = {
    authedUser,
    qid,
    answer
  };
  dispatch({type: types.REGISTER_VOTE_REQUEST, votedQuestion: data });
  saveQuestionAnswer(data)
    .then(() => {
      dispatch(getUsers());
      dispatch(getQuestions());
      dispatch(hideLoading());
    })
}

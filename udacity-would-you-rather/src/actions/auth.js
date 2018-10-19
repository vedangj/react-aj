import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { actionTypes as types } from '../constants'
import { setUser } from './users';
import { getQuestions } from './questions'

export const login = ({ selectedUser, username, password }) => dispatch => {
  dispatch(showLoading());
  if (selectedUser === username) {
    dispatch({ type: types.LOGIN, id: username, password: password });
    dispatch(getQuestions());
  } else {
    dispatch({ type: types.LOGIN_FAILURE });
  }
  dispatch(hideLoading());
}

export const loginWithToken = () => (dispatch, getState) => {
  dispatch(hideLoading());
  const username = getState().auth.id
  if (!username) return
  dispatch(getQuestions());
  dispatch({ type: types.LOGIN, id: username });
}

export const logout = () => dispatch => {
  dispatch(hideLoading());
  dispatch({ type: types.LOGOUT });
  dispatch(setUser(null));
}
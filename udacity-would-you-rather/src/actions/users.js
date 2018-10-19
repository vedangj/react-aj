import {actionTypes as types} from '../constants'
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { getAllUsers } from '../utils/api';

export const getUsers = () => dispatch => {
  dispatch(showLoading());
  getAllUsers().then( (res, err) => {
    // console.log(res);
    dispatch({type: types.GET_USERS, users: res });
    dispatch(hideLoading());
  });
}

export const setUser = user => dispatch => {
  dispatch({ type: types.SELECTED_USER, user: user });
  dispatch(hideLoading());
}
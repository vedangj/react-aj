import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar';

import users from './users'
import auth from './auth'
import questions from './questions'

const rootReducer = combineReducers({
  users,
  auth,
  questions,
  loadingBar: loadingBarReducer,
})

export default rootReducer

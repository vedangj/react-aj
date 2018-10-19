import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import throttle from 'lodash/throttle'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import { loginWithToken } from './actions/auth'
import { saveState, loadState } from './utils/localstorage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleWare = []
middleWare.push(thunk)

const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
  });
  middleWare.push(loggerMiddleware)

export const store = createStore(
  rootReducer,
  loadState(),
  composeEnhancers(applyMiddleware(...middleWare)),
)

store.subscribe(throttle(() => saveState(store.getState()), 1000))
store.dispatch(loginWithToken())

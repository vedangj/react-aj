import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import usersReducer from "./usersReducer";
import questionsReducer from "./questionsReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({
  loginUser: loginReducer,
  users: usersReducer,
  questions: questionsReducer,
  loading: loadingReducer
});

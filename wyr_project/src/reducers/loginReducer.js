import { LOGIN, LOGOUT } from "../actions/actionTypes";

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.id;
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

export default loginReducer;

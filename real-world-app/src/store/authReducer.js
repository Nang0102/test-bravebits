import { LOGIN, LOGOUT, LOGIN_SUCCESS, UPDATE_USER } from "./actions";
export const initState = {
  isAuthenticated: false,
  user: null,
};

function authReducer(state, action) {
  console.log("action", action);
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

export default authReducer;

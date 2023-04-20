export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER = "UPDATE_USER";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const loginAction = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};

export const loginSuccessfull = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const updateUser = (payload) => {
  console.log("payload---update", payload);
  return {
    type: UPDATE_USER,
    payload,
  };
};

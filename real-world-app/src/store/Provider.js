import { useReducer, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import reducer, { initState } from "./authReducer";

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleLogin = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const updateUser = (payload) => {
    return {
      type: "UPDATE_USER",
      payload,
    };
  };

  const loginSuccessfull = (payload) => {
    return {
      type: "LOGIN_SUCCESS",
      payload,
    };
  };

  const handleUpdateUser = (userUpdated) => {
    localStorage.setItem("user", JSON.stringify(userUpdated));
    dispatch(updateUser(userUpdated));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    if (user) {
      dispatch(loginSuccessfull(user));
    }
  }, [state.isAuthenticated]);
  return (
    <AuthContext.Provider
      value={{ state, handleLogin, handleLogout, handleUpdateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default Provider;

export const useAuthContext = () => {
  // const [state, dispatch] = useContext(AuthContext);
  // return [state, dispatch];
  return useContext(AuthContext);
};

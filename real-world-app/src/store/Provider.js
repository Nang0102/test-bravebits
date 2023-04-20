import { useReducer, useContext, useEffect } from "react";
import {
  loginAction,
  logoutAction,
  loginSuccessfull,
  updateUser,
} from "./actions";
import AuthContext from "./AuthContext";
import reducer, { initState } from "./authReducer";

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleLogin = (user) => {
    dispatch(loginAction(user));
  };
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const handleUpdateUser = (userUpdated) => {
    console.log("userUpdate", userUpdated);
    localStorage.setItem("user", JSON.stringify(userUpdated));
    dispatch(updateUser(userUpdated));
  };

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        dispatch(loginSuccessfull(user));
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
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
export default AuthProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};

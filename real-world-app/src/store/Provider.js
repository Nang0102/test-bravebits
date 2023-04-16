import { useReducer, useContext } from "react";
import AuthContext from "./AuthContext";
import reducer, { initState } from "./authReducer";
import { updateUser } from "actions/HttpsRequest";

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleLogin = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };
  const handleLogout = (user) => {
    dispatch({ type: "LOGOUT" });
  };

  const handleUpdateUser = (userUpdated) => {
    localStorage.setItem("user", JSON.stringify(userUpdated));
    dispatch(updateUser(userUpdated));
  };
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

import { useReducer, useContext } from "react";
import AuthContext from "./AuthContext";
import reducer, { initState } from "./authReducer";

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleLogin = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };
  const handleLogout = (user) => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider value={{ state, handleLogin, handleLogout }}>
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

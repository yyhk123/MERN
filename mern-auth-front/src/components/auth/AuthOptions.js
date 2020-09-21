import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import userContext from "../../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(userContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  // if logged in, display Log Out
  // else, display Register, Login
  return (
    <div className="auth-options">
      {userData.user ? (
        <button
          onClick={logout}
          className="btn btn-outline-danger my-2 my-sm-0"
        >
          Log out
        </button>
      ) : (
        <>
          <button
            onClick={register}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Register
          </button>
          <button
            onClick={login}
            className="btn btn-outline-primary my-2 my-sm-0 login-button"
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}

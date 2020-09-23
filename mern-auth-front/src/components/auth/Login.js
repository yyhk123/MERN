import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { email, password };
      const loginRes = await axios.post(
        "${window.location.mern-auth-login-one}:5000/users/login",
        //after register, automatically login with email and password just created
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token); // save token, keep user logged in

      history.push("/"); // after login, direct to home
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="form-group">
      <h2 className="col-md-12 text-center">Login</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form onSubmit={onSubmit}>
        <div className="form-group row">
          <label htmlFor="login-email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              id="login-email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="login-password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              id="login-password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="col-md-12 text-center">
          <input type="submit" value="Login" className="btn btn-primary " />
        </div>
      </form>
    </div>
  );
}

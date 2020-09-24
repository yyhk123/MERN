import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [organization, setOrganization] = useState();
  const [error, setError] = useState("");

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email,
        password,
        passwordCheck,
        displayName,
        organization,
      };
      await axios.post(
        "https://mern-auth-login-one.herokuapp.com/users/register",
        newUser
      );

      const loginRes = await axios.post(
        "https://mern-auth-login-one.herokuapp.com/users/login",
        {
          //after register, automatically login with email and password just created
          email,
          password,
        }
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token); // save token, keep user logged in

      history.push("/"); // after login, direct to home
    } catch (err) {
      // if 'err.response.data.msg' exists, then do setError(err.response.data.msg)
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="form-group">
      <h2 className="col-md-12 text-center">Register</h2>
      {error && (
        // if click clearError(it is set to X button in ErrorNotice.js), then remove error
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form onSubmit={onSubmit}>
        <div className="form-group row">
          <label htmlFor="register-email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              id="register-email"
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label
            htmlFor="register-password"
            className="col-sm-2 col-form-label"
          >
            Password
          </label>
          <div className="col-sm-10">
            <input
              id="register-password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label
            htmlFor="register-verify-password"
            className="col-sm-2 col-form-label"
          >
            Verify Password
          </label>
          <div className="col-sm-10">
            <input
              id="register-verify-password"
              type="password"
              className="form-control"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label
            htmlFor="register-organization"
            className="col-sm-2 col-form-label"
          >
            Organization
          </label>
          <div className="col-sm-10">
            <input
              placeholder="Where you are from (ie. Facebook, Apple, etc )"
              id="register-organization"
              type="text"
              className="form-control"
              onChange={(e) => setOrganization(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label
            htmlFor="register-displayName"
            className="col-sm-2 col-form-label"
          >
            Username
          </label>
          <div className="col-sm-10">
            <input
              id="register-displayName"
              type="text"
              className="form-control"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-12 text-center">
          <input type="submit" value="Register" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

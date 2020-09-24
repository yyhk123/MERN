import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function Home() {
  // error
  const [error, setError] = useState("");

  // direct to login page when user logs out
  const { userData } = useContext(UserContext);

  const [displayName, setDisplayName] = useState();
  const [password, setPassword] = useState();

  const onSubmitUsername = async (e) => {
    e.preventDefault();

    try {
      const newDisplayName = displayName;

      console.log(userData.user.id);
      console.log(newDisplayName);

      await axios.post("/usernameUpdate/" + userData.user.id, {
        displayName: newDisplayName,
      });
      window.location.reload();
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();

    try {
      const newPassword = password;

      console.log(userData.user.id);
      console.log(newPassword);

      await axios.post("/passwordUpdate/" + userData.user.id, {
        password: newPassword,
      });
      window.location.reload();
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div>
      {userData.user ? (
        <div>
          <h1>Welcome {userData.user.displayName}</h1>

          {error && (
            <ErrorNotice
              message={error}
              clearError={() => setError(undefined)}
            />
          )}

          <form onSubmit={onSubmitUsername} className="form">
            <div className="form-group row">
              <label
                htmlFor="login-password"
                className="col-sm-2 col-form-label"
              >
                Update Username
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control update-input"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>

          <form onSubmit={onSubmitPassword} className="form">
            <div className="form-group row">
              <label
                htmlFor="login-password"
                className="col-sm-2 col-form-label"
              >
                Update Password
              </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control update-input"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
}

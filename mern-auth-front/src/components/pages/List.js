import React, { Component } from "react";
import axios from "axios";

const User = (props) => (
  <tr>
    <td>{props.user.displayName}</td>
  </tr>
);

const Org = (props) => (
  <tr>
    <td>{props.user.organization}</td>
  </tr>
);

class Lists extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/lists")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  userLists() {
    return this.state.users.map((currentUser) => {
      return <User user={currentUser} key={currentUser._id} />;
    });
  }

  orgLists() {
    return this.state.users.map((currentUser) => {
      return <Org user={currentUser} key={currentUser._id} />;
    });
  }

  render() {
    return (
      <div>
        <h1 className="org">Lists of organizations who wants to hire me</h1>
        <div className="table-wrapper">
          <table className="t1">
            <thead>
              <tr>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>{this.userLists()}</tbody>
          </table>
          <table className="t2">
            <thead>
              <tr>
                <th>Organization</th>
              </tr>
            </thead>
            <tbody>{this.orgLists()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Lists;

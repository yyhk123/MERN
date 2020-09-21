import React, { Component } from "react";
import AuthOptions from "../auth/AuthOptions";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a
          className="navbar-brand"
          href="https://yyhk123.github.io/minpark/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MP Portfolio
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-target="#navbarNavAltMarkup"
          data-toggle="collapse"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav header-option">
            <a className="nav-item nav-link" href="/">
              Home
            </a>
            <a className="nav-item nav-link" href="/lists">
              Lists
            </a>
          </div>

          <div
            className="authoption navbar-nav header-option"
            id="navbarNavAltMarkup"
          >
            <AuthOptions />
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;

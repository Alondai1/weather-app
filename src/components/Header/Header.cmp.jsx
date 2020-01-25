import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.style.scss";

function Header() {
  return (
    <div className="header">
      <NavLink to="/">
        <img
          src="https://herolo.co.il/assets/img/navbar/logo.png"
          className="brand brand-logo left"
          alt=""
        />
      </NavLink>
      <ul className="right">
        <li>
          <NavLink className="link" to="/favorites">
            FAVORITES
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="/">
            HOME
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;

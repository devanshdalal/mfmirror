import React from "react";

import { Navbar, NavItem } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <Navbar brand="logo" right>
          <NavItem>Home</NavItem>
          <NavItem>Sign In</NavItem>
          <NavItem>Register</NavItem>
        </Navbar>
      </div>
    );
  }
}

export default Header;

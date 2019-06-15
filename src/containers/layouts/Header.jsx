import React from "react";

import { Navbar } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <Navbar color="faded" light expand="md" brand="logo">
          Home
        </Navbar>
      </div>
    );
  }
}

export default Header;

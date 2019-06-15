import Header from "./Header";
import Footer from "./Footer";
import React, { Component } from "react";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="main-app">{this.props.children}</div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Layout;

import React from "react";
import { Route } from "react-router-dom";

import FundsForm from "./home/FundsForm";

class Root extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={FundsForm} />
      </div>
    );
  }
}

export default Root;

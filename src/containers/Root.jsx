import React from "react";
import { Route } from "react-router-dom";

import Form from "./home/Form";

class Root extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Form} />
      </div>
    );
  }
}

export default Root;

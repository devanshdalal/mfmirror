import React from "react";
import { Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import FundsForm from "./home/FundsForm";

class Root extends React.Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact component={FundsForm} />
      </Layout>
    );
  }
}

export default Root;

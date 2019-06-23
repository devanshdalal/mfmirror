import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Layout from "./layouts/Layout";
import FundsForm from "./home/FundsForm";
import PortfolioOverview from "./PortfolioOverview";

class Root extends React.Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={FundsForm} />
          <Route path="/portfolio-overview" component={PortfolioOverview} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

export default Root;

import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./Header";
import Footer from "./Footer";
import LoadingSpinner from "components/LoadingSpinner";

class Layout extends Component {
  render() {
    const { loading } = this.props;
    return (
      <React.Fragment>
        {loading && (
          <div className="loading">
            <LoadingSpinner />
          </div>
        )}
        <Header />
        <div className="main-app">{this.props.children}</div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.loadState
  };
};
export default connect(mapStateToProps)(Layout);

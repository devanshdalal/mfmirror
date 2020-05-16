import React from "react";
import { connect } from "react-redux";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";

import get from "lodash/get";
import { deleteBasketAction, setCurrentBasketAction } from "redux/actions";

class Footer extends React.Component {
  render() {
    const baskets = get(this.props, "baskets", {});
    return (
      <div className="Footer">
        {Object.keys(baskets).map((name) => {
          return (
            <Card key={name} className="Footer_Card">
              <div
                className="Footer_Card_Body"
                onClick={() => this.props.setCurrentBasket(name)}
              >
                {name}
              </div>
              <Button close onClick={() => this.props.deleteBasket(name)} />
            </Card>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    baskets: state.baskets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBasket: (name) => dispatch(deleteBasketAction(name)),
    setCurrentBasket: (name) => dispatch(setCurrentBasketAction(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardGroup,
  CardTitle,
} from "reactstrap";

import get from "lodash/get";
import { deleteBasketAction, setCurrentBasketAction } from "redux/actions";

class Footer extends React.Component {
  render() {
    const baskets = get(this.props, "baskets", {});
    console.log("baskets", baskets);
    return (
      <React.Fragment>
        {Object.keys(baskets).map((name) => {
          return (
            <Card key={name}>
              <CardBody>
                <CardTitle>
                  <Button close onClick={() => this.props.deleteBasket(name)} />
                </CardTitle>
                <CardText onClick={() => this.props.setCurrentBasket(name)}>
                  {name}
                </CardText>
              </CardBody>
            </Card>
          );
        })}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    baskets: state.baskets,
    // funds: state.funds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBasket: (name) => dispatch(deleteBasketAction(name)),
    setCurrentBasket: (name) => dispatch(setCurrentBasketAction(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

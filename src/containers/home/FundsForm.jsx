import React, { Component } from "react";
import { Table, Button, Form, Input } from "reactstrap";
import { connect } from "react-redux";
import {
  updateLoadingAction,
  putBasketAction,
  getBasketsAction,
} from "redux/actions";

import SuggestionBox from "components/SuggestionBox";
import SaveForm from "components/SaveForm";
import PortfolioOverview from "../layouts/PortfolioOverview";
import loaderSvg from "assets/svg/loading-spinner.svg";
// import { isLoggedIn } from "../../util/method";
import { getportfolio, getfunds } from "util/method";
import { getBasketPortfolio } from "util/weightedPortfolio";
import get from "lodash/get";

class FundsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      rowsPrinted: 0,
      serverData: [],
      loading: false,
      suggestionBoxData: [],
    };
    this.rows = [];
    this.props.updateLoading();
    this.props.getBaskets();
  }

  componentDidMount() {
    const { currentBasket, funds } = this.props;
    console.log("currentBasket", currentBasket, funds);
    let currentBasketSize = 2;
    getfunds().then((res) => {
      // ask manish
      this.setState({
        suggestionBoxData: res.Items.map((k) => {
          return k.name;
        }),
      });
      // this.renderRows(1, currentBasketSize);
    });

    this.renderRows(1, currentBasketSize);
  }

  componentDidUpdate(prevProps) {
    const { currentBasket } = this.props;
    if (prevProps.currentBasket !== currentBasket) {
      if (currentBasket) {
        const { form, schemes } = this.backConvertStateData(currentBasket);
        this.handleChangeBasket(schemes, form);
      }
    }
  }

  renderRows = (startIndex, endIndex = startIndex) => {
    for (let i = startIndex; i <= endIndex; i++) {
      this.rows.push(
        <tr key={i}>
          <th scope="row">{i}</th>
          <td key={`fundName${i}`}>
            <SuggestionBox
              inputProps={{
                type: "text",
                name: `fundName${i}`,
                id: "fundName",
                placeholder: "Fund name",
                autoComplete: "off",
              }}
              setValue={this.onChange}
              search={this.state.form[`fundName${i}`]}
              suggestionBoxData={this.state.suggestionBoxData}
            />
            {console.log(
              "this.state.form[`fundName${i}`]",
              this.state.form[`fundName${i}`],
              i
            )}
          </td>
          <td key={`weight${i}`}>
            <Input
              type="number"
              key={`weight${i}`}
              name={`weight${i}`}
              id="weight"
              placeholder="Weight"
              onChange={this.onChange}
              value={this.state.form[`weight${i}`]}
            />
          </td>
        </tr>
      );
      if (i === endIndex) this.setState({ rowsPrinted: endIndex });
    }
  };

  onChange = (event) => {
    this.setState({
      form: { ...this.state.form, [event.target.name]: event.target.value },
    });
  };

  backConvertStateData = (basketName) => {
    const { baskets } = this.props;
    console.log("baskets=", baskets, basketName, baskets[basketName]);
    const schemes = get(baskets[basketName], "schemes");
    const form = {};
    console.log("value=", schemes);
    schemes.forEach((value, index) => {
      form[`fundName${index + 1}`] = value["name"];
      form[`weight${index + 1}`] = value["wt"].toString();
    });
    return { form, schemes };
  };

  convertStateData = (formData) => {
    const covertedData = [];
    Object.keys(formData).forEach((key) => {
      if (key.indexOf("fundName") !== -1) {
        let inputKey = key.replace("fundName", "");
        let weightKey = `weight${inputKey}`;
        covertedData.push({
          name: formData[key],
          wt: formData[weightKey] ? parseFloat(formData[weightKey]) : 0.0,
        });
      }
    });
    console.log("formData", formData);
    console.log("covertedData", covertedData);
    return covertedData;
  };

  handleSubmitBtn = () => {
    this.setState({ loading: true });
    console.log("form data", this.state.form, this.props.history);
    // api call

    const basket = this.convertStateData(this.state.form);
    const basketPortfolio = getBasketPortfolio(basket, this.props.funds);
    console.log("basketPortfolio", basketPortfolio);
    this.setState({
      serverData: basketPortfolio,
      loading: false,
      basket,
    });
  };

  handleChangeBasket = (schemes, form) => {
    const basketPortfolio = getBasketPortfolio(schemes, this.props.funds);
    console.log("basketPortfolio", basketPortfolio, form);
    this.setState(
      {
        serverData: basketPortfolio,
        loading: false,
        form,
      },
      () => {
        this.rows = [];
        this.renderRows(1, schemes.length);
      }
    );
  };

  saveHandler = (name) => {
    console.log("saveHandler called with", name, this.state.basket);
    let namedBasket = {};
    this.props.putBasket({ name, schemes: this.state.basket });
  };

  render() {
    console.log("serverData1:", this.state.serverData);
    return (
      <React.Fragment>
        <div className="FundsForm">
          <div className="app-container">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("datata", e);
              }}
            >
              <Table borderless className="FundsForm__table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Fund</th>
                    {/* <th>Percentage</th> */}
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>{this.rows}</tbody>
              </Table>
              <div className="FundsForm__formControl">
                <div className="FundsForm__addRow">
                  <Button
                    color="secondary"
                    onClick={() => this.renderRows(this.state.rowsPrinted + 1)}
                  >
                    Add row
                  </Button>
                </div>

                <div className="FundsForm__submit">
                  <Button
                    color="success"
                    // type="submit"
                    onClick={this.handleSubmitBtn}
                  >
                    Submit →
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
        {this.state.loading ? (
          <div style={{ height: 50, width: 50, margin: "auto" }}>
            <img src={loaderSvg} alt="loader" />
          </div>
        ) : (
          void 0
        )}
        {this.state.serverData.length ? (
          <div>
            <SaveForm saveHandler={this.saveHandler} />
            <PortfolioOverview
              portfolio={[...this.state.serverData]}
              rowsPrinted={this.state.rowsPrinted}
            />
          </div>
        ) : (
          void 0
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    funds: state.funds,
    baskets: state.baskets,
    currentBasket: state.currentBasket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoading: () => {
      console.log("dispatching updateLoading");
      dispatch(updateLoadingAction());
    },
    getBaskets: () => {
      console.log("dispatching getBasketsAction");
      dispatch(getBasketsAction());
    },
    putBasket: (namedBasket) => dispatch(putBasketAction(namedBasket)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FundsForm);

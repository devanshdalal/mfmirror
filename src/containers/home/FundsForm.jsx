import React, { Component } from "react";
import { Table, Button, Form, Input } from "reactstrap";
import { connect } from "react-redux";
import { updateLoadingAction, putBasketAction } from "redux/actions";

import SuggestionBox from "components/SuggestionBox";
import SaveForm from "components/SaveForm";
import PortfolioOverview from "../layouts/PortfolioOverview";
import loaderSvg from "assets/svg/loading-spinner.svg";
// import { isLoggedIn } from "../../util/method";
import { getportfolio, getfunds } from "util/method";
import { getBasketPortfolio } from "util/weightedPortfolio";

class FundsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      basket: [],
      rowsPrinted: 0,
      serverData: [],
      loading: false,
      suggestionBoxData: [],
    };
    this.rows = [];
    this.props.updateLoading();
  }

  componentDidMount() {
    getfunds().then((res) => {
      this.setState({
        suggestionBoxData: res.Items.map((v) => {
          return v.name;
        }),
      });
      this.renderRows(1, 2);
    });
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
              suggestionBoxData={this.state.suggestionBoxData}
            />
          </td>
          {/* <td key={`percentage${i}`}>
            <Input
              type="text"
              name={`percentage${i}`}
              id="percentage"
              placeholder="Percentage"
              onChange={this.onChange}
              value={this.state.form[`percentage${i}`]}
            />
          </td> */}
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
    // console.log("form data", this.state.form, this.props.history);
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoading: () => dispatch(updateLoadingAction()),
    putBasket: (namedBasket) => dispatch(putBasketAction(namedBasket)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FundsForm);

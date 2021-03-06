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
import { getBasketPortfolio } from "util/weightedPortfolio";
import get from "lodash/get";
import isEqual from "lodash/isEqual";

const getRandomString = () => new Date().getTime().toString(36);

class FundsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      serverData: [],
      loading: false,
      suggestionBoxData: [],
      formIndex: [1],
      randomStringValue: getRandomString(),
    };
    this.props.updateLoading();
    this.props.getBaskets();
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { currentBasket, funds } = this.props;
    if (prevProps.currentBasket !== currentBasket) {
      if (currentBasket) {
        this.handleBasketToFormData(currentBasket);
      }
    }
    if (!isEqual(prevProps.funds, funds)) {
      this.setState({
        suggestionBoxData: Object.keys(funds).map((k) => {
          return k;
        }),
      });
    }
  }

  renderRows = () => {
    const { formIndex, randomStringValue } = this.state;
    return formIndex.map((data, index) => (
      <tr key={index + randomStringValue}>
        <th scope="row">{index + 1}</th>
        <td className="WideTD">
          <SuggestionBox
            // key={`fundName${data}` + this.state.form[`fundName${data}`]}
            inputProps={{
              type: "text",
              name: `fundName${data}`,
              id: "fundName",
              placeholder: "Fund name",
              autoComplete: "off",
            }}
            setValue={this.onChange}
            search={this.state.form[`fundName${data}`]}
            suggestionBoxData={this.state.suggestionBoxData}
          />
        </td>
        <td>
          <Input
            type="number"
            // key={`weight${data}` + this.state.form[`weight${data}`]}
            name={`weight${data}`}
            id="weight"
            placeholder="wt > 0"
            min={0.001}
            step={0.00001}
            required
            onChange={this.onChange}
            value={this.state.form[`weight${data}`]}
          />
        </td>
        <td>
          {index > 0 && (
            <Button
              type="button"
              onClick={() => {
                this.deleteRowFromForm(data);
              }}
            >
              x
            </Button>
          )}
        </td>
      </tr>
    ));
  };

  onChange = (event) => {
    this.setState({
      form: { ...this.state.form, [event.target.name]: event.target.value },
    });
  };

  handleBasketToFormData = (basketName) => {
    const { baskets } = this.props;
    const schemes = get(baskets[basketName], "schemes");
    const form = {};
    schemes.forEach((value, index) => {
      form[`fundName${index + 1}`] = value["name"];
      form[`weight${index + 1}`] = value["wt"].toString();
    });
    const basketPortfolio = getBasketPortfolio(schemes, this.props.funds);
    const newIdexArr = [];
    Object.keys(form).forEach((key) => {
      if (key.includes("fund")) {
        newIdexArr.push(newIdexArr.length + 1);
      }
    });
    this.setState({
      serverData: basketPortfolio,
      loading: false,
      form,
      formIndex: newIdexArr,
      randomStringValue: getRandomString(),
    });
  };

  convertStateData = (formIndex, formData) => {
    const covertedData = [];
    formIndex.forEach((key) => {
      const fundKey = `fundName${key}`;
      const weightKey = `weight${key}`;
      covertedData.push({
        name: formData[fundKey],
        wt: formData[weightKey] ? parseFloat(formData[weightKey]) : 0.0,
      });
    });
    return covertedData;
  };

  handleSubmitBtn = () => {
    this.setState({ loading: true });

    const basket = this.convertStateData(this.state.formIndex, this.state.form);
    const basketPortfolio = getBasketPortfolio(basket, this.props.funds);
    this.setState({
      serverData: basketPortfolio,
      loading: false,
    });
  };

  handleChangeBasket = (schemes, form) => {};

  addRowToForm = () => {
    const { formIndex } = this.state;
    const newIndex =
      formIndex.reduce((k1, k2) => {
        return Math.max(k1, k2);
      }) + 1;
    this.setState({
      formIndex: [...this.state.formIndex, newIndex],
      randomStringValue: getRandomString(),
    });
  };

  deleteRowFromForm = (rowId) => {
    const { formIndex } = this.state;
    this.setState({
      formIndex: formIndex.filter((item) => {
        return item != rowId;
      }),
      randomStringValue: getRandomString(),
    });
  };

  saveHandler = (name) => {
    // const { basketsToName} = this.props
    const basket = this.convertStateData(this.state.formIndex, this.state.form);
    console.log("putBasket", this.state);
    this.props.putBasket({ name, schemes: basket, permanent: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="FundsForm">
          <div className="app-container">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                this.handleSubmitBtn();
              }}
            >
              <Table borderless className="FundsForm__table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Fund</th>
                    {/* <th>Percentage</th> */}
                    <th>Weight</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
              </Table>
              <div className="FundsForm_FormControl">
                <Button color="secondary" onClick={this.addRowToForm}>
                  +
                </Button>
                <Button color="success" type="submit">
                  Submit →
                </Button>
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
            <SaveForm
              saveHandler={this.saveHandler}
              key={this.props.currentBasket}
            />
            <PortfolioOverview
              portfolio={[...this.state.serverData]}
              rowsPrinted={this.state.randomStringValue}
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
    basketsToName: state.basketsToName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoading: () => {
      dispatch(updateLoadingAction());
    },
    getBaskets: () => {
      dispatch(getBasketsAction());
    },
    putBasket: (namedBasket) => dispatch(putBasketAction(namedBasket)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FundsForm);

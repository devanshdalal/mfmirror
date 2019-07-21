import React, { Component } from "react";
import { Table, Button, Form, Input } from "reactstrap";
import { connect } from "react-redux";
import { updateLoadingAction } from "redux/actions";

import SuggestionBox from "components/SuggestionBox";
import PortfolioOverview from "./PortfolioOverview";
import loaderSvg from "assets/svg/loading-spinner.svg";
// import { isLoggedIn } from "../../util/method";
import { getportfolio, getfunds } from "util/method";

class FundsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      rowsPrinted: 0,
      serverData: [],
      loading: false,
      suggestionBoxData: []
    };
    this.rows = [];
  }

  componentDidMount() {
    getfunds().then(res => {
      console.log(res);
      if (res.data.length) {
        this.setState({ suggestionBoxData: res.data });
        this.rows = [];
        this.renderRows(1, 2);
      }
    });
    this.renderRows(1, 2);
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
                autoComplete: "off"
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

  onChange = event => {
    this.setState({
      form: { ...this.state.form, [event.target.name]: event.target.value }
    });
  };

  convertStateData = formData => {
    const covertedData = {};
    Object.keys(formData).forEach(key => {
      if (key.indexOf("fundName") !== -1) {
        let inputKey = key.replace("fundName", "");
        let weightKey = `weight${inputKey}`;
        covertedData[formData[key]] = formData[weightKey] ? parseFloat(formData[weightKey]) : 0.0;
      }
    });
    console.log(formData);
    console.log(covertedData);
    return covertedData;
  };

  handleSubmitBtn = () => {
    this.setState({ loading: true });
    // console.log("form data", this.state.form, this.props.history);
    // api call

    // this.props.updateLoading(true);

    var config = {
      params: this.convertStateData(this.state.form)
    };

    getportfolio(config).then(res => {
      this.setState({ serverData: res.data, loading: false });
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="FundsForm">
          <div className="app-container">
            <Form
              onSubmit={e => {
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
                  <Button color="secondary" onClick={() => this.renderRows(this.state.rowsPrinted + 1)}>
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
          <PortfolioOverview portfolio={[...this.state.serverData]} rowsPrinted={this.state.rowsPrinted} />
        ) : (
          void 0
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.loadState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLoading: loading => dispatch(updateLoadingAction(loading))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundsForm);

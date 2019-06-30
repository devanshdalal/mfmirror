import React, { Component } from "react";
import { Table, Button, Form, Input } from "reactstrap";
import { connect } from "react-redux";
import { updateLoadingAction } from "../../redux/actions";

import SuggestionBox from "../../components/SuggestionBox";
import PortfolioOverview from "./PortfolioOverview"
// import { isLoggedIn } from "../../util/method";
import { getportfolio } from "../../util/method";

class FundsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { form: {}, rowsPrinted: 0, serverData: [] };
    this.rows = [];
  }

  componentDidMount() {
    // isLoggedIn().then(result => {
    //   console.log("reeeeeee", result);
    // });
    this.renderRows(1, 5);
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

  handleSubmitBtn = () => {
    // console.log("form data", this.state.form, this.props.history);
    // api call

    // this.props.updateLoading(true);

    const portfolios = [
      {
        stock: "Chambal Fertilizers & Chemicals Ltd. ",
        sector: "Fertilisers-composite",
        value: 2594.2,
        totalHoldings: 3.09,
        quantity: 1.37
      },
      {
        stock: "Sonata Software Ltd. ",
        sector: "Computers - software",
        value: 2583.2,
        totalHoldings: 3.08,
        quantity: 72.3
      },
      {
        stock: "NIIT Techonologies Ltd. ",
        sector: "Computers - software",
        value: 2524.2,
        totalHoldings: 3.0,
        quantity: 19.2
      },
      {
        stock: "Bank Of Baroda ",
        sector: "Banks",
        value: 2345.2,
        totalHoldings: 2.78,
        quantity: 72.3
      },
      {
        stock: "Kalpataru Power Transmission Ltd. ",
        sector: "Flim production, distribution & exhibition",
        value: 21345.2,
        totalHoldings: 0.03,
        quantity: 35.3
      }
    ];

    var config = {
        "params": {
          "kotak-small-cap-fund-direct-plan-growth.csv": 0.6,
          "hdfc-small-cap-fund-direct-plan-growth.csv": 0.4
        }
      };

    var tableData = [
    ];

    window.state = this.state;
    console.log(this.state.form)
    console.log('hr')

    getportfolio(config).then(res => 
      {
        tableData = res.data;
        console.log(res)
        this.setState({ serverData: tableData })
      }
    );

    setTimeout(() => {
      // this.props.updateLoading(false);
      // this.props.history.push("/portfolio-overview", tableData);
    }, 5000);
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
  {this.state.serverData.length ? <PortfolioOverview location={{ state:this.state.serverData}} />: void 0}
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

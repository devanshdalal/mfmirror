import React, { Component } from "react";
import { Table, Button, Form, Input } from "reactstrap";

import SuggestionBox from "../../components/SuggestionBox";

class FundsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { form: {}, rowsPrinted: 0 };
    this.rows = [];
  }

  componentDidMount() {
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
          <td key={`percentage${i}`}>
            <Input
              type="text"
              name={`percentage${i}`}
              id="percentage"
              placeholder="Percentage"
              onChange={this.onChange}
              value={this.state.form[`percentage${i}`]}
            />
          </td>
          <td key={`weight${i}`}>
            <Input
              type="text"
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

  render() {
    return (
      <div>
        <Form
          onSubmit={e => {
            e.preventDefault();
            console.log("datata", e);
          }}
        >
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Fund</th>
                <th>Percentage</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>{this.rows}</tbody>
          </Table>
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <Button
              color="secondary"
              onClick={() => this.renderRows(this.state.rowsPrinted + 1)}
            >
              Add row
            </Button>

            <Button
              color="success"
              onClick={() => console.log("form data", this.state.form)}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default FundsForm;

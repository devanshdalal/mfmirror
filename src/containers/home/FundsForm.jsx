import React, { Component } from "react";
import { Table, Form, Input } from "reactstrap";

class FundsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { form: {}, rowsPrinted: 0 };
    this.rows = [];
  }

  componentDidMount() {
    this.renderRows(1, 5);
  }
  renderRows = (startIndex, endIndex = startIndex + 1) => {
    for (let i = startIndex; i <= endIndex; i++) {
      this.rows.push(
        <tr key={i}>
          <th scope="row">{i}</th>
          <td key={`fundName${i}`}>
            <Input
              type="text"
              name={`fundName${i}`}
              id="fundName"
              placeholder="Fund name"
              onChange={this.onChange}
              // value={`this.state.fundName${i}`}
            />
          </td>
          <td key={`Percentage${i}`}>
            <Input
              type="text"
              name={`Percentage${i}`}
              id="Percentage"
              placeholder="Percentage"
            />
          </td>
          <td key={`Weight${i}`}>
            <Input
              type="text"
              key={`Weight${i}`}
              name={`Weight${i}`}
              id="Weight"
              placeholder="Weight"
            />
          </td>
        </tr>
      );
      if (i === endIndex) this.setState({ rowsPrinted: endIndex });
    }
  };

  onChange = e => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value }
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
        </Form>
      </div>
    );
  }
}

export default FundsForm;

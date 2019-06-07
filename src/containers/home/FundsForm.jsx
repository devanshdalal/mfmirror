import React, { Component } from "react";
import { Table, Form, Input } from "reactstrap";

class FundsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    let rows = [];

    for (let i = 0; i < 10; i++) {
      rows.push(
        <tr key={i}>
          <th scope="row">{i + 1}</th>
          <td>
            <Input
              type="text"
              name={`fundName${i}`}
              id="fundName"
              placeholder="Fund name"
              onChange={this.onChange}
              // value={`this.state.fundName${i}`}
            />
          </td>
          <td>
            <Input
              type="text"
              name={`Percentage${i}`}
              id="Percentage"
              placeholder="Percentage"
            />
          </td>
          <td>
            <Input
              type="text"
              name={`Weight${i}`}
              id="Weight"
              placeholder="Weight"
            />
          </td>
        </tr>
      );
    }
    return (
      <div>
        <Form
          onSubmit={data => {
            console.log("datata", data);
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
            <tbody>{rows}</tbody>
          </Table>
        </Form>
      </div>
    );
  }
}

export default FundsForm;

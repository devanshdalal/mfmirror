import React from "react";
import {
  Button,
  Form,
  InputGroup,
  Label,
  Input,
  InputGroupAddon,
} from "reactstrap";

class SaveForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveHandler(this.state.name);
  }

  render() {
    return (
      <Form>
        <InputGroup className="SaveForm">
          <Input
            type="text"
            name="Name"
            id="basketName"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="basket name"
          />
          <InputGroupAddon addonType="append">
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    );
  }
}

export default SaveForm;

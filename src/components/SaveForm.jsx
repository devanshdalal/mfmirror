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
    this.state = { name: "", disabled: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      disabled: event.target.value ? false : true,
      name: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name) {
      this.props.saveHandler(this.state.name);
    }
  }

  render() {
    return (
      <Form>
        <InputGroup className="SaveForm">
          <Input
            type="text"
            name="Name"
            id="basketName"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="basket name"
          />
          <InputGroupAddon addonType="append">
            <Button
              onClick={this.handleSubmit}
              disabled={this.state.disabled}
              color="primary"
            >
              Save
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    );
  }
}

export default SaveForm;

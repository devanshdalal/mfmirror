import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

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
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="Name"
            id="basketName"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="with a placeholder"
          />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
    );
  }
}

export default SaveForm;

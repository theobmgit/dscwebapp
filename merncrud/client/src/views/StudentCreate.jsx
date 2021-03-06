import React, { Component } from "react";
import apis from "../api";

import styled from "styled-components";

const Title = styled.h1.attrs({
  className: "h1",
})``;

const Wrapper = styled.div.attrs({
  className: "form-group",
})`
  margin: 50px auto;
  max-width: 1000px;
`;

const Label = styled.label`
  margin: 5px;
  font-size: 20px;
  font-weight: 500;
`;

const InputText = styled.input.attrs({
  className: "form-control",
})`
  height: 50px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 0 20px;
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  border-radius: 20px;
  height: 50px;
  padding: 0 20px;
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger text-center`,
})`
  border-radius: 20px;
  height: 50px;
  padding: 5px 20px;
  margin: 15px 15px 15px 5px;
`;

class StudentCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      age: -1,
      email: "",
    };
  }

  handleChangedInputName = async (event) => {
    const name = event.target.value;
    this.setState({ name });
  };

  handleChangedInputAge = async (event) => {
    const age = event.target.validity.valid
      ? parseInt(event.target.value)
      : this.state.age;
    this.setState({ age });
  };

  handleChangedInputEmail = async (event) => {
    const email = event.target.value;
    this.setState({ email });
  };

  handleValidation = (payload) => {
    let isValidated = true;
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!payload.name.match(/[a-zA-Z\s.]{2,32}/)) {
      window.alert(
        "Name should only contains characters, spaces and dots\n" +
          "Length should be in between 2 and 32"
      );
      isValidated = false;
    } else if (payload.age < 0 || payload.age > 299) {
      window.alert("Age should be a number between 0 and 299");
      isValidated = false;
    } else if (!payload.email.match(re)) {
      window.alert("Email is invalid");
      isValidated = false;
    }
    return isValidated;
  };

  handleIncludeStudent = async (event) => {
    const { name, age, email } = this.state;
    const payload = { name, age, email };

    if (this.handleValidation(payload)) {
      await apis.createStudent(payload).then((res) => {
        window.alert(`Student created successfully`);
        this.setState({
          name: "",
          age: -1,
          email: "",
        });
      });
    }
  };

  render() {
    const { name, age, email } = this.state;
    return (
      <Wrapper>
        <Title>Add new student</Title>

        <Label>Name: </Label>
        <InputText
          type="text"
          value={name}
          onChange={this.handleChangedInputName}
          placeholder="Name"
          required
        />

        <Label>Age: </Label>
        <InputText
          type="number"
          value={age}
          onChange={this.handleChangedInputAge}
          placeholder="Age"
        />

        <Label>Email: </Label>
        <InputText
          type="text"
          value={email}
          onChange={this.handleChangedInputEmail}
          placeholder="Email"
          required
        />

        <Button onClick={this.handleIncludeStudent}>Add Student</Button>
        <CancelButton href={"/students/list"}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default StudentCreate;

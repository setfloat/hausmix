import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px groove threedface;
  padding: 2rem;
  max-width: 400px;
`;

const FieldsetStyled = styled.fieldset`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  border: none;
  padding: 0;
`;

const SubmitButtonStyled = styled.button`
  max-width: 400px;
  margin-top: 2rem;
  background-image: radial-gradient(
    rgba(250, 250, 250, 1),
    rgba(250, 250, 250, 1),
    rgba(55, 234, 46, 1)
  );
  :hover {
    cursor: pointer;
  }
  :active {
    background-image: radial-gradient(
      rgba(55, 234, 46, 1),
      rgba(250, 250, 250, 1)
    );
  }
`;
const InputLabelStyled = styled.label`
  display: flex;
  flex-direction: column;
`;

const InvalidAlert = styled.h6`
  color: red;
`;

class SignUp extends Component {
  state = {
    form: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    invalidAlert: ""
  };

  updateInputState = (event) => {
    if (this.state.invalidAlert.length) {
      const form = { ...this.state.form };
      form[event.target.name] = event.target.value;
      this.setState({
        // [event.target.name]: event.target.value
        form,
        invalidAlert: ""
      });
    } else {
      const form = { ...this.state.form };
      form[event.target.name] = event.target.value;
      this.setState({
        form
      });
    }
  };
  prevalidatePasswords = ({ password, confirmPassword }) => {
    // match
    if (password !== confirmPassword) {
      this.setState({ invalidAlert: "Passwords do not match" });
      return false;
      // min length
    } else if (password.length < 9) {
      console.log(password.length);
      this.setState({
        invalidAlert: "Password must be 9 characters or longer."
      });
      return false;
      // TODO: includes number
      // } else if (password.match(/\d+/g) !== null) {
      //   this.setState({ invalidAlert: "Password must contain a number." });
      //   return false;
    } else {
      console.log("hello");
      this.setState({ invalidAlert: "" });

      return true;
    }
  };
  submitSignUp = () => {
    if (this.prevalidatePasswords(this.state)) {
      console.log("signup yo yo", this.state);
    } else {
      console.log("invalid yo", this.state);
    }
  };
  render() {
    console.log(this.state.form);
    const { name, email, password, confirmPassword } = this.state.form;
    const { invalidAlert } = this.state;
    return (
      <Mutation
        mutation={SIGN_UP_MUTATION}
        variables={{ name, email, password }}
      >
        {(signup, { error, loading }) => {
          return (
            <FormStyled
              method="post"
              onSubmit={async (event) => {
                event.preventDefault();
                if (this.prevalidatePasswords(this.state.form)) {
                  const res = await signup();
                  const form = {
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                  };
                  this.setState({ form });
                  console.log(res);
                }
              }}
            >
              <h3>Sign Up!</h3>
              <FieldsetStyled>
                <InputLabelStyled htmlFor="name">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={this.updateInputState}
                  />
                </InputLabelStyled>
                <InputLabelStyled htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.updateInputState}
                  />
                </InputLabelStyled>
                <InputLabelStyled htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.updateInputState}
                  />
                </InputLabelStyled>
                <InputLabelStyled htmlFor="confirmPassword">
                  Password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={this.updateInputState}
                  />
                </InputLabelStyled>
              </FieldsetStyled>
              {invalidAlert.length > 0 && (
                <InvalidAlert>{invalidAlert}</InvalidAlert>
              )}
              <SubmitButtonStyled type="submit">Submit</SubmitButtonStyled>
            </FormStyled>
          );
        }}
      </Mutation>
    );
  }
}

export default SignUp;

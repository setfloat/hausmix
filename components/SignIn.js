import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { AUTHED_USER_QUERY } from "./User";
import Error from "./ErrorMessage";

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
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

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  updateInputState = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <Mutation
        mutation={SIGN_IN_MUTATION}
        variables={{ email, password }}
        refetchQueries={[{ query: AUTHED_USER_QUERY }]}
      >
        {(signIn, { error, loading }) => {
          return (
            <FormStyled
              method="post"
              onSubmit={async (event) => {
                event.preventDefault();
                const res = await signIn();
                this.setState({ email: "", password: "" });
              }}
            >
              <h3>Sign In!</h3>
              <Error error={error} />
              <FieldsetStyled>
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
              </FieldsetStyled>
              <SubmitButtonStyled type="submit">Sign In!</SubmitButtonStyled>
            </FormStyled>
          );
        }}
      </Mutation>
    );
  }
}

export default SignIn;

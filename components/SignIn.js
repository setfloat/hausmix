import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { AUTHED_USER_QUERY } from "./User";
import Error from "./ErrorMessage";
import {
  FormStyled,
  FieldsetStyled,
  SubmitButtonStyled,
  InputLabelStyled,
  InvalidAlert
} from "./styles/formStyles";

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      name
    }
  }
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
        awaitRefetchQueries
        refetchQueries={[{ query: AUTHED_USER_QUERY }]}
      >
        {(signIn, { error, loading }) => {
          return (
            <FormStyled
              method="post"
              onSubmit={async (event) => {
                event.preventDefault();
                const res = await signIn();
                console.log(res);
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

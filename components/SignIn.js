import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Router from "next/router";
import { AUTHED_USER_QUERY } from "./User";
import Error from "./ErrorMessage";
import BetterInput from "./BetterInput";
import {
  MargeBotFormStyled,
  FieldsetStyled,
  FlexRowEnd
} from "./styles/formStyles";
import { SubmitButtonStyled } from "./styles/buttons";
import { Loading } from "./Loading";

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

  clearState = () => this.setState(() => ({ email: "", password: "" }));

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
            <MargeBotFormStyled
              method="post"
              onSubmit={async (event) => {
                event.preventDefault();
                const res = await signIn();
                await this.clearState();
                // console.log(res);
                if (Router.pathname === "/signin") {
                  Router.push("/");
                }
              }}
            >
              {loading && <Loading />}
              <h3>Sign In!</h3>
              <Error error={error} />
              <FieldsetStyled>
                <BetterInput
                  changeUpdate={this.updateInputState.bind(this)}
                  labelText="Email"
                  pieceOfState={{ email }}
                />
                <BetterInput
                  changeUpdate={this.updateInputState.bind(this)}
                  labelText="Password"
                  pieceOfState={{ password }}
                />
                <FlexRowEnd>
                  <SubmitButtonStyled type="submit">
                    Sign In!
                  </SubmitButtonStyled>
                </FlexRowEnd>
              </FieldsetStyled>
            </MargeBotFormStyled>
          );
        }}
      </Mutation>
    );
  }
}

export default SignIn;

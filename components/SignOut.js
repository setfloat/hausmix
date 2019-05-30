import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { AUTHED_USER_QUERY } from "./User";
import styled from "styled-components";

const SignOutButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  color: inherit;
  border: none;
  font-size: inherit;
  padding: 1.1rem 1.4rem 1.1rem 1.4rem;
`;

const MobSignOutButton = styled(SignOutButton)`
  font-family: sans-serif;
`;

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut {
      message
    }
  }
`;

class SignOut extends Component {
  render() {
    return (
      <Mutation
        mutation={SIGN_OUT_MUTATION}
        refetchQueries={[{ query: AUTHED_USER_QUERY }]}
      >
        {(signOut) => <SignOutButton onClick={signOut}>Sign Out</SignOutButton>}
      </Mutation>
    );
  }
}

class MobSignOut extends Component {
  render() {
    return (
      <Mutation
        mutation={SIGN_OUT_MUTATION}
        refetchQueries={[{ query: AUTHED_USER_QUERY }]}
      >
        {(signOut) => (
          <MobSignOutButton onClick={signOut}>Sign Out</MobSignOutButton>
        )}
      </Mutation>
    );
  }
}

export default SignOut;
export { MobSignOut };

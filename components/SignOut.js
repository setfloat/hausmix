import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { AUTHED_USER_QUERY } from "./User";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut {
      message
    }
  }
`;

class SignOut extends Component {
  render(props) {
    return (
      <Mutation
        mutation={SIGN_OUT_MUTATION}
        refetchQueries={[{ query: AUTHED_USER_QUERY }]}
      >
        {(signOut) => <button onClick={signOut}>Sign Out</button>}
      </Mutation>
    );
  }
}

export default SignOut;

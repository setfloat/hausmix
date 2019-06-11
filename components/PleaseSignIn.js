import React from "react";
import { Query } from "react-apollo";
import { AUTHED_USER_QUERY } from "./User";
import SignIn from "./SignIn";
import CreateHousehold from "./CreateHousehold";
import { Loading } from "./Loading";

const PleaseSignIn = (props) => (
  <Query query={AUTHED_USER_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <p>Error...</p>;
      if (!data.loggedInUser) {
        return (
          <div>
            <p>Please Sign in before Continuing</p>
            <SignIn>Sign In</SignIn>
          </div>
        );
      }
      if (data.loggedInUser && !data.loggedInUser.households[0]) {
        return <CreateHousehold />;
      }

      return React.cloneElement(props.children, {
        loggedInUser: data.loggedInUser,
        household: data.loggedInUser.households[0]
      });
    }}
  </Query>
);

export default PleaseSignIn;

// gated component

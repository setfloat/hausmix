import { Query } from "react-apollo";
import { AUTHED_USER_QUERY } from "./User";
import SignIn from "./SignIn";

const PleaseSignIn = (props) => (
  <Query query={AUTHED_USER_QUERY}>
    {({ data, loading, error }, ...args) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error...</p>;
      if (document.location.protocol !== "https:") {
        document.location.href =
          "https://www.hausmix.com" + document.location.pathname;
      }
      if (!data.loggedInUser) {
        return (
          <div>
            <p>Please Sign in before Continuing</p>
            <SignIn>Sign In</SignIn>
          </div>
        );
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

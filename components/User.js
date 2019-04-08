import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const AUTHED_USER_QUERY = gql`
  query {
    loggedInUser {
      id
      email
      name
      permissions
    }
  }
`;

const User = (props) => (
  <Query {...props} query={AUTHED_USER_QUERY}>
    {(payload) => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
export { AUTHED_USER_QUERY };

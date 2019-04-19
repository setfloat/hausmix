import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const CURRENT_HOUSEHOLD_QUERY = gql`
  query CURRENT_HOUSEHOLD_QUERY($id: String!) {
    currentHousehold(id: $id) {
      id
      name
      houseMembers {
        id
        name
      }
      headsOfHouse {
        id
        name
      }
    }
  }
`;

class CurrentHouseDash extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render() {
    return (
      <Query query={CURRENT_HOUSEHOLD_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>loading</div>;

          const { name, headsOfHouse, houseMembers } = data.currentHousehold;

          return (
            <div>
              <h2>{name}</h2>
              <h4>House Mangers</h4>
              <ul>
                {headsOfHouse.map((leader) => (
                  <li key={`${leader.id}lileader`}>{leader.name}</li>
                ))}
              </ul>
              <h4>House Members</h4>
              <ul>
                {houseMembers.map((houseMember) => (
                  <li key={`${houseMember.id}limember`}>{houseMember.name}</li>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default CurrentHouseDash;
export { CURRENT_HOUSEHOLD_QUERY };

import React, { Component } from "react";
import styled from "styled-components";
import HouseSingleUserDebts from "./HouseSingleUserDebts";

const UserDebtsStyled = styled.section`
  border: 1px solid rgba(160, 160, 160, 1);
  background-color: rgba(220, 240, 240, 1);
  border-radius: 1.5rem;
  margin-bottom: 1rem;
  overflow: auto;
  padding: 1rem;
`;

class UserDebts extends Component {
  state = {
    requeryCount: 0
  };

  componentDidUpdate() {
    const { requery, clearRequery } = this.props;
    const { requeryCount } = this.state;
    if (requery === true) {
      clearRequery();
      this.setState({ requeryCount: requeryCount + 1 });
    }
  }
  render() {
    const { household, loggedInUser } = this.props;
    const { requeryCount } = this.state;

    return (
      <UserDebtsStyled>
        <h2>Simplified house debts</h2>
        {household.houseMembers.map((user) => {
          if (user.id === loggedInUser.id) {
            return null;
          }
          return (
            <HouseSingleUserDebts
              key={user.id + requeryCount}
              houseSingleUser={user}
              household={household}
              loggedInUser={loggedInUser}
            />
          );
        })}
      </UserDebtsStyled>
    );
  }
}

export default UserDebts;
